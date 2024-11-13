import Schedule from "../model/schedule.js";

class ScheduleService {
  createSchedule = async (schedule) => {
    return await Schedule.create(schedule);
  };
  getSchedules = async (userId) => {
    return await Schedule.find({ user: userId }).populate("task");
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
      to: { $gte: today.toISOString(), $lt: nextWeek.toISOString() },
    }).populate("task");
  };


  getMonthlySchedule = async (userId, month = null) => {
    let startDate, endDate;

    if (month) {
        const today = new Date();
        const year = today.getFullYear();

        startDate = new Date(year, month - 1, 1);
        startDate.setUTCHours(0, 0, 0, 0);

        endDate = new Date(year, month, 0);
        endDate.setUTCHours(23, 59, 59, 999);
    } else {
        const today = new Date();
        startDate = today;
        
        endDate = new Date(today);
        endDate.setDate(today.getDate() + 30);
    }

    console.log('Start Date:', startDate.toISOString(), 'End Date:', endDate.toISOString());

    return await Schedule.find({
      user: userId,
      from: { $gte: startDate.toISOString(), $lt: endDate.toISOString() },
      to: { $gte: startDate.toISOString(), $lt: endDate.toISOString() },
    }).populate("task");
};


  getSchedulesByDate = async (userId, date) => {
    const today = new Date().toISOString();

    return await Schedule.find({
      user: userId,
      from: { $gte: today },
      to: { $lt: date },
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
