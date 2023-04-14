import likesModel from "./likes-model.js";

export const userLikesBooks = async (userId, bookId) => {
  return likesModel.create({ userId, bookId });
};