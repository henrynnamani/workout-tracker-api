import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './provider/workouts.service';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService]
})
export class WorkoutsModule {}
