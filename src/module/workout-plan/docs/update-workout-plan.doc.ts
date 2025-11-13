import { applyDecorators } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';

export const updateWorkoutPlanDoc = () => {
  return applyDecorators(
    ApiBasicAuth(),
    ApiBody({
      type: UpdateWorkoutDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Workout plan updated successfully.',
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
