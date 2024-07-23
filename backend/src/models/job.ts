import { Schema, model } from 'mongoose';
import { IJob } from '../types/job';

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: [true, "can't be blank"] },
    description: { type: String, required: [true, "can't be blank"] },
    company: { type: String, required: [true, "can't be blank"] },
    location: { type: String, required: [true, "can't be blank"] },
    applicants: [
        {
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "can't be blank"] },
          coverLetter: { type: String, required: [true, "can't be blank"] },
        },
      ],
  },
  { timestamps: true }
);
jobSchema.index({ 'applicants.userId': 1, _id: 1 }, { unique: true });
export const Job = model<IJob>('Job', jobSchema);
