import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
      book_id: String,
    },
    { collection: "likes" }
);
export default likesSchema;