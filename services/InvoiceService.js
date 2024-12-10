import Invoice from "../model/invoices.js";


class InvoiceService {
    createInvoice = async (invoice) => {
        return await Invoice.create(invoice);
    }
    getInvoices = async (userId, page, limit) => {
        const skip = (page - 1) * limit;
        const paid_invoices = await Invoice.find({ created_by: userId, status: "Paid" }).skip(skip).limit(limit).exec();
        const unpaid_invoices = await Invoice.find({ created_by: userId, status: "Unpaid" }).skip(skip).limit(limit).exec();
        const totalPaidCount = await Invoice.countDocuments({ created_by: userId, status: "Paid" });
        const totalUnPaidCount = await Invoice.countDocuments({ created_by: userId, status: "Unpaid" });

        return { paid_invoices, unpaid_invoices, totalPaidCount, totalUnPaidCount };
    }
    getPaidInvoices = async (userId) => {
        return await Invoice.find({ status: "Paid", created_by: userId });
    }

    getUnPaidInvoices = async (userId) => {
        return await Invoice.find({ status: "Unpaid", created_by: userId });
    }
    getInvoice = async (query) => {
        return await Invoice.findOne(query);
    }
    updateInvoice = async (data, query) => {
        return await Invoice.findOneAndUpdate(query, data, { new: true });
    }
    deleteInvoice = async (query) => {
        return await Invoice.findOneAndDelete(query);
    }
}

export default new InvoiceService()