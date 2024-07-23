import { Router } from 'express';
import { getAllJobs, applyForJob } from '../controllers/job';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.get('/', getAllJobs);
router.post('/apply/:id', isAuthenticated, applyForJob);

export default router;
