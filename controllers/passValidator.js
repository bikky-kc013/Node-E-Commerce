const bcrypt = require("bcrypt");
const createError = require("http-errors");

const validatePassword = async (hashedPassword, enteredPassword) => {
  try {
    const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
    return isValid;
  } catch (error) {
    throw createError(500, error.message);
  }
}

module.exports = { validatePassword };
