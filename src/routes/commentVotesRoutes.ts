import express from 'express';
import {
  createCommentVote,
  deleteCommentVote,
} from '../controllers/commentVotesController';
import authenticateUser from '../middlewares/auth';

const router = express.Router();

router.route('/').post(authenticateUser, createCommentVote);
router.route('/').delete(authenticateUser, deleteCommentVote);

export default router;
