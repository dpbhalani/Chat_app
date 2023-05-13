const express = require("express");
const userController = require("./../Controller/userController");

const router = express.Router();

router.route("/").post(userController.registerUser);
router.route("/login").post(userController.authUser);
module.exports = router;