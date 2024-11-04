import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Upload, Bell, User as UserIcon, Youtube } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-1">
            <Youtube size={32} className="text-red-600" />
            <span className="font-semibold text-xl">YouTube</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100">
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/upload" className="p-2 hover:bg-gray-100 rounded-full">
                <Upload size={24} />
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={24} />
              </button>
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-blue-600 border border-blue-600 rounded-full px-4 py-1.5 hover:bg-blue-50"
            >
              <UserIcon size={20} />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}