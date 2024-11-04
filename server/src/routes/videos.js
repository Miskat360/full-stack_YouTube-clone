import express from 'express';
import { getVideos, getVideo, createVideo } from '../controllers/videos.js';
import { auth } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/', [
  auth,
  body('title').trim().notEmpty(),
  body('url').trim().notEmpty(),
  body('thumbnail').trim().notEmpty()
], createVideo);

export default router;