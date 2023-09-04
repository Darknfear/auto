import { Request } from 'express';
import { JwtPayload } from './jwt.interface';

export interface CustomRequest extends Request {
  user: JwtPayload;
}
