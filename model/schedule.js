import mongoose from "mongoose"


const scheduleSchema = mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})


export default mongoose.model("Schedule", scheduleSchema)
