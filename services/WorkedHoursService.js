import WorkedHours from "../model/workedHours.js";

class WorkedHoursServices {
    createWorkedHours = async (data) => {
        return await WorkedHours.create(data);
    }
    getWorkedHoursForTask = async (query) => {
        const workedHours = await WorkedHours.find(query);
        const totalHours = workedHours.reduce((a, b) => a + b.workedHours, 0);
        return { workedHours, totalHours };
    }
    updateWorkedHours = async (query, data) => {
        console.log(query, data)
        return await WorkedHours.findOneAndUpdate(query, data, { new: true });
    }
    deleteWorkedHours = async (query) => {
        return await WorkedHours.findOneAndDelete(query);
    }
}
export default new WorkedHoursServices();
