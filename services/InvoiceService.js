import Invoice from "../model/invoices.js";


class InvoiceService {
    createInvoice = async (invoice) => {
        return await Invoice.create(invoice);
    }
    getInvoices = async () => {
        return await Invoice.find();
    }
    getInvoice = async (query) => {
        return await Invoice.findOne(query);
    }
    updateInvoice = async (query, data) => {
        return await Invoice.findOneAndUpdate(query, data, { new: true });
    }
    deleteInvoice = async (query) => {
        return await Invoice.findOneAndDelete(query);
    }
}

export default new InvoiceService()