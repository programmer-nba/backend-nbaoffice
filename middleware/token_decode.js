const jwt = require("jsonwebtoken");

const token_decode = (token) => {
  const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  return decoded;
};

module.exports = token_decode;
