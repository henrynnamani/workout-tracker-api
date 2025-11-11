import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutExercise } from './model/workout-exercise.entity';
import { WorkoutExercisesService } from './provider/workout-exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutExercise])],
  providers: [WorkoutExercisesService],
  exports: [WorkoutExercisesService],
})
export class WorkoutExercisesModule {}
