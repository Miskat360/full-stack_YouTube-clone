import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  uploadedAt: Date;
}

export default function VideoCard({
  id,
  thumbnail,
  title,
  channelName,
  channelAvatar,
  views,
  uploadedAt,
}: VideoCardProps) {
  return (
    <Link to={`/watch/${id}`} className="flex flex-col gap-3">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex gap-3">
        <img
          src={channelAvatar}
          alt={channelName}
          className="w-9 h-9 rounded-full"
        />
        <div>
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600">{channelName}</p>
          <p className="text-sm text-gray-600">
            {views.toLocaleString()} views • {formatDistanceToNow(uploadedAt, { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
}