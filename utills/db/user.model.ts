/* eslint-disable max-len */
import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserPattern {
  username: string;
  email: string;
  surname: string;
}

export interface IUser extends Document, IUserPattern {}

interface IUserModel extends Model<IUser> {
  handleOAuth(
    uniqueId: string,
    username: string,
    email: string
  ): Promise<IUser>;

  createUserWithOAuth(userToCreate: IUserPattern): Promise<IUser>;
  createUserWithEmailPassword(
    username: string,
    email: string,
    password: string
  ): Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, min: 3 },
  uniqueId: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false, min: 6 },
});

UserSchema.statics.handleOAuth = async function (
  uniqueId: string,
  username: string,
  email: string
): Promise<IUser> {
  try {
    const existingUser = await this.findOne({
      uniqueId: uniqueId,
      email: email,
    });
    if (existingUser) {
      return existingUser;
    } else {
      const userToCreate: IUserPattern = {
        username: username,
        uniqueId: uniqueId,
        email: email,
      };
      const newUser = await this.createUserWithOAuth(userToCreate);
      return newUser;
    }
  } catch (err) {
    throw err;
  }
};

UserSchema.statics.createUserWithOAuth = async function (
  userToCreate: IUserPattern
): Promise<IUser> {
  const entry: IUser = new this(userToCreate);
  const result = await entry.save();
  return result;
};

UserSchema.statics.createUserWithEmailPassword = async function (
  username: string,
  email: string,
  password: string
): Promise<IUser> {
  const userToCreate: IUserPattern = {
    username: username,
    email: email,
    password: password,
  };
  const hashedPassword = await bcrypt.hash(userToCreate.password, 13);
  const userWithHashedPassword: IUserPattern = {
    username: userToCreate.username,
    email: userToCreate.email,
    //  password: hashedPassword,
  };

  const entry: IUser = new this(userWithHashedPassword);
  const result = await entry.save();
  return result;
};

const UserModel = model<IUser, IUserModel>('User', UserSchema);

export default UserModel;
