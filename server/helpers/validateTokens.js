const { verify } = require("jsonwebtoken");

const validateAccessToken = (token) => {
  try {
    return verify(token, process.env.SECRET);
  } catch {
    return null;
  }
}

module.exports = {
  validateAccessToken,
};
