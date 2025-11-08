import { Queue, Worker } from 'bullmq';
import { io } from '../index';
import Comment, { IComment } from '../models/Comment';

const queueName = 'Comment';

const commentQueue = new Queue(queueName, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

const commentWorker = new Worker(
  queueName,
  async (job) => {
    switch (job.data.action) {
      case 'comment': {
        const comment = job.data.comment;
        io.emit(comment.episode.toString(), job.data.action, { comment });
        break;
      }
      case 'vote': {
        const {
          commentId,
          userAction,
        }: { commentId: IComment; userAction: -1 | 0 | 1 } = job.data;

        const comment = await Comment.findOne({ _id: commentId });

        if (!comment) break;

        if (comment.parentComment) {
          io.emit(comment.episode.toString(), job.data.action, {
            replyId: comment._id.toString(),
            commentId: comment.parentComment.toString(),
            upvote: comment.upvote,
            devote: comment.devote,
            userId: comment.user.toString(),
            userAction,
          });
        } else {
          io.emit(comment.episode.toString(), job.data.action, {
            commentId: comment._id.toString(),
            upvote: comment.upvote,
            devote: comment.devote,
            userId: comment.user.toString(),
            userAction,
          });
        }

        break;
      }
    }
  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
  }
);

export default commentQueue;
