// Imports
var express = require('express');
var connexionBDD = require('./connection');
var bodyParser = require("body-parser");


// Varibale pour données du formulaire
var nomFormulaire = "";

// Instancier le serveur
var serveur = express();

// utilise le module de parsing
serveur.use(bodyParser.urlencoded({ extended: true }));


// Configurer les routes
serveur.get('/inscription.html', function (req, res) {
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname +  '/inscription.html');
    // res.status(200).send('./inscription.html');
});

serveur.post('/inscription.html', function(req, res) {
    nomFormulaire = req.body.name;
    console.log("test =" + nomFormulaire);
    
    traiter(nomFormulaire);
});

// lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute...');
});

function traiter(donne){
    let addNewValue = "INSERT INTO user VALUES('00004', " + donne +" );"
    
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