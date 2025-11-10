import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { IUser } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: IUser): Promise<User> {
    return {} as User;
  }

  async userExistByEmail(email: string): Promise<User> {
    return {} as User;
  }
}
