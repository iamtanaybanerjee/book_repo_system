jest.mock("../validations/validations", () => ({
  validateUserAndBookIDs: jest.fn(),
}));

jest.mock("../services/bookServices", () => ({
  addBookToReadingList: jest.fn(),
}));
//imports -------------
const { validateUserAndBookIDs } = require("../validations/validations");
const { addBookToReadingList } = require("../services/bookServices");
const { addToReadingList } = require("../controllers/bookControllers");

describe("book controllers tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should add book to reading list", async () => {
    validateUserAndBookIDs.mockReturnValue(undefined);
    addBookToReadingList.mockResolvedValue({
      message: "Book added to reading list",
      readingList: {
        id: 1,
        userId: 1,
        bookId: 1,
        status: "Want to Read",
      },
    });

    const req = {
      body: {
        userId: 1,
        bookId: 1,
        status: "Want to Read",
      },
    };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await addToReadingList(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Book added to reading list",
      readingList: {
        id: 1,
        userId: 1,
        bookId: 1,
        status: "Want to Read",
      },
    });

    expect(res.status).toHaveBeenCalledWith(201);
  });
});
