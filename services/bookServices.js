const {
  Book: BookModel,
  User: UserModel,
  ReadingList: ReadingListModel,
} = require("../models");

const createBook = async (body) => {
  try {
    const bookObj = await BookModel.create({
      title: body.title,
      author: body.author,
      genre: body.genre,
      publicationYear: body.publicationYear,
    });

    return bookObj;
  } catch (error) {
    throw error;
  }
};

const getBooks = async (title, author) => {
  try {
    const books = await BookModel.findAll({
      where: {
        title: title,
        author: author,
      },
    });

    return books;
  } catch (error) {
    throw error;
  }
};

const addBookToReadingList = async (body) => {
  try {
    const userobj = await UserModel.findOne({ where: { id: body.userId } });

    const bookObj = await BookModel.findOne({ where: { id: body.bookId } });

    if (!userobj || !bookObj) return {};

    const readingListItem = await ReadingListModel.create({
      userId: body.userId,
      bookId: body.bookId,
      status: body.status,
    });

    return {
      message: "Book added to reading list",
      readingList: readingListItem,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { createBook, getBooks, addBookToReadingList };
