import express from 'express';
import {
  deleteHistory,
  getHistory,
  updateHistory,
} from '../controllers/historiesController';

const router = express.Router();

router.route('/').get(getHistory);
router.route('/').delete(deleteHistory);
router.route('/').post(updateHistory);

export default router;
