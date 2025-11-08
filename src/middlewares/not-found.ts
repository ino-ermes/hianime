import { Request, Response } from 'express';

const notFoundMiddleWare = (req: Request, res: Response) => {
  res.status(404).json({msg: 'to live a better life, i need my love to be here'});
};

export default notFoundMiddleWare;
