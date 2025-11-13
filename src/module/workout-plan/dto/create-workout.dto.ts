import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExerciseDto {
  @ApiProperty({
    description: 'The unique identifier of the exercise',
    example: 'ex1',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Number of sets for the exercise',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  sets: number;

  @ApiProperty({
    description: 'Number of reps for the exercise',
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @ApiProperty({
    description: 'Weight used for the exercise in kilograms',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  weight: number;
}

export class CreateWorkoutDto {
  @ApiProperty({
    description: 'Title of the workout plan',
    example: 'Full Body Strength Training',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'List of exercises included in the workout plan',
    type: [ExerciseDto],
    example: [
      {
        id: 'ex1',
        sets: 3,
        reps: 12,
        weight: 50,
      },
      {
        id: 'ex2',
        sets: 4,
        reps: 10,
        weight: 70,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDto)
  exercises: ExerciseDto[];
}
