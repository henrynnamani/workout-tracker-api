import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async signUp(signUpDto: SignUpDto) {
    try {
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async signIn(signInDto: SignInDto) {}
}
