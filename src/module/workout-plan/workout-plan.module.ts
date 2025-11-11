import { Module } from '@nestjs/common';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanService } from './provider/workout-plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from './model/workout-plan.entity';
import { WorkoutExercisesModule } from '../workout-exercises/workout-exercises.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan]), WorkoutExercisesModule],
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService],
})
export class WorkoutPlanModule {}
