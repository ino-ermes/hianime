import express from 'express';
import {
  createGroup,
  getGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
} from '../controllers/groupsController';

const router = express.Router();

router.route('/:id').get(getGroup);
router.route('/').get(getAllGroups);
router.route('/').post(createGroup);
router.route('/:id').put(updateGroup);
router.route('/:id').delete(deleteGroup);

export default router;
