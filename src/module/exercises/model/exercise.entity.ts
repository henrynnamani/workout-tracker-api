import { Workout } from '@/module/workouts/model/workout.entity';
import { BaseModel } from '@/shared/base-model';
import { Column, Entity, ManyToMany } from 'typeorm';

export enum ExerciseCategory {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  BALANCE = 'balance',
}

@Entity('exercises')
export class Exercise extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: ExerciseCategory, nullable: false })
  category: ExerciseCategory;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];
}
