import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { WorkoutPlanService } from './provider/workout-plan.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { LoggedInUser } from '../auth/decorator/current-user';

@Controller('workout-plans')
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @Post('')
  createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @LoggedInUser('id') userId,
  ) {
    return this.workoutPlanService.createWorkout({
      userId,
      ...createWorkoutDto,
    });
  }

  @Patch('')
  updateWorkout() {}

  @Delete(':id')
  deleteWorkout() {}

  @Patch(':id/schedule')
  scheduleWorkout() {}

  @Get('')
  getWorkouts() {}

  @Get('report')
  generateWorkouts() {}
}
