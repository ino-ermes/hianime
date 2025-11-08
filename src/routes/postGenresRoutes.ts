import express from 'express';
import {
  createPostGenre,
  deletePostGenre,
} from '../controllers/postGenresController';

const router = express.Router();

router.route('/').post(createPostGenre);
router.route('/').delete(deletePostGenre);

export default router;
