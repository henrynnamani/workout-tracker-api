import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async signUp(signUpDto: SignUpDto) {
    try {
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
