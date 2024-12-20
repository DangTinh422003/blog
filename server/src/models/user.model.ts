import { type InferSchemaType, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      default: '',
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export type User = InferSchemaType<typeof userSchema>;
const userModel = model<User>(DOCUMENT_NAME, userSchema);
export default userModel;
