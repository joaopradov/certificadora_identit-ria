
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Realizar login
router.post("/login", authController.login);

module.exports = router;
