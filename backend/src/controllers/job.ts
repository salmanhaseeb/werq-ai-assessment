import { Request, Response } from 'express';
import { JobService } from '../services/job';
import { AuthenticatedRequest } from '../types/auth-request';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(500).json("An unexpected error occurred");
      }
  }
};

export const applyForJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await JobService.applyForJob(req.params.id, req.user, req.body.coverLetter);
    res.status(200).json({ message: 'Application successful' });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(500).json("An unexpected error occurred");
      }
  }
};
