import InvoiceService from "../services/InvoiceService.js";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";

class InvoiceController {
    createInvoice = async (req, res) => {
        try {
            const invoice = req.body;
            const newInvoice = await InvoiceService.createInvoice(invoice);
            if (!newInvoice) {
                return Response.serverError(res, messageUtil.FAILED_TO_CREATE_INVOICE);
            }
            return Response.success(res, messageUtil.INVOICE_CREATED, newInvoice);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    getInvoices = async (req, res) => {
        try {
            const invoices = await InvoiceService.getInvoices();
            if (!invoices) {
                return Response.serverError(res, messageUtil.FAILED_TO_FETCH_INVOICES);
            }
            return Response.success(res, messageUtil.OK, invoices);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    getInvoice = async (req, res) => {
        try {
            const invoice = await InvoiceService.getInvoice({ _id: req.params.id });
            if (!invoice) {
                return Response.notFound(res, messageUtil.INVOICE_NOT_FOUND);
            }
            return Response.success(res, messageUtil.OK, invoice);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    updateInvoice = async (req, res) => {
        try {
            const invoice = req.body;
            const updatedInvoice = await InvoiceService.updateInvoice(invoice);
            if (!updatedInvoice) {
                return Response.serverError(res, messageUtil.FAILED_TO_UPDATE_INVOICE);
            }
            return Response.success(res, messageUtil.INVOICE_UPDATED, updatedInvoice);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };

    deleteInvoice = async (req, res) => {
        try {
            const invoice = await InvoiceService.deleteInvoice({ _id: req.params.id });
            if (!invoice) {
                return Response.notFound(res, messageUtil.INVOICE_NOT_FOUND);
            }
            return Response.success(res, messageUtil.INVOICE_DELETED, invoice);
        } catch (error) {
            return Response.serverError(res, error);
        }
    };
}
export default new InvoiceController()