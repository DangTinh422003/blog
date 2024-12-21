import { type InferSchemaType, model, Schema } from 'mongoose';
import slugify from 'slugify';

import { DOCUMENT_NAME as USER_DOCUMENT_NAME } from '@/models/user.model';

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    trim: true,
  });
  next();
});

export type Post = InferSchemaType<typeof postSchema>;
const postModel = model<Post>(DOCUMENT_NAME, postSchema);
export default postModel;
