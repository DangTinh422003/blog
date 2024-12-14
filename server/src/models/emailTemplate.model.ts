import { type InferSchemaType, model, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'Email_Template';
export const COLLECTION_NAME = 'Email_Templates';

const emailTemplateSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export type EmailTemplate = InferSchemaType<typeof emailTemplateSchema>;
const emailTemplateModel = model<EmailTemplate>(DOCUMENT_NAME, emailTemplateSchema);
export default emailTemplateModel;
