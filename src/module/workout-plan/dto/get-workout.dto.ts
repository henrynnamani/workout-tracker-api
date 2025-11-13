import { IsEnum, IsNotEmpty } from 'class-validator';
import { WorkoutPlan, WorkoutPlanStatus } from '../model/workout-plan.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetWorkoutDto {
  @ApiProperty({
    description: 'Status of the workout plan',
    example: WorkoutPlanStatus.COMPLETED,
  })
  @IsEnum(WorkoutPlanStatus)
  @IsNotEmpty()
  status: WorkoutPlanStatus;
}
