import { Schema, model, Model, Types } from 'mongoose';

interface IStudio {
  name: string;
  description: string;
}

interface IStudioMethods {}

type StudioModel = Model<IStudio, {}, IStudioMethods>;

const schema = new Schema<IStudio, StudioModel, IStudioMethods>({
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
    minlength: 32,
    maxlength: 1024,
    trim: true,
  },
});

const Studio = model<IStudio, StudioModel>('Studio', schema);

export default Studio;
export { IStudio };
