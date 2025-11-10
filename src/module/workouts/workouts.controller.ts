import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { WorkoutsService } from './provider/workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post('')
  createWorkout() {}

  @Patch('')
  updateWorkout() {}

  @Delete(':id')
  deleteWorkout() {}

  @Post('schedule')
  scheduleWorkout() {}

  @Get('')
  getWorkouts() {}

  @Get('report')
  generateReport() {}
}
