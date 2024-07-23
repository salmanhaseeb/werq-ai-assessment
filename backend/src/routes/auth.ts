import { Router } from 'express';
import { register, login, refreshTokens } from '../controllers/auth';
import { isValidRefreshToken } from '../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', isValidRefreshToken, refreshTokens);

export default router;
