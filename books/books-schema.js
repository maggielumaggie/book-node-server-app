import mongoose from "mongoose";
const booksSchema = new mongoose.Schema(
    {
      name: String,
      bookId: String,
    },
    { collection: "books" }
);

export default booksSchema;