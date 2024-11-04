import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideo, checkSubscription, subscribeToChannel, unsubscribeFromChannel } from '../api';
import { Video } from '../types';
import { ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentSection from '../components/CommentSection';
import ChannelInfo from '../components/ChannelInfo';
import VideoGrid from '../components/VideoGrid';
import { useAuth } from '../context/AuthContext';

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (id) {
          const data = await fetchVideo(id);
          setVideo(data);
          if (user) {
            const subscriptionStatus = await checkSubscription(data.user.id);
            setIsSubscribed(subscriptionStatus);
          }
        }
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id, user]);

  const handleSubscribe = async () => {
    if (!video || !user) return;

    try {
      if (isSubscribed) {
        await unsubscribeFromChannel(video.user.id);
      } else {
        await subscribeToChannel(video.user.id);
      }
      setIsSubscribed(!isSubscribed);
    } catch (err) {
      console.error('Failed to update subscription:', err);
    }
  };

  if (loading) {
    return (
      <div className="pt-14 pl-64 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="pt-14 pl-64 flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Video not found'}</p>
      </div>
    );
  }

  return (
    <div className="pt-14 pl-64">
      <div className="max-w-6xl mx-auto p-6">
        <div className="aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            src={video.url}
            className="w-full h-full"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold">{video.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <ChannelInfo
              channel={video.user}
              subscriberCount={video.user.subscribers?.length || 0}
              isSubscribed={isSubscribed}
              onSubscribe={handleSubscribe}
            />
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-100">
                <ThumbsUp size={20} />
                <span>{video.likes.length}</span>
              </button>
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-100">
                <ThumbsDown size={20} />
                <span>{video.dislikes.length}</span>
              </button>
              <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-gray-100">
                <Share size={20} />
                <span>Share</span>
              </button>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 rounded-xl p-4">
            <p className="whitespace-pre-wrap">{video.description}</p>
            {video.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-blue-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <CommentSection videoId={video.id} comments={video.comments || []} />
        </div>
      </div>
    </div>
  );
}