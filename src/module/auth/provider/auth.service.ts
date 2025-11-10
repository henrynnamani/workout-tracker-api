import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';
import { UserService } from 'src/module/user/provider/user.service';
import * as bcrypt from 'bcryptjs';
import * as SYS_MSG from '@/shared/system-message';
import { TokenService } from '@/shared/auth/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const salt = await bcrypt.genSalt(10);

      const userExist = await this.userService.userExistByEmail(
        signUpDto.email,
      );

      if (userExist) {
        throw new NotFoundException(SYS_MSG.USER_EXIST);
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, salt);

      const user = await this.userService.createUser({
        ...signUpDto,
        password: hashedPassword,
      });

      const accessToken = await this.tokenService.generateAccessToken(user);

      return {
        data: {
          user,
          accessToken,
        },
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userService.userExistByEmail(signInDto.email);

      if (!user) {
        throw new NotFoundException(SYS_MSG.INVALID_CREDENTIALS);
      }

      const isPasswordValid = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new NotFoundException(SYS_MSG.INVALID_CREDENTIALS);
      }

      const accessToken = await this.tokenService.generateAccessToken(user);

      return {
        data: {
          user,
          accessToken,
        },
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
