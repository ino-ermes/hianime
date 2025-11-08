import { Schema, model, Model, Types } from 'mongoose';

interface ICommentVote {
  user: Types.ObjectId;
  comment: Types.ObjectId;
  isUpvote: boolean;
}

interface ICommentVoteMethods {}

type CommentVoteModel = Model<ICommentVote, {}, ICommentVoteMethods>;

const schema = new Schema<ICommentVote, CommentVoteModel, ICommentVoteMethods>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Comment',
  },
  isUpvote: {
    type: Boolean,
    required: true,
  },
});

schema.index({ comment: 1, user: 1 }, { unique: true });

const CommentVote = model<ICommentVote, CommentVoteModel>(
  'CommentVote',
  schema
);

export default CommentVote;
export { ICommentVote };
