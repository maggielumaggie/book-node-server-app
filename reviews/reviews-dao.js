import reviewsModel from "./reviews-model.js";

export const createReview = async (review) => {
  reviewsModel.create(review);
};

export const findReviewsByBook = (bookID) =>
    reviewsModel
    .find({'book_id':{$eq:bookID}})
    .populate('author')
    .exec()

export const findReviewsByAuthor = (author) =>
    reviewsModel.find({author})