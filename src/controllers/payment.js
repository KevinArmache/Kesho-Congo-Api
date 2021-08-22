const express = require("express");
const passport = require("passport");

const router = express.Router();

// Ici nous bloquons la route de la page avec une session qui demande 
// l'authentification avec le module passport (il demande le token d'authentification)

router.get(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You have a total of: 2400$");
  }
);

module.exports = router;
