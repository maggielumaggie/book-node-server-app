import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema(
    {
      review: String,
      book_id: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    },
    { collection: "reviews" }
);
export default reviewsSchema;