import booksModel from "./books-model.js";

export const createBook = async (book) => {
  return booksModel.create(book);
};

export const deleteBook = async (bid) => {
  const status = await booksModel.deleteOne({ book_id: bid });
  return status;
};

export const updateBook = async (bid, book) => {
  const status = await booksModel.updateOne({ book_id: bid }, book);
  return status;
};


export const findBook = async () => {
  const books = await booksModel.find();
  return books;
};