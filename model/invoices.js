import { Schema, model } from "mongoose";


const InvoiceSchema = new Schema(
    {
        project: {
            type: String,
            required: true,
        },
        invoice_id: {
            type: String,
            required: true,
        },
        client_name: {
            type: String,
            required: true,
        },
        email: {
            type: Date,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        billing_date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["Unpaid", "Paid"],
            default: "Unpaid",
        },
    })
    

export default model("Invoice", InvoiceSchema);