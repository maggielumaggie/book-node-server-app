import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
      userId: String,
      bookId: String,
    },
    { collection: "likes" }
);
export default likesSchema;