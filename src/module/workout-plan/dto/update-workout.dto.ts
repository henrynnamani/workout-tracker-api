import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @ApiProperty({
    description: 'Updated content of the workout plan',
    example: 'Updated workout plan content here',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
