import { Schema, model, Model, Types } from 'mongoose';

interface IPostGenre {
  post: Types.ObjectId;
  genre: Types.ObjectId;
}

interface IPostGenreMethods {}

type PostGenreModel = Model<IPostGenre, {}, IPostGenreMethods>;

const schema = new Schema<IPostGenre, PostGenreModel, IPostGenreMethods>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
  },
);

schema.index({ post: 1, genre: 1 }, { unique: true });

const PostGenre = model<IPostGenre, PostGenreModel>('PostGenre', schema);

export default PostGenre;
export { IPostGenre };
