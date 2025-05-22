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

const updateABook = async (bookId, body) => {
  try {
    const bookObj = await BookModel.findOne({ where: { id: bookId } });

    if (!bookObj) return {};

    bookObj.set(body);
    await bookObj.save();

    return { message: "Book details updated successfully", book: bookObj };
  } catch (error) {
    throw error;
  }
};

const getUserReadingList = async (userId) => {
  try {
    const userObj = await UserModel.findOne({ where: { id: userId } });

    if (!userObj) return {};

    const readingListArray = await ReadingListModel.findAll({
      where: { userId },
    });

    const readingList = [];

    for (let i = 0; i < readingListArray.length; i++) {
      const bookDetails = await getBookDetails(readingListArray[i].bookId);

      readingList.push({
        ...readingListArray[i].dataValues,
        book: bookDetails,
      });
    }

    return { message: "readingList", readingList };
  } catch (error) {
    throw error;
  }
};

const getBookDetails = async (id) => {
  try {
    const bookObj = await BookModel.findOne({ where: { id } });
    return bookObj;
  } catch (error) {
    throw error;
  }
};

const deleteBookFromReadingList = async (id) => {
  try {
    // const readingListObj = await ReadingListModel.findOne({where: {id}});

    // if(!readingListObj) return {};

    const response = await ReadingListModel.destroy({ where: { id } });

    if (response === 0) return {};

    return { message: "Book removed successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBook,
  getBooks,
  addBookToReadingList,
  updateABook,
  getUserReadingList,
  deleteBookFromReadingList,
};
