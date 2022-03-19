const { Schema, model } = require("mongoose");
import AccessLog from "./AccessLogEntity";

const accesslogSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accesslogSchema.loadClass(AccessLog);

export default model("Accesslog", accesslogSchema);
