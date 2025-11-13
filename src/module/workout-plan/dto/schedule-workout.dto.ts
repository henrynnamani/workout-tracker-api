import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleWorkoutDto {
  @ApiProperty({
    description: 'The date and time when the workout is scheduled',
    example: '2024-07-01T10:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  scheduledAt: Date;
}
