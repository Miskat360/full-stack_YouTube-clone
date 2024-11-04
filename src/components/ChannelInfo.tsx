import React from 'react';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';

interface ChannelInfoProps {
  channel: User;
  subscriberCount: number;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export default function ChannelInfo({ channel, subscriberCount, isSubscribed, onSubscribe }: ChannelInfoProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <img
          src={channel.avatar}
          alt={channel.username}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-bold">{channel.username}</h3>
          <p className="text-sm text-gray-600">{subscriberCount.toLocaleString()} subscribers</p>
        </div>
      </div>
      {user && user.id !== channel.id && (
        <button
          onClick={onSubscribe}
          className={`px-4 py-2 rounded-full font-medium ${
            isSubscribed
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      )}
    </div>
  );
}