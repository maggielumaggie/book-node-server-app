import * as likesDao from "./likes-dao.js";
const LikesController = (app) => {
  const userLikesBooks = async (req, res) => {
    const userId = req.params.uid;
    const bookId = req.params.aid;
    const like = await likesDao.userLikesBooks(userId, bookId);
    res.json(like);
  };
  app.post("/api/users/:uid/likes/books/:aid", userLikesBooks);
};
export default LikesController;