import * as dao from "./reviews-dao.js";
const ReviewsController = (app) => {
  const createReview = async (req, res) => {
    const review = req.body;
    const currentUser = req.session['currentUser']
    review.author = currentUser._id;
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
  app.post('/api/reviews', createReview)
  app.get('/api/books/:bookID/reviews', findReviewsByBook)
  app.get('/api/users/:author/reviews', findReviewsByAuthor)
}

export default ReviewsController;