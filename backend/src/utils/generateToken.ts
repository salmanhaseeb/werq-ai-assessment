import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id, type: 'access' }, config.JWT_SECRET!, {
    expiresIn: '20min',
  });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id, type: 'refresh' }, config.JWT_SECRET!, {
    expiresIn: '2d',
  });
};
