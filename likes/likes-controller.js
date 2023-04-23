import {getBooks} from "../books/books-controller.js";
import * as dao from "./likes-dao.js";
import session from "express-session";

let likes = [
  {_id: '123', user_id: '111', book_id: '123'},
  {_id: '234', user_id: '111', book_id: '234'},
  {_id: '345', user_id: '222', book_id: '345'},
  {_id: '456', user_id: '333', book_id: '345'},
]

const LikesController = (app) => {
  const populate = (
      {
        rawResults, fieldToPopulate,
        sourceData, sourceField
      }) => {
    const populatedResults = rawResults.map((raw) => {
      const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
      return ({
        ...raw,
        [fieldToPopulate]: source
      })
    })
    return populatedResults
  }


  const userLikesBook = async (req, res) => {
    const uid = req.session['currentUser']._id
    const bid = req.params.bid
    const newLike = await dao.userLikesBook(uid, bid)
    // likes.push(newLike)
    res.json(newLike)
  }


  const userUnlikesBook= async (req, res) => {

    const uid = req.session['currentUser']._id
    const bid = req.params.bid

    const status = await dao.userUnlikesBook(uid, bid)

    // likes = likes.filter((l) => l.user !== uid && l.movie !== bid)
    res.send(status)
  }
  const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes()
    res.json(likes)
  }
  const findBooksLikedByUser = async (req, res) => {
    var uid = req.params.uid
    if (uid == 'unknown') {
      uid = undefined
    }
    const _id = uid || req.session['currentUser'] && req.session['currentUser']._id || undefined
    const books = await dao.findBooksLikedByUser(_id)
    res.json(books)
    // const books = likes.filter((like) => like.user === uid)
    // const populatedbooks = populate({
    //     rawResults: books,
    //     fieldToPopulate: 'movie',
    //     sourceData: getbooks(),
    //     sourceField: '_id'
    // })
    // res.json(populatedbooks)
  }
  const findUsersWhoLikedBook= async (req, res) => {
    const bid = req.params.bid
    const users = await dao.findUsersThatLikeBook(bid)
    res.json(users)

  }

  app.post('/users/likes/:bid', userLikesBook)
  app.delete('/users/unlikes/:bid', userUnlikesBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:_id/likes', findBooksLikedByUser)
  app.get('/books/:bid/likes', findUsersWhoLikedBook)
}

export default LikesController;
