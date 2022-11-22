// Imports
var express = require('express');
// var connexionBDD = require('./connection');
const path=require('path');
var bodyParser = require("body-parser");
var sessions = require('express-session');
var crypto = require('crypto');
const onehour=1000*60*60

var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};

// Varibale pour données du formulaire
// Instancier le serveur
var serveur = express();

// utilise le module de parsing
// serveur.use(bodyParser.urlencoded({ extended: true }));
// serveur.use(sessions({
//     secret:generate_key(),
//     cookie: {maxAge :onehour},
// }))

serveur.get('/',(req,res)=>{
    // sessions=req.session;
    // if (sessions.userid){
    //     res.send("Tu es bien connecté")
    // }
    // else
     res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/inscription.html'))
})

serveur.get('inscription.html',function(req,res){
    res.sendFile(__dirname + '/publiFormulaire.html');
})

serveur.post('/', function(req, res) {
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

// lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute...');
});

function traiter(donne){
    switch(donne){
        case "inscription":

            var requete_sql = '\
            INSERT INTO user (nom,mot_de_passe,email,numTelephone)'+
            // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
            // et "?" lorsqu'il s'agit d'un nombre
            'VALUES(??,??,??,??)';
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
        case "connection":
            
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