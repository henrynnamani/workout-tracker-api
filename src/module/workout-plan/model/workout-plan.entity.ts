import { Comment } from '@/module/comments/model/comment.entity';
import { User } from '@/module/user/model/user.entity';
import { WorkoutExercise } from '@/module/workout-exercises/model/workout-exercise.entity';
import { BaseModel } from '@/shared/base-model';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity('workout_plans')
export class WorkoutPlan extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @ManyToOne(() => User, (user) => user.workoutPlans, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => WorkoutExercise, (we) => we.workoutPlan, { cascade: true })
  exercises: WorkoutExercise[];

  @OneToMany(() => Comment, (comment) => comment.workoutPlan)
  comments: Comment[];
}
