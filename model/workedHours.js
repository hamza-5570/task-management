import { Schema, model } from "mongoose";

const WorkedHoursSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    workedHours: {
        type: Number,
        required: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
    },
    date: {
        type: Date,
        required: true,
    },
});

export default model("WorkedHours", WorkedHoursSchema);