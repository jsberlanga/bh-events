import { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from '../db';

export default async function database(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  await connectToDatabase();

  next();
}
