import { IsEnum, IsNotEmpty } from 'class-validator';
import { WorkoutPlan, WorkoutPlanStatus } from '../model/workout-plan.entity';

export class GetWorkoutDto {
  @IsEnum(WorkoutPlanStatus)
  @IsNotEmpty()
  status: WorkoutPlanStatus;
}
