import express from 'express';
import {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
  getFavorite,
} from '../controllers/favoritesController';

const router = express.Router();

router.route('/').get(getAllFavorites);
router.route('/').post(createFavorite);
router.route('/my-list').get(getFavorite);
router.route('/').delete(deleteFavorite);

export default router;
