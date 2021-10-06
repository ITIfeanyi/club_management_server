const express = require("express");
const router = express.Router();
const {
  createUsers,
  loginUsers,
  getAllUsers,
} = require("../controller/userController");

router.post("/create-user", createUsers);
router.post("/login-user", loginUsers);
router.get("/users", getAllUsers);

module.exports = router;
