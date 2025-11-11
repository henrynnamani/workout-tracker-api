import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Comment } from '../model/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelAction } from '@/shared/services/model-action.service';
import { IComment } from '@/types/comment';

@Injectable()
export class CommentsService {
  private modelAction: ModelAction<Comment>;
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {
    this.modelAction = new ModelAction(commentRepository);
  }

  async addComment(comment: IComment) {
    try {
      const record = await this.modelAction.create({
        content: comment.content,
        user: { id: comment.userId },
        workoutPlan: { id: comment.workoutPlanId },
      });

      return record;
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
  }
}
