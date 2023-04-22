import likesModel from "./likes-model.js";

export const userLikesBook = async (uid, bid) => {
  const status = await likesModel.create({user: uid, book: bid})
  return status;
}
export const userUnlikesBook = async(uid, bid) => {
  const status = await likesModel.deleteOne({user: uid, book: bid})
  return status;
}
export const findBooksLikedByUser = async(uid) => {
  return await likesModel
  .find({user_id: uid}, {user: false})
  .populate('Book', 'title')
  .exec()
}
export const findUsersThatLikeBook = async(bid) => {
  return await likesModel.find({book: bid}, {book: false})
  .populate('user', 'username')
  .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()