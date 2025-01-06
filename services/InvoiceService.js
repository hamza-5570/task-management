import Invoice from "../model/invoices.js";

class InvoiceService {
  createInvoice = async (invoice) => {
    return await Invoice.create(invoice);
  };
  getInvoices = async (userId, page, limit, status) => {
    const skip = (page - 1) * limit;
    const invoices = await Invoice.find({ created_by: userId, status })
      .populate({ path: "project", select: "_id project_name" })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await Invoice.countDocuments({
      created_by: userId,
      status,
    });

    return { invoices, totalCount };
  };

  getInvoicesByUserId = async (userId, page, limit) => {
    console.log(userId, page, limit);

    const skip = (page - 1) * limit;
    const invoices = await Invoice.find({ created_by: userId })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalCount = await Invoice.countDocuments({ created_by: userId });
    return { invoices, totalCount };
  };
  getPaidInvoices = async (userId) => {
    return await Invoice.find({ status: "Paid", created_by: userId });
  };

  getUnPaidInvoices = async (userId) => {
    return await Invoice.find({ status: "Unpaid", created_by: userId });
  };
  getInvoice = async (query) => {
    return await Invoice.findOne(query);
  };
  updateInvoice = async (data, query) => {
    return await Invoice.findOneAndUpdate(query, data, { new: true });
  };
  deleteInvoice = async (query) => {
    return await Invoice.findOneAndDelete(query);
  };
}

export default new InvoiceService();
