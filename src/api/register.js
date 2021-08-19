const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Importation de la configuration pour les routes
const router = express.Router();

// Creation de la route register pour s'inscrire
router.post("/register", async (req, res) => {
  const { pseudo, email, password } = req.body;

// Ici nous cherchons dans la base de donnee si l'email existe deja
  const alreadyExistsUser = await User.findOne({ where: { email  } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
// Si il existe on renvoie un message d'erreur
  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }
  // Sinon on cree un nouvel utilisateur
  //create new user with bcrypt password


  const newUser = new User({ pseudo, email, password : bcrypt.hashSync(password, 10) });
  // Nous l'inserons dans la base de données directement
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;
