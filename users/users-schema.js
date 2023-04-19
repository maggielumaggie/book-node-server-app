import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
    {
      user_id: Number,
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      firstName: String,
      lastName: String,
      email: { type: String },
      age: Number,
      role: { type: String, default: "USER", enum: ["USER", "ADMIN", "AUTHOR"] },
    },
    {
      collection: "users",
    }
);
export default usersSchema;
