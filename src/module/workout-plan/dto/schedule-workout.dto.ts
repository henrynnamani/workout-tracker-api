import { IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleWorkoutDto {
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;
}
