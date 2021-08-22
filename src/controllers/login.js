const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  async (req, res) => {
    // Ici nous recuperons l'email et le mot de passe
    const { nom_user, prenom_user, postnom_user, email, password } = req.body;
    // initialisation du tableau pour voir les erreurs des champs
    const errors = validationResult(req);
    // erreur pour voir si le champs est vide
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

module.exports = router;
