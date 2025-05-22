const {
  validateBookBodyParams,
  validateUserAndBookIDs,
} = require("../validations/validations");
const {
  createBook,
  getBooks,
  addBookToReadingList,
  updateABook,
} = require("../services/bookServices");

const addBook = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateBookBodyParams(body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const response = await createBook(body);

    return res
      .status(201)
      .json({ message: "Book added successfully", book: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchBooks = async (req, res) => {
  const title = req.query.title;
  const author = req.query.author;
  try {
    // const errors = validateTileAndAuthor(title, author);
    const response = await getBooks(title, author);

    if (response.length === 0)
      return res.status(404).json({ message: "No books found" });

    return res.status(200).json({ books: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addToReadingList = async (req, res) => {
  const body = req.body;
  try {
    const error = validateUserAndBookIDs(body);
    if (error) return res.status(400).json({ error });

    const response = await addBookToReadingList(body);

    if (!response.message)
      return res.status(400).json({ error: "Invalid user or book id" });

    return res
      .status(201)
      .json({ message: response.message, readingList: response.readingList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const body = req.body;
  try {
    const response = await updateABook(bookId, body);

    if (!response.message)
      return res.status(404).json({ error: "Book not found" });

    return res
      .status(200)
      .json({ message: response.message, book: response.book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { addBook, searchBooks, addToReadingList, updateBook };
