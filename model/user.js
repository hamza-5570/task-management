import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      default: null,
    },

    last_name: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },
    
    role: {
      type: String,
      default: "Employee",
      enum: ['Admin', 'Employee'],
    },

    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true}
);

export default model("User", UserSchema);
