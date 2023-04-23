import likesModel from "./likes-model.js";

  export const userLikesBook = async (uid, bid) => {
  const status = await likesModel.create({user: uid, book_id: bid})
  return status;
}
export const userUnlikesBook = async(uid, bid) => {
  const status = await likesModel.deleteOne({user: uid, book_id: bid})
  return status;
}
export const findBooksLikedByUser = async(uid) => {
  const x = await likesModel
  .find({user: uid}, {user: false})
  .exec()
  console.log(x)
  return x;

}
export const findUsersThatLikeBook = async(bid) => {
  return await likesModel.find({book_id: bid}, {book: false})
  .populate('user', 'username')
  .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()