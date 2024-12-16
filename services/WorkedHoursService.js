import WorkedHours from "../model/workedHours.js";

class WorkedHoursCrud {
    createWorkedHours = async (data) => {
        return await WorkedHours.create(data);
    }
    getWorkedHoursForTask = async (query) => {
        return await WorkedHours.find(query);
    }
    updateWorkedHours = async (query, data) => {
        console.log(query, data)
        return await WorkedHours.findOneAndUpdate(query, data, { new: true });
    }
    deleteWorkedHours = async (query) => {
        return await WorkedHours.findOneAndDelete(query);
    }
}
export default new WorkedHoursCrud();
