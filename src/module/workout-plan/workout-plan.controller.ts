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
import { createWorkoutPlanDoc } from './docs/create-workplan.doc';
import { updateWorkoutPlanDoc } from './docs/update-workout-plan.doc';
import { scheduleWorkoutDoc } from './docs/schedule-workout-plan.doc';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('workout-plans')
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @createWorkoutPlanDoc()
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

  @updateWorkoutPlanDoc()
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

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteWorkout(@Param('id') id: string) {
    return this.workoutPlanService.deleteWorkout(id);
  }

  @scheduleWorkoutDoc()
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

  @ApiBearerAuth()
  @Get('')
  getWorkouts(@Body() getWorkoutDto: GetWorkoutDto) {
    return this.workoutPlanService.getWorkouts(getWorkoutDto.status);
  }

  @ApiBearerAuth()
  @Get('report')
  generateWorkouts(@LoggedInUser('id') userId: string) {
    console.log('Generating report for user:', userId);
    return this.workoutPlanService.generateWorkoutReport(userId);
  }
}
