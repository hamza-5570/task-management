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
            type: String,
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
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    })
    

export default model("Invoice", InvoiceSchema);