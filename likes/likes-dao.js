import likesModel from "./likes-model.js";

export const userLikesBook = async (uid, bid) => {
  const status = await likesModel.create({user_id: uid, book_id: bid})
  return status;
}
export const userUnlikesBook = async(uid, bid) => {
  const status = await likesModel.deleteOne({user_id: uid, book_id: bid})
  return status;
}
export const findBooksLikedByUser = async(uid) => {
  return await likesModel
  .find({user_id: uid}, {user_id: false})
  .populate('Book', 'title')
  .exec()
}
export const findUsersThatLikeBook = async(bid) => {
  return await likesModel.find({book_id: bid}, {book_id: false})
  .populate('user', 'username')
  .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()