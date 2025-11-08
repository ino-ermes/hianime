import express from 'express';
import {
  createEpisode,
  getEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
  getEpisodes,
} from '../controllers/episodesController';
import withVideo from '../middlewares/with-video';
import onlyAdmin from '../middlewares/admin-only';

const router = express.Router();

router.route('/').get(onlyAdmin, getAllEpisodes);
router.route('/').post(onlyAdmin, withVideo, createEpisode);
router.route('/watch').get(getEpisodes);
router.route('/:id').get(onlyAdmin, getEpisode);
router.route('/:id').put(onlyAdmin, withVideo, updateEpisode);
router.route('/:id').delete(onlyAdmin, deleteEpisode);

export default router;
