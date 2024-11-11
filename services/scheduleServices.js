import Schedule from "../model/schedule.js";

class ScheduleService {
    createSchedule = async (schedule) => {
        return await Schedule.create(schedule);
    };
    getSchedules = async (userId) => {
        return await Schedule.find({user: userId}).populate("task");
    };
    findSchedule = async (query) => {
        return await Schedule.findOne(query);
    };

    getOneDaySchedule = async (userId) => {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
        return await Schedule.find({
          user: userId,
          schedule_date: { $gte: startOfDay, $lt: endOfDay },
        });
      };
      
      getWeeklySchedule = async (userId) => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        
        return await Schedule.find({
            user: userId,
            from: { $gte: today.toISOString(), $lt: nextWeek.toISOString() }, 
            to: { $gte: today.toISOString(), $lt: nextWeek.toISOString() }
        }).populate("task"); 
    };
    
    
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