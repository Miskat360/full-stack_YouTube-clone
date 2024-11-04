import React from 'react';
import { useInView } from 'react-intersection-observer';
import VideoCard from './VideoCard';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function VideoGrid({ videos, loading, hasMore, onLoadMore }: VideoGridProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && onLoadMore && !loading) {
        onLoadMore();
      }
    },
  });

  const skeletons = Array(4).fill(null).map((_, i) => (
    <div key={`skeleton-${i}`} className="animate-pulse">
      <div className="aspect-video bg-gray-200 rounded-xl mb-3"></div>
      <div className="flex gap-3">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          thumbnail={video.thumbnail}
          title={video.title}
          channelName={video.user.username}
          channelAvatar={video.user.avatar}
          views={video.views}
          uploadedAt={new Date(video.createdAt)}
        />
      ))}
      {loading && skeletons}
      {hasMore && <div ref={ref} className="col-span-full h-20"></div>}
    </div>
  );
}