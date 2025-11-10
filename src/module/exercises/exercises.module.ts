import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './model/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExercisesController]
})
export class ExercisesModule {}
