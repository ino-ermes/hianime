import express, { Request, Response } from 'express';
import withImage from '../middlewares/with-image';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.route('/').post(withImage, (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ url: (req.file as any).path });
});

export default router;
