import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.JWT_SECRET!;

interface User {
  id: number;
  username: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secretKey, (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  };