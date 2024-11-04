import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchVideos = async (page = 1, limit = 12) => {
  const response = await api.get(`/videos?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchVideo = async (id: string) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const createVideo = async (videoData: {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  tags?: string;
}) => {
  const response = await api.post('/videos', videoData);
  return response.data;
};

export const subscribeToChannel = async (channelId: string) => {
  const response = await api.post(`/users/${channelId}/subscribe`);
  return response.data;
};

export const unsubscribeFromChannel = async (channelId: string) => {
  const response = await api.post(`/users/${channelId}/unsubscribe`);
  return response.data;
};

export const checkSubscription = async (channelId: string) => {
  const response = await api.get(`/users/${channelId}/subscription-status`);
  return response.data.isSubscribed;
};