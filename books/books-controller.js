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
  export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { book } = req.body;
    try {
      const status = await dao.updateBook({ _id: id }, book);
      res.status(200).json(status);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to update book" });
    }
  };

  const deleteBook   = async (req, res) => {
    const mid = req.params['mid']
    const status = await dao.deleteBook(mid)
    res.send(status)
  }

  app.post  ('/books', createBook)
  app.get   ('/books', findBook)
  app.put   ('/books/:mid', updateBook)
  app.delete('/books/:mid', deleteBook)
}

export default BooksController;