import express from 'express';
import {
  createStudio,
  getStudio,
  getAllStudios,
  updateStudio,
  deleteStudio,
} from '../controllers/studiosController';
import onlyAdmin from '../middlewares/admin-only';

const router = express.Router();

router.route('/:id').get(getStudio);
router.route('/').get(getAllStudios);
router.route('/').post(onlyAdmin, createStudio);
router.route('/:id').put(onlyAdmin, updateStudio);
router.route('/:id').delete(onlyAdmin, deleteStudio);

export default router;
