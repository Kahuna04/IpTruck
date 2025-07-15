import { JwtPayload } from '../shared/constants';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
