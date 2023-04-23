import * as dao from "./reviews-dao.js";
const ReviewsController = (app) => {
  const createReview = async (req, res) => {
    const review = req.body;
    const currentUser = req.session['currentUser']
    review.author = currentUser.user_id;
    const actualReview = await dao.createReview(review)
    res.json(actualReview);
  }

  const findReviewsByBook = async (req, res) => {
    const bookID = req.params.bookID
    const reviews = await dao.findReviewsByBook(bookID)
    res.json(reviews)
  }
  const findReviewsByAuthor = async (req, res) => {
    const author = req.params.author
    const reviews = await dao.findReviewsByAuthor(author)
    res.json(reviews)
  }
  app.post('/reviews', createReview)
  app.get('/books/:bookID/reviews', findReviewsByBook)
  app.get('/users/:author/reviews', findReviewsByAuthor)
}

export default ReviewsController;