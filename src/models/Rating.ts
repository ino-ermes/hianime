import { Schema, model, Model, Types } from 'mongoose';

interface IRating {
  user: Types.ObjectId;
  post: Types.ObjectId;
  score: number;
}

interface IRatingMethods {}

type RatingModel = Model<IRating, {}, IRatingMethods>;

const schema = new Schema<IRating, RatingModel, IRatingMethods>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

schema.index({ user: 1, post: 1 }, { unique: true });

const Rating = model<IRating, RatingModel>('Rating', schema);

export default Rating;
export { IRating };
