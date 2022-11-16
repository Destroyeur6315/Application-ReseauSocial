// Imports
var express = require('express');
var connexionBDD = require('./connection');
var bodyParser = require("body-parser");
var session = require('express-session');


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
    nomFormulaire = req.body.nomform;
    nom=req.body.name;
    passwd=req.body.pass;
    email=req.body.email;
    numtel=req.body.numtel;

    console.log("test =" + nomFormulaire);
    
    traiter(nomFormulaire);
});

serveur.post('/publiformulaire.html', function(req, res) {
    nomFormulaire = req.body.nomform;
    nomuser = req.body.name;
    contenu = req.body.contenu;

    console.log("test =" + nomFormulaire);
    
    traiter(nomFormulaire);
  });

serveur.get('/',function(req,res){
    
})
  

// lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute...');
});

function traiter(donne){
    switch(donne){
        case "inscription":

            var requete_sql = '\
            INSERT INTO publication (nomcreateur,contenu,dateecriture)'+
            // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
            // et "?" lorsqu'il s'agit d'un nombre
            'VALUES(??, ??, NOW())';
            // l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
            // qui doivent remplacer les points d'interrogation
            var inserts = [
                nom,
                passwd,
                email,
                numtel,
            ];
            
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
            break;
        case "publication":
            var requete_sql = '\
            INSERT INTO publication (nomcreateur,contenu,dateecriture)'+
            // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
            // et "?" lorsqu'il s'agit d'un nombre
            'VALUES(??, ??, NOW())';
            // l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
            // qui doivent remplacer les points d'interrogation
            var inserts = [
                nomcreateur,
                contenu,
            ];
            
            const mysql = require('mysql');
                    
            con.connect(function(err) {   
                if (err) throw err;   
                    console.log("Connecté à la base de données MySQL!");   
                });

            requete_sql = sql.preparer(mysql, requete_sql, inserts);
            con.query(
                requete_sql,
                function(err,result){
                    if(err) throw err;
                    console.log(result);}
            );
            break;

    }
}

// function publication(donne){
//     var requete_sql = '\
//   INSERT INTO publication (nomcreateur,contenu,dateecriture)'+
//   // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
//   // et "?" lorsqu'il s'agit d'un nombre
//   'VALUES(??, ??, NOW())';
//     // l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
//     // qui doivent remplacer les points d'interrogation
//     var inserts = [
//     nomcreateur,
//     contenu,
//     ];

//     const mysql = require('mysql');

//     const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" })

//     con.connect(function(err) {   
//         if (err) throw err;   
//         console.log("Connecté à la base de données MySQL!");   
//     });
// }