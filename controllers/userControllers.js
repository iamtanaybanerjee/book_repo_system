const {
  validateBodyParams,
  validateEmail,
} = require("../validations/validations");
const { addUser } = require("../services/userServices");

const createUser = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateBodyParams(body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const value = validateEmail(body.email);
    if (value === false)
      return res.status(400).json({ error: "Invalid Email" });

    const response = await addUser(body);

    if (!response.message)
      return res
        .status(400)
        .json({ error: "User with this email already exist" });

    return res
      .status(201)
      .json({ message: response.message, user: response.user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
