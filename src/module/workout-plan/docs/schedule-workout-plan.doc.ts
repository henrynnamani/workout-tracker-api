import { applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { ScheduleWorkoutDto } from '../dto/schedule-workout.dto';

export const scheduleWorkoutDoc = () => {
  return applyDecorators(
    ApiBasicAuth(),
    ApiBody({
      type: ScheduleWorkoutDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Workout plan scheduled successfully.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. Authentication is required.',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request. Invalid input data.',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error. An unexpected error occurred.',
    }),
  );
};
