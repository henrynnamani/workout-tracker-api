// src/module/workout-exercise/entities/workout-exercise.entity.ts

import { Exercise } from '@/module/exercises/model/exercise.entity';
import { WorkoutPlan } from '@/module/workout-plan/model/workout-plan.entity';
import { BaseModel } from '@/shared/base-model';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workout_exercises')
export class WorkoutExercise extends BaseModel {
  @ManyToOne(() => WorkoutPlan, (plan) => plan.exercises, {
    onDelete: 'CASCADE',
  })
  workoutPlan: WorkoutPlan;

  @OneToOne(() => Exercise, (exercise) => exercise.id, {
    eager: true,
  })
  exercise: Exercise;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column({ type: 'float', nullable: true })
  weight: number;
}
