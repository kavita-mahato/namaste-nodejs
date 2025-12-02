const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, gender } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  } else if (gender < 18) {
    throw new Error("Age must be at least 18 years!");
  }
};

const validateEditProfiledata = (req) => {
  const allowedFields = ["firstName", "lastName", "photoUrl", "password", "about", "skills", "age"];

  const isEditAllowed =  Object.keys(req.body).every(field => allowedFields.includes(field));
  return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateEditProfiledata,
};