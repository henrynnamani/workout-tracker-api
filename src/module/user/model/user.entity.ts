import { Comment } from '@/module/comments/model/comment.entity';
import { WorkoutPlan } from '@/module/workout-plan/model/workout-plan.entity';
import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => WorkoutPlan, (plan) => plan.user)
  workoutPlans: WorkoutPlan[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
