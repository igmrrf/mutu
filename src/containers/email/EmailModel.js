import mongoose from "mongoose";
import Email from "./EmailEntity";

const emailSchema = new mongoose.Schema(
  {
    
     updated_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
     created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

emailSchema.loadClass(Email);

export default mongoose.model("Email", emailSchema);
