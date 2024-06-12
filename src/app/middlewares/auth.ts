import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Not authorized to access this resource' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET) as { id: string, role: string };
    const user = await User.findOne({ _id: data.id });

    if (!user) {
      return res.status(401).send({ error: 'Not authorized to access this resource' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || '')) {
      return res.status(403).send({ error: 'Forbidden' });
    }
    next();
  };
};
