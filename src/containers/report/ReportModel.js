import mongoose from "mongoose";
import Report from "./ReportEntity";

const reportSchema = new mongoose.Schema(
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

reportSchema.loadClass(Report);

export default mongoose.model("Report", reportSchema);
