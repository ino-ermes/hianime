import { Schema, model, Model, Types } from 'mongoose';

interface IViewCount {
  post: Types.ObjectId;
  count: number;
  date: Date;
}

interface IViewCountMethods {}

type ViewCountModel = Model<IViewCount, {}, IViewCountMethods>;

const schema = new Schema<IViewCount, ViewCountModel, IViewCountMethods>({
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
  count: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
});

schema.index({ date: 1, post: 1 }, { unique: true });

const ViewCount = model<IViewCount, ViewCountModel>('ViewCount', schema);

export default ViewCount;
export { IViewCount };
