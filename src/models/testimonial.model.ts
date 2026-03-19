import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    nameBn: { type: String },
    role: { type: String, required: true },
    roleBn: { type: String, required: true },
    quote: { type: String, required: true },
    quoteBn: { type: String, required: true },
    avatar: { type: String, trim: true },
    location: { type: String, trim: true },
    locationBn: { type: String, trim: true },
    featured: { type: Boolean, default: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type TestimonialDocument = InferSchemaType<typeof testimonialSchema> & {
  _id: Types.ObjectId;
};

export const Testimonial =
  models.Testimonial || model("Testimonial", testimonialSchema);
