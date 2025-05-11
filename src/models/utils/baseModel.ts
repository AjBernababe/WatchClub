import { Document, Types } from "mongoose";

// Base interface that adds _id type and timestamps
export interface BaseDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
