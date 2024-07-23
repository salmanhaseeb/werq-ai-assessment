import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { IUser } from '../types/user';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';

export class AuthService {
  public static async register(user: IUser): Promise<IUser> {
    const { email, password, firstName, lastName } = user;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, firstName, lastName });
    await newUser.save();
    return newUser;
  }

  public static async login(email: string, password: string): Promise<{[key: string]: string}> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const accessToken =  generateAccessToken(user._id!);
    const refreshToken =  generateRefreshToken(user._id!);

    return {
        accessToken,
        refreshToken
    }
  }

  public static async refreshAccessToken(userId: string): Promise<{[key: string]: string}> {
    const accessToken =  generateAccessToken(userId);
    const refreshToken =  generateRefreshToken(userId);

    return {
        accessToken,
        refreshToken
    }
  }
}
