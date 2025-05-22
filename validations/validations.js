const validateBodyParams = (body) => {
  const errors = [];
  if (
    !body.username ||
    body.username === "" ||
    !(typeof body.username === "string")
  )
    errors.push("Username is required and must be a string");

  if (!body.email || body.email === "" || !(typeof body.email === "string"))
    errors.push("Email is required and must be a string");

  return errors;
};

const validateEmail = (email) => {
  return (
    typeof email === "string" && email.includes("@") && email.includes(".")
  );
};

const validateBookBodyParams = (body) => {
  const errors = [];
  if (!body.title || body.title === "" || !(typeof body.title === "string"))
    errors.push("Title is required and must be a string");
  if (!body.author || body.author === "" || !(typeof body.author === "string"))
    errors.push("Author is required and must be a string");
  return errors;
};

// const validateTileAndAuthor = (title, author) => {
//   const  errors = [];
//   if(!title || title === '') errors.push('Title is required and cannot be empty');
// }

const validateUserAndBookIDs = (body) => {
  let error;
  if (!body.userId || !body.bookId || !body.status)
    error = "User id, Body id, and status are required";
  return error;
};

module.exports = {
  validateBodyParams,
  validateEmail,
  validateBookBodyParams,
  validateUserAndBookIDs,
};
