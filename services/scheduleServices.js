import Schedule from "../model/schedule.js";

class ScheduleService {
    createSchedule = async (schedule) => {
        return await Schedule.create(schedule);
    };
    getSchedules = async () => {
        return await Schedule.find();
    };
    findSchedule = async (query) => {
        return await Schedule.findOne(query);
    };
    updateSchedule = async (query, data) => {
        return await Schedule.findOneAndUpdate(query, data, { new: true });
    };
    deleteSchedule = async (query) => {
        return await Schedule.findOneAndDelete(query);
    };
}

export default new ScheduleService();