import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    pointof_contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    Attorney: {
      type: String,
      required: true,
    },
    Confilictof_interest: {
      type: String,
      required: true,
    },
    Examinee: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "On going", "At Risk", "Delayed"],
      default: "On going",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
