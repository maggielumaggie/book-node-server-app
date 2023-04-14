import booksModel from "./books-model.js";

export const createBook = async (book) => {
  return booksModel.create(book);
};

export const deleteBook = async (id) => {
  const status = await booksModel.deleteOne({ _id: id });
  return status;
};

export const updateBook = async (id, book) => {
  const status = await booksModel.updateOne({ _id: id }, book);
  return status;
};


export const findBook = async () => {
  const books = await booksModel.find();
  return books;
};