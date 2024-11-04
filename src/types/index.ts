export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  user: User;
  views: number;
  likes: string[];
  dislikes: string[];
  tags: string[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}