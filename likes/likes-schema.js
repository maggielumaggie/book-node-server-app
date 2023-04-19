import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'UsersModel'},
      book: {type: mongoose.Schema.Types.ObjectId, ref: 'BooksModel'},
    },
    { collection: "likes" }
);
export default likesSchema;