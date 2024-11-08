import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    client: {
      type: String,
      required: true,
    },
    task_name: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", TaskSchema);
