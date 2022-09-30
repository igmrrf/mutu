import mongoose from "mongoose";
import Project from "./ProjectEntity";

const projectSchema = new mongoose.Schema(
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

projectSchema.loadClass(Project);

export default mongoose.model("Project", projectSchema);
