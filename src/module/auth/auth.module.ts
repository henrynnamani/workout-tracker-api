import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './provider/auth.service';
import { UserModule } from '../user/user.module';
import { TokenService } from '@/shared/auth/token.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
