import { Schema, model, Model } from 'mongoose';

interface IGroup {
  name: string;
}

interface IGroupMethods {}

type GroupModel = Model<IGroup, {}, IGroupMethods>;

const schema = new Schema<IGroup, GroupModel, IGroupMethods>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Group = model<IGroup, GroupModel>('Group', schema);

export default Group;
export { IGroup };
