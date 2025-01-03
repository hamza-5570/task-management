import { Schema, model } from "mongoose";

const WorkedHoursSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    workedHours: {
        type: Number,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
    },
    date: {
        type: Date,
    },
});

export default model("WorkedHours", WorkedHoursSchema);