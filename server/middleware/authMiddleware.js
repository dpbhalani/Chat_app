const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
// const asyncHandler = require("express-async-handler");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = User.find(decoded.id).select("-password");
      next();
    } catch (err) {
      resizeBy.status(404).json({
        status: "fail",
        message: "Not Authorized,No Token",
        error: err.message,
      });
    }
};
