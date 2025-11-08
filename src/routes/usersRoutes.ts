import express from 'express';
import { getAllUsers, resetPassword } from '../controllers/usersController';

const router = express.Router();

router.route('/:user/reset-password').post(resetPassword);
router.route('/').get(getAllUsers);

export default router;
