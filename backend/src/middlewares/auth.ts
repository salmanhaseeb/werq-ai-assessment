import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/auth-request';
import { config } from '../config';

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET as string);
        if (decoded.type === 'access') {
            req.user = decoded.id
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Credentials.' });
    }
};

export const isValidRefreshToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.body.refreshToken;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET as string);
        if (decoded.type === 'refresh') {
            req.user = decoded.id
        }
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
