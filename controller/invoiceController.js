import InvoiceService from "../services/InvoiceService.js";
import Response from "../utils/response.js";
import messageUtil from "../utils/messageUtil.js";
import projectService from "../services/projectService.js";

class InvoiceController {
  createInvoice = async (req, res) => {
    const { userId } = req;
    try {
      const invoice = {
        ...req.body,
        created_by: userId,
      };

      const newInvoice = await InvoiceService.createInvoice(invoice);
      if (!newInvoice) {
        return Response.serverError(res, messageUtil.FAILED_TO_CREATE_INVOICE);
      }

      const project = await projectService.findProject({
        _id: invoice.project,
      });
      console.log(project);
      if (!project) {
        return Response.serverError(res, messageUtil.PROJECT_NOT_FOUND);
      }
      if (project.invoice !== null) {
        return Response.serverError(
          res,
          messageUtil.PROJECT_ALREADY_HAVE_INVOICE
        );
      }
      project.invoice = newInvoice._id;
      await project.save();

      return Response.success(res, messageUtil.INVOICE_CREATED, newInvoice);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getInvoices = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status } = req.query;
    const { userId } = req;
    try {
      const { invoices, totalCount } = await InvoiceService.getInvoices(
        userId,
        page,
        limit,
        status
      );
      if (!invoices) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_INVOICES);
      }

      const totalPages = Math.ceil(totalCount / limit);

      const response = {
        invoices,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit,
        },
      };
      return Response.success(res, messageUtil.OK, response);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getInvoicesByUserId = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { userId } = req;
    const { status } = req.query;
    try {
      const { invoices, totalCount } = await InvoiceService.getInvoicesByUserId(
        userId,
        page,
        limit,
        status
      );
      if (!invoices) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_INVOICES);
      }
      const totalPages = Math.ceil(totalCount / limit);
      const response = {
        invoices,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limit,
        },
      };
      return Response.success(res, messageUtil.OK, response);
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
      const {
        params: { id },
      } = req;
      const invoice = req.body;
      const updatedInvoice = await InvoiceService.updateInvoice(invoice, {
        _id: id,
      });
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
      const invoice = await InvoiceService.deleteInvoice({
        _id: req.params.id,
      });
      if (!invoice) {
        return Response.notFound(res, messageUtil.INVOICE_NOT_FOUND);
      }
      await projectService.updateProject(
        { _id: invoice.project },
        { invoice: null }
      );
      return Response.success(res, messageUtil.INVOICE_DELETED, invoice);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getPaidInvoices = async (req, res) => {
    const { userId } = req;
    try {
      const invoices = await InvoiceService.getPaidInvoices(userId);
      if (!invoices) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_INVOICES);
      }
      return Response.success(res, messageUtil.OK, invoices);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getUnPaidInvoices = async (req, res) => {
    const { userId } = req;
    try {
      const invoices = await InvoiceService.getUnPaidInvoices(userId);
      if (!invoices) {
        return Response.serverError(res, messageUtil.FAILED_TO_FETCH_INVOICES);
      }
      return Response.success(res, messageUtil.OK, invoices);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}
export default new InvoiceController();
