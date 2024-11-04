import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Clock, ThumbsUp, PlaySquare, History } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Compass size={24} />, label: 'Explore', path: '/explore' },
    { icon: <History size={24} />, label: 'History', path: '/history' },
    { icon: <PlaySquare size={24} />, label: 'Your videos', path: '/your-videos' },
    { icon: <Clock size={24} />, label: 'Watch later', path: '/watch-later' },
    { icon: <ThumbsUp size={24} />, label: 'Liked videos', path: '/liked' },
  ];

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-white border-r overflow-y-auto">
      <div className="py-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-6 px-6 py-3 hover:bg-gray-100"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}