import mongoose from "mongoose";
import booksSchema from "./books-schema.js";
const booksModel = mongoose.model("books", booksSchema);
export default booksModel;