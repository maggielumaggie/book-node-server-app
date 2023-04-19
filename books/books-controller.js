import * as dao from './books-dao.js'
export const getBooks = () => books;
const BooksController = (app) => {

  const createBook   = async (req, res) => {
    const book = req.body
    const actualBook = await dao.createBook(book)
    res.send(actualBook)
  }
  const findBook= async (req, res) => {
    const booksInDatabase = await dao.findBook()
    res.send(booksInDatabase)
  }
  const updateBook = async (req, res) => {
    const bid = req.params['bid']
    const bookUpdates = req.body
    const status = await dao.updateBook(bid, bookUpdates)
    res.send(status)
  };

  const deleteBook  = async (req, res) => {
    const bid = req.params['bid']
    const status = await dao.deleteBook(bid)
    res.send(status)
  }

  app.post  ('/books', createBook)
  app.get   ('/books', findBook)
  app.put   ('/books/:bid', updateBook)
  app.delete('/books/:bid', deleteBook)
}

export default BooksController;