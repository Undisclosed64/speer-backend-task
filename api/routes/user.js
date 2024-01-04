const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/auth/signup", userController.createUser);

router.post("/auth/login", userController.logUser);

module.exports = router;
