import Invoice from "../model/invoices.js";


class InvoiceService {
    createInvoice = async (invoice) => {
        return await Invoice.create(invoice);
    }
    getInvoices = async ({ userId }) => {
        return await Invoice.find({created_by: userId});
    }
    getPaidInvoices = async (userId) => {
        return await Invoice.find({status: "Paid", created_by: userId});
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