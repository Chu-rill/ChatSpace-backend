// const jwt = require("jsonwebtoken");

// const generateToken = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "15d",
//   });

//   if (!res.headersSent) {
//     res.cookie("jwt", token, {
//       maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
//       httpOnly: true,
//       sameSite: "None",
//       secure: process.env.NODE_ENV !== "development",
//     });
//   }
// };

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
