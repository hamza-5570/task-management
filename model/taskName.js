import { Schema, model } from "mongoose";

const TaskNameSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default model("TaskName", TaskNameSchema);
