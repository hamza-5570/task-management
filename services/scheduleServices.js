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
    getWeeklySchedule = async (userId) => {
        const today = new Date(); 
        const nextWeek = new Date(today); 
        nextWeek.setDate(today.getDate() + 7);
    
        return await Schedule.find({
            user: userId,
            schedule_date: {
                $gte: today,  
                $lt: nextWeek 
            }
        });
    }

    getMonthlySchedule = async (userId) => {
        const today = new Date(); 
        const nextMonth = new Date(today); 
        nextMonth.setMonth(today.getMonth() + 1);
    
        return await Schedule.find({
            user: userId,
            schedule_date: {
                $gte: today,  
                $lt: nextMonth 
            }
        });
    }
    
    updateSchedule = async (query, data) => {
        return await Schedule.findOneAndUpdate(query, data, { new: true });
    };
    deleteSchedule = async (query) => {
        return await Schedule.findOneAndDelete(query);
    };
}

export default new ScheduleService();