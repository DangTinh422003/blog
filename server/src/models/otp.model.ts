import { type InferSchemaType, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'Otp';
export const COLLECTION_NAME = 'Otps';

const otpSchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'active', 'block'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    autoIndex: true,
  },
);

export type Otp = InferSchemaType<typeof otpSchema>;
const otpModel = model<Otp>(DOCUMENT_NAME, otpSchema);
export default otpModel;
