import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, ThumbsDown, Reply } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  user: {
    username: string;
    avatar: string;
  };
  likes: string[];
  createdAt: string;
}

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
}

export default function CommentSection({ videoId, comments }: CommentSectionProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // TODO: Implement comment submission
    setNewComment('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
          <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border-b focus:border-b-2 focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img src={comment.user.avatar} alt={comment.user.username} className="w-10 h-10 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user.username}</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="mt-1">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded-full">
                  <ThumbsUp size={16} />
                  <span>{comment.likes.length}</span>
                </button>
                <button className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded-full">
                  <ThumbsDown size={16} />
                </button>
                <button className="flex items-center gap-1 text-sm hover:bg-gray-100 px-2 py-1 rounded-full">
                  <Reply size={16} />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}