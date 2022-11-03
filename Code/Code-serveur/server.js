// Imports
var express = require('express');
var connexionBDD = require('./CreerTables');
var gererForumulaire = require('./GérerFormulaire');
var bodyParser = require("body-parser");
const mysql = require('mysql');


// Variable 
let idUser = 0;

// Instancier le serveur
var serveur = express();

// Utiliser le module de parsing
serveur.use(bodyParser.urlencoded({ extended: true }));

// Configurer les routes
serveur.get('/inscription.html', function (req, res) {
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname +  '/inscription.html');
    // res.status(200).send('./inscription.html');
});

serveur.post('/inscription.html', function(req, res) {
    nomFormulaire = req.body.name;
    motDePasseFormulaire = req.body.pass;
    emailFormulaire = req.body.email;
    numTelFormulaire = req.body.numTel;
    console.log("test =" + nomFormulaire);

    traiter();
});

// Lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute...');
});

// Add user in the BDD
function traiter(){
    let addNewValue = "INSERT INTO user VALUES('" + idUser + "', '" + nomFormulaire + "' , '" + motDePasseFormulaire + "', '" + emailFormulaire + "', '"  + numTelFormulaire + "');"

    idUser = idUser + 1;

    const mysql = require('mysql');

    // Créer la variable pour se connecter à notre base
    const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });  

    // Try to connect
    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");   
    });

    con.query(
    addNewValue,
    function (err, result) {
        if(err) throw err;
        console.log(result);
    });

    
}