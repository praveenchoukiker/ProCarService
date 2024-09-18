const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const adminProtect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = "";

    // Check if request is coming with token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);

      // Decoded Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find if user Exist

      const user = await User.findById(decoded.id).select("-password");
      // console.log(decoded);

      if (!user) {
        res.status(401);
        throw new Error("UnAuthorized Access : User Not Found");
      }

      // req.user = user;
      // console.log(user)

      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(403);
        throw new Error("UnAuthorized Access: Admin Access Only");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized Access : No Token Found");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthoized Access : Admin Access Only");
  }
});

module.exports = adminProtect;
