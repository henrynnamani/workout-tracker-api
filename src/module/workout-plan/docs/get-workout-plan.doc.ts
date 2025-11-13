import { applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { GetWorkoutDto } from '../dto/get-workout.dto';

export const getWorkoutDoc = () => {
  return applyDecorators(
    ApiBasicAuth(),
    ApiBody({
      type: GetWorkoutDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Workout plan fetched successfully.',
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
