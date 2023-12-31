require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = checkToken = async (req, res, next) => {
  let token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.status(408).json({
          success: false,
          message: "หมดเวลาใช้งานแล้ว",
          logout: true,
          description: "Request Timeout Or Employee Only",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not provided Token ไม่ถูกต้อง",
      logout: false,
      description: "Unauthorized",
    });
  }
};
