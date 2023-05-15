const express = require("express");
const userController = require("./../Controller/userController");
const authController = require("./../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(userController.registerUser)
  .get(authController.protect, userController.allUsers);
router.route("/login").post(userController.authUser);
module.exports = router;
