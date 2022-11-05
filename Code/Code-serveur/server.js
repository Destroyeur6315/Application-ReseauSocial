// Imports
var express = require('express');
// var connexionBDD = require('./CreerTables');
var bodyParser = require("body-parser");
var apiRouter = require('./apiRouter').router;
var creerTable = require('./ConnexionBDD/BaseDeDonnee');

// Create tables
creerTable.createTable();

// Instancier le serveur
var serveur = express();

// Utiliser le module de parsing
serveur.use(bodyParser.urlencoded({ extended: true }));

// Utiliser notre API
serveur.use('/api/', apiRouter);

// Lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute...');
});
