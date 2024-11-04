import React, { useEffect, useState, useCallback } from 'react';
import VideoGrid from '../components/VideoGrid';
import { fetchVideos } from '../api';
import { Video } from '../types';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadVideos = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const data = await fetchVideos(pageNum);
      if (pageNum === 1) {
        setVideos(data.videos);
      } else {
        setVideos(prev => [...prev, ...data.videos]);
      }
      setHasMore(pageNum < data.totalPages);
    } catch (err) {
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVideos(1);
  }, [loadVideos]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadVideos(nextPage);
    }
  };

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
        <VideoGrid
          videos={videos}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}