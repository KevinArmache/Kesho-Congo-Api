const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");


require("dotenv").config();
require("./auth/passport");

require("./models/user");

const middlewares = require("./middlewares");

// Importation des 3 routes Register Login et Payement
const api = require("./routes/index");

const app = express();
app.use(express.json());



app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Route principale pour l'execution des routes Register Payement et Login qui se trouve dans le fichier api
app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
