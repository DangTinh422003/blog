import { type InferSchemaType, model, Schema } from 'mongoose';

import { DOCUMENT_NAME as USER_DOCUMENT_NAME } from '@/models/user.model';

export const DOCUMENT_NAME = 'TokenStorage';
export const COLLECTION_NAME = 'TokenStorages';

const tokenStorage = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
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

export type TokenStorage = InferSchemaType<typeof tokenStorage>;
const tokenStorageModel = model<TokenStorage>(DOCUMENT_NAME, tokenStorage);
export default tokenStorageModel;
