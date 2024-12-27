import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
    bookborrow:{
      type: Array,
      default:[]
    }
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userSchema);
