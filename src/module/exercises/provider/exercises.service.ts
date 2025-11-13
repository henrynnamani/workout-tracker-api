import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../model/exercise.entity';
import { Repository } from 'typeorm';
import { ModelAction } from '@/shared/services/model-action.service';

@Injectable()
export class ExercisesService {
  private modelAction: ModelAction<Exercise>;
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {
    this.modelAction = new ModelAction<Exercise>(this.exerciseRepository);
  }

  async getAllExercises(): Promise<Exercise[]> {
    return await this.modelAction.findAll();
  }
}
