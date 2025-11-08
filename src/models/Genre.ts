import { Schema, model, Model, Types } from 'mongoose';

interface IGenre {
  name: string;
  description: string;
}

interface IGenreMethods {}

type GenreModel = Model<IGenre, {}, IGenreMethods>;

const schema = new Schema<IGenre, GenreModel, IGenreMethods>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
    trim: true,
  },
});

const Genre = model<IGenre, GenreModel>('Genre', schema);

export default Genre;
export { IGenre };
