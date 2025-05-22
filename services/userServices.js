const { User: UserModel } = require("../models");

const addUser = async (body) => {
  try {
    const user = await UserModel.findOne({ where: { email: body.email } });
    if (user) return {};

    const newUserObj = await UserModel.create({
      username: body.username,
      email: body.email,
    });
    return { message: "New user added", user: newUserObj };
  } catch (error) {
    throw error;
  }
};

module.exports = { addUser };
