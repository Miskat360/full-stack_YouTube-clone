import Video from '../models/Video.js';
import { validationResult } from 'express-validator';

export const getVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments();

    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('user', 'username avatar subscribers')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar'
        }
      });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createVideo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, url, thumbnail, tags } = req.body;

    const video = new Video({
      title,
      description,
      url,
      thumbnail,
      tags: tags?.split(',').map(tag => tag.trim()),
      user: req.userId
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};