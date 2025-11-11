import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
