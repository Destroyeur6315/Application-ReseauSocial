// Imports
var express = require('express');
var bodyParser = require("body-parser");
var apiRouter = require('./apiRouter').router;
var connexionAbdd = require('./ConnexionBDD/BaseDeDonnee');

// Create tables
connexionAbdd.createTable();

// Instancier notre application express
var app = express();

// Utiliser le module de parsing
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/style', express.static('D:\Cours\BUT-2eme-Année\SAE\Application-ReseauSocial\Code\Code-FrontEnd\style'));

// Utiliser notre API
app.use('/api/', apiRouter);

// Lancer notre serveur
app.listen(8080, function() {
    console.log('Serveur en écoute...');
});

// Exporter notre application
module.exports = app;
