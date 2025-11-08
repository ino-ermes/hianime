import express from 'express';
import {
  deleteRating,
  getAverageRating,
  updateRating,
} from '../controllers/ratingsController';
import mayAuthenticateUser from '../middlewares/may-be-auth';
import authenticateUser from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(authenticateUser, updateRating);
router.route('/').delete(authenticateUser, deleteRating);
router.route('/').get(mayAuthenticateUser, getAverageRating);

export default router;
