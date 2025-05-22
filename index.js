const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
require("pg");
const { createUser } = require("./controllers/userControllers");
const {
  addBook,
  searchBooks,
  addToReadingList,
  updateBook,
  getReadingList,
  removeBookFromReadingList,
} = require("./controllers/bookControllers");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/users", createUser);
app.post("/api/books", addBook);
app.get("/api/books/search", searchBooks);
app.post("/api/reading-list", addToReadingList);
app.post("/api/books/:bookId", updateBook);
app.get("/api/reading-list/:userId", getReadingList);
app.post("/api/reading-list/:readingListId", removeBookFromReadingList);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("unable to connect to database", error));

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
