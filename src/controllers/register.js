const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

// Importation de la configuration pour les routes
const router = express.Router();

// Creation de la route register pour s'inscrire
router.post(
  "/register",

  // configuration des validations des donnees des champs
  [
    check("email").isEmail(),
    check("nom_user").notEmpty().withMessage("Cannot be empty"),
    check("prenom_user").notEmpty().withMessage("Cannot be empty"),
    check("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  async (req, res) => {
    const { nom_user, prenom_user, postnom_user, email, password } = req.body;
    // initialisation du tableau pour voir les erreurs des champs
    const errors = validationResult(req);
    // erreur pour voir si le champs est vide
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ici nous cherchons dans la base de donnee si l'email existe deja
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
    // Si il existe on renvoie un message d'erreur
    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: "User with email already exists!" });
    }
    // Sinon on cree un nouvel utilisateur
    //create new user with bcrypt password

    const newUser = new User({
      nom_user,
      prenom_user,
      postnom_user,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    // Nous l'inserons dans la base de données directement
    const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    });

    if (savedUser) res.json({ message: "Thanks for registering" });
  }
);

module.exports = router;
