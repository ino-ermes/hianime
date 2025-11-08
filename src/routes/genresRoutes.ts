import express from 'express';
import {
  createGenre,
  getGenre,
  getAllGenres,
  updateGenre,
  deleteGenre,
} from '../controllers/genresController';
import onlyAdmin from '../middlewares/admin-only';

const router = express.Router();

router.route('/:id').get(getGenre);
router.route('/').get(getAllGenres);
router.route('/').post(onlyAdmin, createGenre);
router.route('/:id').put(onlyAdmin, updateGenre);
router.route('/:id').delete(onlyAdmin, deleteGenre);

export default router;
