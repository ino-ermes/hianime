import express from 'express';
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from '../controllers/commentsController';
import authenticateUser from '../middlewares/auth';
import mayAuthenticateUser from '../middlewares/may-be-auth';

const router = express.Router();

router.route('/').get(mayAuthenticateUser, getAllComments);
router.route('/').post(authenticateUser, createComment);
router.route('/:id').put(authenticateUser, updateComment);
router.route('/:id').delete(authenticateUser, deleteComment);

export default router;
