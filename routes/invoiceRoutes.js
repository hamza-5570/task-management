import express from "express"
const router = express.Router();
import invoiceController from "../controller/invoiceController.js"
import isAuthenticated from "../middleware/auth.js";

router.post("/create", isAuthenticated.isAuthenticated, invoiceController.createInvoice);
router.get("/all/invoices", isAuthenticated.isAuthenticated, invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoice);
router.put("/update/:id", invoiceController.updateInvoice);
router.delete("/delete/:id", invoiceController.deleteInvoice);


export default router