export interface IUser {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }