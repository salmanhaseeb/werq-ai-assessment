export interface IJob {
    _id?: string;
    title: string;
    description: string;
    company: string;
    location: string;
    applicants?: {
        userId: string;
        coverLetter: string;
      }[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  