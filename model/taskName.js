import { Schema, model } from "mongoose";

const TaskNameSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            default: "Specific",
            enum: ["General", "Specific"]
        }
    },
    {
        timestamps: true,
    }
);

export default model("TaskName", TaskNameSchema);
