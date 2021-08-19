const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const paymentApi = require("./payment");

const router = express.Router();

// Recuperation de la route register qui est dans le fichier register.js
router.use(registerApi);
// Recuperation de la route register qui est dans le fichier login.js
router.use(loginApi);
// Recuperation de la route register qui est dans le fichier payment.js
router.use(paymentApi);

module.exports = router;
