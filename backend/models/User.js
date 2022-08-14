import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "Employee",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  }
);

export default mongoose.model("User", userSchema);
