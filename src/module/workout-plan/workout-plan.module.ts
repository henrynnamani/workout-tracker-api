import { Module } from '@nestjs/common';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanService } from './provider/workout-plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from './model/workout-plan.entity';
import { WorkoutExercisesModule } from '../workout-exercises/workout-exercises.module';
import { CommentsModule } from '../comments/comments.module';
    
@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutPlan]),
    WorkoutExercisesModule,
    CommentsModule,
  ],
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService],
})
export class WorkoutPlanModule {}
