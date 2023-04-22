import mongoose from "mongoose";
const booksSchema = new mongoose.Schema(
    {
      name: String,
      cover: String,
      url: String,
      authors: Array,
      rating: Number,
      created_editions: Number,
      year: Number
    },
    { collection: "books" }
);

export default booksSchema;