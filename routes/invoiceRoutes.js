import express from "express"
const router = express.Router();
import invoiceController from "../controller/invoiceController.js"

router.post("/create", invoiceController.createInvoice);
router.get("/all/invoices", invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoice);
router.put("/update/:id", invoiceController.updateInvoice);
router.delete("/delete/:id", invoiceController.deleteInvoice);


export default router