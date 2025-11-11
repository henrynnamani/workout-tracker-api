import { ModelAction } from '@/shared/services/model-action.service';
import { IWorkoutPlan } from '@/types/workout';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from '../model/workout-plan.entity';
import { Repository } from 'typeorm';
import { WorkoutExercisesService } from '@/module/workout-exercises/provider/workout-exercises.service';
import * as SYS_MSG from '@/shared/system-message';

@Injectable()
export class WorkoutPlanService {
  private modelAction: ModelAction<WorkoutPlan>;

  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepository: Repository<WorkoutPlan>,
    private readonly workoutExerciseService: WorkoutExercisesService,
  ) {
    this.modelAction = new ModelAction(workoutPlanRepository);
  }

  async createWorkout(createWorkout: IWorkoutPlan) {
    const { exercises, title, userId } = createWorkout;

    try {
      const workoutPlan = await this.modelAction.create({
        title,
        user: { id: userId },
      });

      const workoutExercises =
        await this.workoutExerciseService.addWorkoutExercises(exercises);

      workoutPlan.exercises = workoutExercises;

      await this.modelAction.save(workoutPlan);

      return {
        message: SYS_MSG.WORKOUT_CREATED_SUCCESSFULLY,
        data: workoutPlan,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
