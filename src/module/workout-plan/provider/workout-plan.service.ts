import { ModelAction } from '@/shared/services/model-action.service';
import { IWorkoutPlan } from '@/types/workout';
import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from '../model/workout-plan.entity';
import { Repository } from 'typeorm';
import { WorkoutExercisesService } from '@/module/workout-exercises/provider/workout-exercises.service';
import * as SYS_MSG from '@/shared/system-message';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';
import { CommentsService } from '@/module/comments/provider/comments.service';

@Injectable()
export class WorkoutPlanService {
  private modelAction: ModelAction<WorkoutPlan>;

  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanRepository: Repository<WorkoutPlan>,
    private readonly workoutExerciseService: WorkoutExercisesService,
    private readonly commentsService: CommentsService,
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

  async updateWorkout(content: string, id: string, userId: string) {
    try {
      const workoutPlan = await this.modelAction.findOne(id);

      if (!workoutPlan) {
        throw new NotFoundException(SYS_MSG.WORKOUT_NOT_FOUND);
      }

      const comment = await this.commentsService.addComment({
        content,
        userId,
        workoutPlanId: id,
      });

      workoutPlan.comments = [...(workoutPlan.comments || []), comment];

      await this.modelAction.save(workoutPlan);

      return {
        message: SYS_MSG.WORKOUT_UPDATED_SUCCESSFULLY,
        data: workoutPlan,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }

  async deleteWorkout(id: string) {
    try {
      const workoutPlan = await this.modelAction.findOne(id);

      if (!workoutPlan) {
        throw new NotFoundException(SYS_MSG.WORKOUT_NOT_FOUND);
      }

      await this.modelAction.remove(id);

      return {
        message: SYS_MSG.WORKOUT_DELETED_SUCCESSFULLY,
      };
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
