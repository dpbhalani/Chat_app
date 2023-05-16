const express = require("express");
const chatController = require("./../Controller/chatController");
const authController = require("./../middleware/authMiddleware");
const { route } = require("./userRoute");

const router = express.Router();

router.route("/").post(authController.protect, chatController.accessChat);
router.route("/").get(authController.protect, chatController.fetchChat);
router.route("/group").post(authController.protect, chatController.createGroupChat);
router.route("/rename").put(authController.protect, chatController.renameGroup);
router
  .route("/groupRemove")
  .put(authController.protect, chatController.removeFromGroup);
router
  .route("/groupAdd")
  .put(authController.protect, chatController.addToGroup);

module.exports = router;
