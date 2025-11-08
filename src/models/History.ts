import { Schema, model, Model, Types } from 'mongoose';

interface IHistory {
  user: Types.ObjectId;
  post: Types.ObjectId;
  episode: Types.ObjectId;
  position: number;
}

interface IHistoryMethods {}

type HistoryModel = Model<IHistory, {}, IHistoryMethods>;

const schema = new Schema<IHistory, HistoryModel, IHistoryMethods>(
  {
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
    episode: {
      type: Schema.Types.ObjectId,
      ref: 'Episode',
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, _id: false }
);

schema.index({ user: 1, post: 1 }, { unique: true });

const History = model<IHistory, HistoryModel>('History', schema);

export default History;
export { IHistory };
