import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutPlanService } from './provider/workout-plan.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { LoggedInUser } from '../auth/decorator/current-user';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { IComment } from '@/types/comment';
import { IWorkoutPlan } from '@/types/workout';

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

  @Patch(':id')
  updateWorkout(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
    @LoggedInUser('id') userId,
  ) {
    return this.workoutPlanService.updateWorkout(
      updateWorkoutDto.content,
      id,
      userId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteWorkout(@Param('id') id: string) {
    return this.workoutPlanService.deleteWorkout(id);
  }

  @Patch(':id/schedule')
  scheduleWorkout() {}

  @Get('')
  getWorkouts() {}

  @Get('report')
  generateWorkouts() {}
}
