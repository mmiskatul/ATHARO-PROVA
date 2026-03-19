import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    titleBn: { type: String, required: true },
    message: { type: String, required: true },
    messageBn: { type: String, required: true },
    type: {
      type: String,
      enum: ["system", "donation", "campaign", "content"],
      default: "system",
    },
    href: { type: String, trim: true },
    readAt: { type: Date },
  },
  { timestamps: true },
);

export type NotificationDocument = InferSchemaType<typeof notificationSchema> & {
  _id: Types.ObjectId;
};

export const Notification =
  models.Notification || model("Notification", notificationSchema);
