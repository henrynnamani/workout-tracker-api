import { Controller, Get } from '@nestjs/common';
import { ExercisesService } from './provider/exercises.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('')
  @ApiBearerAuth()
  getExercises() {
    return this.exercisesService.getAllExercises();
  }
}
