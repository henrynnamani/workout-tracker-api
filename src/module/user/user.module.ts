import { Module } from '@nestjs/common';
import { UserService } from './provider/user.service';

@Module({
  providers: [UserService]
})
export class UserModule {}
