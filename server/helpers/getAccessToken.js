const { sign } = require("jsonwebtoken");

const getAccessToken = (user) => {
  const fifteenMins = 60 * 15 * 1000;

  const accessUser = {
    id: user.id,
    name: user.name,
  };

  const accessToken = sign(
    { user: accessUser },
    process.env.SECRET,
    {
      expiresIn: fifteenMins
    }
  );

  return { accessToken };
}

module.exports = {
  getAccessToken,
};
