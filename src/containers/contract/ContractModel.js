import mongoose from "mongoose";
import Contract from "./ContractEntity";

const contractSchema = new mongoose.Schema(
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

contractSchema.loadClass(Contract);

export default mongoose.model("Contract", contractSchema);
