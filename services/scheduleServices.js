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
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
        return await Schedule.find({
            user: userId,
            schedule_date: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        });
    };

    getYearlySchedule = async (userId) => {
        console.log(userId)
        const today = new Date();

        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
    
        return await Schedule.find({
            user: userId,
            schedule_date: {
                $gte: startOfYear,
                $lt: startOfNextYear
            }
        });
    };
    
    updateSchedule = async (query, data) => {
        return await Schedule.findOneAndUpdate(query, data, { new: true });
    };
    deleteSchedule = async (query) => {
        return await Schedule.findOneAndDelete(query);
    };
}

export default new ScheduleService();