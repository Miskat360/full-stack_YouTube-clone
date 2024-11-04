import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Search as SearchIcon } from 'lucide-react';
import { Video } from '../types';
import axios from 'axios';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/videos/search?q=${query}`);
        setVideos(response.data.videos);
      } catch (err) {
        setError('Failed to load search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchVideos();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="pt-14 pl-64 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-14 pl-64 flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-14 pl-64">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <SearchIcon size={24} className="text-gray-600" />
          <h1 className="text-xl font-bold">Search results for "{query}"</h1>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No videos found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="flex gap-4">
                <VideoCard
                  id={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  channelName={video.user.username}
                  channelAvatar={video.user.avatar}
                  views={video.views}
                  uploadedAt={new Date(video.createdAt)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}