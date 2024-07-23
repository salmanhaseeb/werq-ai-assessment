import { Job } from '../models/job';
import { IJob } from '../types/job';

export class JobService {
  public static async getAllJobs(): Promise<IJob[]> {
    return await Job.find();
  }

  public static async applyForJob(jobId: string, userId: string, coverLetter: string): Promise<void> {
    try {
      const job = await Job.findOneAndUpdate(
        { _id: jobId, 'applicants.userId': { $ne: userId } },
        { $push: { applicants: { userId, coverLetter } } },
        { new: true, runValidators: true }
      );
      
      if (!job) {
        throw new Error('Application failed or already applied');
      }
    } catch (error) {
      throw new Error(`Error applying for job: ${error}`);
    }
  }
}
