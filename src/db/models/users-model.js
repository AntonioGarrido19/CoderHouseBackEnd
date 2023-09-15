import mongoose from "mongoose";

const collection = "User";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    defaul: false,
  },
});

export const usersModel = mongoose.model(collection, usersSchema);
