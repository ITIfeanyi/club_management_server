const express = require("express");
const router = express.Router();
const { createUsers, loginUsers } = require("../controller/userController");

router.post("/create-user", createUsers);
router.post("/login-user", loginUsers);

module.exports = router;
