import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './model/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './provider/exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExercisesController],
  providers: [ExercisesService]
})
export class ExercisesModule {}
