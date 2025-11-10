import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import { IUser } from 'src/types/user';
import { ModelAction } from '@/shared/services/model-action.service';

@Injectable()
export class UserService {
  private modelAction: ModelAction<User>;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    this.modelAction = new ModelAction<User>(this.userRepository);
  }

  async createUser(user: IUser): Promise<User> {
    try {
      return await this.modelAction.create(user);
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async userExistByEmail(email: string) {
    try {
      return await this.modelAction.findBy({ email });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
