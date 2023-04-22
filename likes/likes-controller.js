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

  const printSession = (req, res) => {
    console.log(req.session); // print session object to console
    res.json(req.session); // send session object as a response
  };

  app.get('/print-session', printSession);

  const userLikesBook = async (req, res) => {
    console.log(req.session)
    const uid = req.session['currentUser'].uid
    const bid = req.params.bid
    console.log(bid)


    const newLike = await dao.userLikesBook(uid, bid)
    // likes.push(newLike)
    res.json(newLike)
  }


  const userUnlikesBook= async (req, res) => {
    // const uid = req.params.uid
    // const bid = req.params.bid

    const {uid, bid} = req.params

    const status = await dao.userUnlikesBook(uid, bid)

    // likes = likes.filter((l) => l.user !== uid && l.movie !== bid)
    res.send(status)
  }
  const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes()
    res.json(likes)
  }
  const findBooksLikedByUser = async (req, res) => {
    const uid = req.params.uid
    const books = await dao.findBooksLikedByUser(uid)
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

    // const usersWhoLikeMovie = likes.filter((like) => like.movie === bid)
    // const populateUsers = populate({
    //     rawResults: usersWhoLikeMovie,
    //     fieldToPopulate: 'user',
    //     sourceData: users,
    //     sourceField: '_id'
    // })
    // res.json(populateUsers)
  }

  app.post('/users/likes/:bid', userLikesBook)
  app.delete('/users/unlikes/:bid', userUnlikesBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:uid/likes', findBooksLikedByUser)
  app.get('/books/:bid/likes', findUsersWhoLikedBook)
  // app.put(updateLike)
}

export default LikesController;