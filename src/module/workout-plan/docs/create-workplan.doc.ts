import { applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateWorkoutDto } from '../dto/create-workout.dto';

export const createWorkoutPlanDoc = () => {
  return applyDecorators(
    ApiBasicAuth(),
    ApiBody({
      type: CreateWorkoutDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Workout plan created successfully.',
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
