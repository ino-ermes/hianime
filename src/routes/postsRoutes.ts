import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getAllPosts,
  updatePost,
  getTopPosts,
  increaseView,
  getStats,
  getAllPostsByGenre,
} from '../controllers/postsController';

import onlyAdmin from '../middlewares/admin-only';

const router = express.Router();

router.route('/').get(getAllPosts);
router.route('/top').get(getTopPosts);
router.route('/stats').get(onlyAdmin, getStats);
router.route('/by-genre/:id').get(getAllPostsByGenre);
router.route('/:id').get(getPost);
router.route('/').post(onlyAdmin, createPost);
router.route('/:id').put(onlyAdmin, updatePost);
router.route('/:id').delete(onlyAdmin, deletePost);
router.route('/:id/watch').post(increaseView);

export default router;
