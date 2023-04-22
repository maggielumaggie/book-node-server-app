import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
      book: {type: mongoose.Schema.Types.ObjectId, ref: 'books'},
    },
    { collection: "likes" }
);
export default likesSchema;