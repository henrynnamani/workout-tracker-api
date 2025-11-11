import { ModelAction } from '@/shared/services/model-action.service';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { WorkoutExercise } from '../model/workout-exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWorkoutExercise } from '@/types/workout';

@Injectable()
export class WorkoutExercisesService {
  private modelAction: ModelAction<WorkoutExercise>;

  constructor(
    @InjectRepository(WorkoutExercise)
    private readonly workoutExerciseRepository: Repository<WorkoutExercise>,
  ) {
    this.modelAction = new ModelAction(workoutExerciseRepository);
  }

  async addWorkoutExercises(exercises: IWorkoutExercise[]) {
    try {
      const records = await this.modelAction.createMany(exercises);

      return records;
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
