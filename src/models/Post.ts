import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';

interface IPost {
  title: string;
  posterVerticalPath: string;
  posterHorizonPath: string;
  description: string;
  type: string;
  airedFrom: Date;
  airedTo: Date;
  status: string;
  duration: number;
  studio: Types.ObjectId;
  group?: Types.ObjectId;
}

interface IPostMethods {}

type PostModel = Model<IPost, {}, IPostMethods>;

const schema = new Schema<IPost, PostModel, IPostMethods>(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128,
      trim: true,
    },
    posterVerticalPath: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    posterHorizonPath: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    description: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 8192,
      trim: true,
    },
    type: {
      type: String,
      enum: ['tv', 'movie', 'ona', 'ova'],
      required: true,
    },
    airedFrom: {
      type: Date,
      required: true,
    },
    airedTo: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['airing', 'completed', 'waiting'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 3,
      max: 300,
    },
    studio: {
      type: Schema.Types.ObjectId,
      ref: 'Studio',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  },
  { timestamps: true }
);

const Post = model<IPost, PostModel>('Post', schema);

export default Post;
export { IPost };
