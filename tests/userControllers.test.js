jest.mock("../validations/validations", () => ({
  validateBodyParams: jest.fn(),
  validateEmail: jest.fn(),
}));
jest.mock("../services/userServices", () => ({
  addUser: jest.fn(),
}));
//import-------------
const {
  validateBodyParams,
  validateEmail,
} = require("../validations/validations");
const { addUser } = require("../services/userServices");
const { createUser } = require("../controllers/userControllers");

describe("user controller tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should add new user", async () => {
    const mockResponse = {
      message: "New user added",
      user: {
        id: 1,
        username: "kiran",
        email: "kiran@gmail.com",
      },
    };

    validateBodyParams.mockReturnValue([]);
    validateEmail.mockReturnValue(true);
    addUser.mockResolvedValue({
      message: "New user added",
      user: {
        id: 1,
        username: "kiran",
        email: "kiran@gmail.com",
      },
    });

    const req = {
      body: {
        username: "kiran",
        email: "kiran@gmail.com",
      },
    };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await createUser(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
