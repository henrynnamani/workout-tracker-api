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
import { ScheduleWorkoutDto } from './dto/schedule-workout.dto';
import { GetWorkoutDto } from './dto/get-workout.dto';

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
  scheduleWorkout(
    @Param('id') id: string,
    @Body() scheduleWorkoutDto: ScheduleWorkoutDto,
  ) {
    return this.workoutPlanService.scheduleWorkoutout(
      id,
      scheduleWorkoutDto.scheduledAt,
    );
  }

  @Get('')
  getWorkouts(@Body() getWorkoutDto: GetWorkoutDto) {
    return this.workoutPlanService.getWorkouts(getWorkoutDto.status);
  }

  @Get('report')
  generateWorkouts(@LoggedInUser('id') userId: string) {
    console.log('Generating report for user:', userId);
    return this.workoutPlanService.generateWorkoutReport(userId);
  }
}
