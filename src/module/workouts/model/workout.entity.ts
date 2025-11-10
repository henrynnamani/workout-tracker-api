import { Exercise } from '@/module/exercises/model/exercise.entity';
import { User } from '@/module/user/model/user.entity';
import { BaseModel } from '@/shared/base-model';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('workouts')
export class Workout extends BaseModel {
  @ManyToOne(() => User, (user) => user.workouts)
  user: User;

  @ManyToMany(() => Exercise, (exercise) => exercise.workouts)
  exercises: Exercise[];

  @Column({ type: 'int', nullable: false })
  repetition: number;

  @Column({ type: 'int', nullable: false })
  sets: number;

  @Column({ type: 'float', nullable: false })
  weights: number;
}
