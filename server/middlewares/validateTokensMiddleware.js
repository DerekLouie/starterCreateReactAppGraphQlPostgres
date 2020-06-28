const {
  validateAccessToken,
} = require("../helpers/validateTokens");
const { getAccessToken } = require("../helpers/getAccessToken");

const db = require('../../db/knex');

async function validateTokensMiddleware(req, authorization, next) {
  const accessToken = req.headers["x-access-token"];

  if (!accessToken) {
      return next();
  }

  const decodedAccessToken = validateAccessToken(accessToken);

  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  return next();
}

module.exports = {
  validateTokensMiddleware,
};
