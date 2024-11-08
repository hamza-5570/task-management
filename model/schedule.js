import mongoose from "mongoose"


const scheduleSchema = mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    schedule_date: {
        type: Date,
        required: true
    }
})


export default mongoose.model("Schedule", scheduleSchema)