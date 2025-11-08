import { Schema, model, Model, Types } from 'mongoose';

interface IFavorite {
  user: Types.ObjectId;
  post: Types.ObjectId;
  list: string;
}

interface IFavoriteMethods {}

type FavoriteModel = Model<IFavorite, {}, IFavoriteMethods>;

const schema = new Schema<IFavorite, FavoriteModel, IFavoriteMethods>({
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
  list: {
    type: String,
    enum: ['fav', 'later', 'current', 'arch'],
    required: true,
  },
});

schema.index({ user: 1, post: 1 }, { unique: true });

const Favorite = model<IFavorite, FavoriteModel>('Favorite', schema);

export default Favorite;
export { IFavorite };
