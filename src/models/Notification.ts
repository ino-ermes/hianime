import { Schema, model, Model, Types } from 'mongoose';

interface INotification {
  user: Types.ObjectId;
  post: Types.ObjectId;
  episode: Types.ObjectId;
  message: string;
  isRead: boolean;
}

interface INotificationMethods {}

type NotificationModel = Model<INotification, {}, INotificationMethods>;

const schema = new Schema<
  INotification,
  NotificationModel,
  INotificationMethods
>(
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
    message: {
      type: String,
      required: true,
      maxlength: 40,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model<INotification, NotificationModel>(
  'Notification',
  schema
);

export default Notification;
export { INotification };
