import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  const key = process.env.JWT_SECRET || '';

  try {
    const decoded = jwt.verify(token, key) as JwtPayload;
    req.user = decoded as JwtPayload;
    return next();
  } catch (error) {
    return res.status(403).send('Forbidden');
  }
};
