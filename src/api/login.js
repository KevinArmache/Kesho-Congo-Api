const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {

  // Ici nous recuperons l'email et le mot de passe
  const { email, password } = req.body;

  // Nous verifions si il existe deja un utilisateur avec cet email
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  // Si il est mal ecrit ou il n'existe pas
  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  // Si le password ne correspond pas
  // compare function bcrypt
  const isPasswordValid = await compare(password, userWithEmail.password);
  if (!isPasswordValid)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  
  // Nous generons un Token qui gardera les identifiants id et email de notre utilisateur
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;
