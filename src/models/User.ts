import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  avtPath?: string;
  setting: {
    autoPlay: boolean;
    autoNext: boolean;
  };
}

interface IUserMethods {
  createJWT(): string;
  comparePassword(candidate: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 25,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    avtPath: { type: String, required: false },
    setting: {
      type: {
        autoNext: Boolean,
        autoPlay: Boolean,
      },
      default: {
        autoNext: true,
        autoPlay: true,
      },
    },
  },
  { timestamps: true }
);

schema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

schema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, role: this.role }, 'secret', {
    expiresIn: '1d',
  });
};

schema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = model<IUser, UserModel>('User', schema);

export default User;
export { IUser };
