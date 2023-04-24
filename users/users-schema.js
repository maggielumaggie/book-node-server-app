import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      firstName: String,
      lastName: String,
      email: { type: String },
      age: Number,
      role: { type: String, default: "USER", enum: ["USER", "ADMIN", "AUTHOR"] },
      dateOfBirth: String,
      joinDate: String,
      avatarIcon: String,
      backgroundImage: String,
      bio: String
    },
    {
      collection: "users",
    }
);
export default usersSchema;
