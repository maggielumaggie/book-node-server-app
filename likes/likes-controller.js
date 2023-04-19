import {getBooks} from "../books/books-controller.js";
import users from "../users/users.js";
import * as dao from "./likes-dao.js";

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
    // const uid = req.params.uid
    const uid = req.session['currentUser'].user_id
    const mid = req.params.mid

    const newLike = await dao.userLikesBook(uid, mid)
    // likes.push(newLike)
    res.json(newLike)
  }
  const userUnlikesBook= async (req, res) => {
    // const uid = req.params.uid
    // const mid = req.params.mid

    const {uid, mid} = req.params

    const status = await dao.userUnlikesBook(uid, mid)

    // likes = likes.filter((l) => l.user !== uid && l.movie !== mid)
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
    const mid = req.params.mid
    const users = await dao.findUsersThatLikeBook(mid)
    res.json(users)

    // const usersWhoLikeMovie = likes.filter((like) => like.movie === mid)
    // const populateUsers = populate({
    //     rawResults: usersWhoLikeMovie,
    //     fieldToPopulate: 'user',
    //     sourceData: users,
    //     sourceField: '_id'
    // })
    // res.json(populateUsers)
  }

  app.post('/users/likes/:mid', userLikesBook)
  app.delete('/users/unlikes/:mid', userUnlikesBook)
  app.get('/likes', findAllLikes)
  app.get('/users/:uid/likes', findBooksLikedByUser)
  app.get('/books/:mid/likes', findUsersWhoLikedBook)
  // app.put(updateLike)
}

export default LikesController;