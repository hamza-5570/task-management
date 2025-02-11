import mongoose from "mongoose";
import Project from "../model/project.js";

class ProjectService {
  createProject = async (project) => {
    return await Project.create(project);
  };
  findProject = async (query) => {
    return await Project.findOne(query).populate("tasks");
  };
  getProjects = async (userId, page, limit, isArchived) => {
    const skip = (page - 1) * limit;

    let query = {};
    if (userId) {
      query.created_by = userId;
    }
    if (isArchived !== undefined) {
      query.isArchived = isArchived;
    }

    const projects = await Project.find(query)
      .populate("tasks")
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCount = await Project.countDocuments(query);

    return { projects, totalCount };
  };
  getUnBilledProjects = async (userId) => {
    try {
      const projects = await mongoose.model("Project").aggregate([
        // Match projects created by the user
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(userId),
            // invoice: null, // No invoice assigned
          },
        },
        // Lookup invoices for projects
        // {
        //   $lookup: {
        //     from: "Invoice", // Invoice collection name
        //     localField: "invoice",
        //     foreignField: "_id",
        //     as: "invoiceDetails",
        //   },
        // },
        // // Unwind invoiceDetails to work with invoice fields
        // {
        //   $unwind: {
        //     path: "$invoiceDetails",
        //     preserveNullAndEmptyArrays: true, // Preserve null values (when no invoice exists)
        //   },
        // },
        // // Filter projects where invoice is null or status is unpaid
        // {
        //   $match: {
        //     $or: [
        //       { invoice: null }, // No invoice assigned
        //       { "invoiceDetails.status": "unpaid" }, // Invoice exists but is unpaid
        //     ],
        //   },
        // },
        // Lookup tasks for each project
        {
          $lookup: {
            from: "tasks",
            localField: "tasks",
            foreignField: "_id",
            as: "tasks",
          },
        },
        // Lookup worked hours for tasks
        {
          $lookup: {
            from: "workedhours",
            localField: "tasks._id",
            foreignField: "task",
            as: "workedHours",
          },
        },
        // Calculate total worked hours
        {
          $addFields: {
            totalHours: { $sum: "$workedHours.workedHours" },
          },
        },
        // Select required fields
        {
          $project: {
            _id: 1,
            project_name: 1,
            company: 1,
            project_description: 1,
            pointof_contact: 1,
            email: 1,
            notes: 1,
            phoneNumber: 1,
            Attorney: 1,
            Confilictof_interest: 1,
            Examinee: 1,
            status: 1,
            created_by: 1,
            tasks: 1,
            invoice: 1,
            // invoiceStatus: "$invoiceDetails.status", // Include invoice status
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
            isArchived: 1,
            totalHours: 1,
          },
        },
      ]);

      return projects;
    } catch (error) {
      console.error("Error fetching unbilled projects:", error);
      throw error;
    }
  };

  updateProject = async (query, data) => {
    return await Project.findOneAndUpdate(query, data, { new: true });
  };
  deleteProject = async (query) => {
    return await Project.findOneAndDelete(query);
  };
}

export default new ProjectService();
