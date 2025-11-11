import { Module } from '@nestjs/common';
import { UserService } from './provider/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { WorkoutPlan } from '../workout-plan/model/workout-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
