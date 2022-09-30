import mongoose from "mongoose";
import User from "./UserEntity";

const userSchema = new mongoose.Schema(
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

userSchema.loadClass(User);

export default mongoose.model("User", userSchema);
