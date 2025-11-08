import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';
import Post from './Post';

interface IEpisode {
  post: Types.ObjectId;
  index: number;
  episodeNumber: number;
  title: string;
  duration: number;
  releaseDate: Date;
  path: string;
  rendering: boolean;
}

interface IEpisodeMethods {}

type EpisodeModel = Model<IEpisode, {}, IEpisodeMethods>;

const schema = new Schema<IEpisode, EpisodeModel, IEpisodeMethods>({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  episodeNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  path: {
    type: String,
    required: false,
  },
  rendering: {
    type: Boolean,
    required: true,
    default: false,
  },
});

schema.index({ post: 1 });

const Episode = model<IEpisode, EpisodeModel>('Episode', schema);

export default Episode;
export { IEpisode };
