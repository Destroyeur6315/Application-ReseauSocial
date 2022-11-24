// Imports
var express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
var sessions = require('express-session');
const mysql = require('mysql');
var crypto = require('crypto');
const { Server } = require('http');

// var connexionBDD = require('./connection');

// Definition de variable
const onehour=1000*60*60;
var session;

// Instancier le serveur
var serveur = express();

var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};

// Création des tables
createtable();

// Middleware
// Utilise le module de parsing
serveur.use(bodyParser.urlencoded({ extended: true }));

// Accéder aux Css et aux images
serveur.use(express.static(path.join(__dirname, '..', 'Code-FrontEnd')));


// Definition des routes
serveur.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/inscription.html'))
});

serveur.get('/deconnection',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

serveur.get('/connexion.html',function(req,res){
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/connexion.html'))
});

serveur.get('/publiformulaire.html',function(req,res){
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/publiformulaire.html'))
});

serveur.post('/inscription.html', function(req, res) {
    pseudo=req.body.pseudo;
    passwd=req.body.pass;
    email=req.body.email;
    numtel=req.body.numTel;  

    // gérer les erreurs 
    if(pseudo == "" || passwd == ""){
         return res.status(400).send("<h1> Erreur : veuillez renseigner un mot de passe et un nom d'utilisater ! <h1>");
    }

    let idUser=1;

    let requeteAddUser = "INSERT INTO user VALUES('" + idUser + "', '" + pseudo + "' , '" + passwd + "', '" + email + "', '"  + numtel + "');";

    insertUser(requeteAddUser);
});

/** 
serveur.get('/connexion.html',(req,res)=>{
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/connexion.html'))
});
*/

serveur.post('/connexion.html',function(req,res){
    nom=req.body.name;
    motdepasse=req.body.pass;

    connexion(nom,motdepasse);
});

serveur.post('/publiformulaire.html', function(req, res) {
    nomuser = req.body.name;
    contenu = req.body.contenu;
    
    publication(nomuser,contenu);
});  

// lancer notre serveur
serveur.listen(8080, function() {
    console.log('Serveur en écoute à l\'adresse suivant : http://localhost:8080/ ...');
});


function connexion(pseudo, motDePasse){
    const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

    let data;

    // Try to connect
    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");  
    });

    let requete = "SELECT * FROM user WHERE nom = '" + pseudo + "';";
    console.log(requete);

    var userValide = false;

    function recupResultat(err,  rows, fields) {
        if (err) throw err;
        var result = [];
        for (var i = 0; i < rows.length; i++) {
                result = rows; //je stock le résultat dans une variable pour l'envoyer à la vue
                //globalResult.push(i);
        }

        var test = JSON.stringify(result);
        var json = JSON.parse(test);

        var mdp = "mot de passe";
        
        console.log(json.length);
        // Gerer les erreurs (quand SELECT ne retourne rien)

        if(json.length > 0){
            console.log("nom = ", json[0].nom);
            console.log("mot de passe = ", json[0].motDePasse);

            email = json[0].email;

            console.log(result);

           //var n = comparePassword(motDePasse, json[0].motDePasse);

           bcrypt.compare(motDePasse, json[0].motDePasse, (err, data) => {
                //if error than throw error
                if (err) throw err
                //if both match than you can do anything
                if (data) {
                    //return res.status(200).json({ msg: "Login success" })
                    console.log("mot de passe VALIDE");
                    valide("valide");
                } else {
                    //return res.status(401).json({ msg: "Invalid credencial" })
                    console.log("mot de passe INVALIDE");
                    return "invalide";
                }
            })
        }

        return result;
    }   

    con.query(requete,  recupResultat);

    serveur.use(sessions({
        secret: generate_key,
        saveUninitialized:true,
        cookie: { maxAge: onehour },
        resave: false 
    }));
    session.userid=
    
    console.log("OUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

    con.end(function (err) { 
        if (err) throw err;
        else  console.log('Fin de la connexion en BDD'); 
    });
}

function publication(donne){
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

    const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" })

    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");   
    });

    requete_sql = sql.preparer(mysql, requete_sql, inserts);
    con.query(
        requete_sql,
        function (err, result) {
            if(err) throw err;
            console.log(result);
        });
}

function createtable(){
        const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

        // Try to connect
        con.connect(function(err) {   
            if (err) throw err;     
        });

        // Requête sql
        let supprimertable = "DROP TABLE IF EXISTS user;"
        let createtable = "CREATE TABLE user(\
                                    id char(5) PRIMARY KEY,\
                                    nom varchar(100) NOT NULL,\
                                    motDePasse varchar(100) NOT NULL,\
                                    email varchar(150),\
                                    numTelephone varchar(20)\
                                    );"

        // Lancer les requêtes
        con.query(
            supprimertable,
            function (err, result) {
                if(err) throw err;
                console.log(result);
        });

        con.query(
            createtable,
            function (err, result) {
                if (err) throw err;       
                console.log(result);    
        });

        con.end(function (err) { 
            if (err) throw err;
            else  console.log('Création de la table USER avec succés.'); 
        });
}

function insertUser(requete){
        const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

        // Try to connect
        con.connect(function(err) {   
            if (err) throw err;   
            console.log("Connecté à la base de données MySQL!");   
        });
        
        con.query(
            requete,
            function (err, result) {
                if (err) throw err;       
                console.log(result);    
        });
        
        con.end(function (err) { 
            if (err) throw err;
            else  console.log('Nouveau utilisateur ajouté à la BASE DE DONNEES avec succès !'); 
        });
}








    // switch(donne){
    //     case "inscription":

    //         var requete_sql = '\
    //         INSERT INTO user (nom,mot_de_passe,email,numTelephone)'+
    //         // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
    //         // et "?" lorsqu'il s'agit d'un nombre
    //         'VALUES(??,??,??,??)';
    //         // l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
    //         // qui doivent remplacer les points d'interrogation
    //         var inserts = [
    //             nom,
    //             passwd,
    //             email,
    //             numtel,
    //         ];
            
    //         const mysql = require('mysql');

    //         // Créer la variable pour se connecter à notre base
    //         const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });  

    //         // Try to connect
    //         con.connect(function(err) {   
    //             if (err) throw err;   
    //             console.log("Connecté à la base de données MySQL!");   
    //         });

    //         con.query(
    //         addNewValue,
    //         function (err, result) {
    //             if(err) throw err;
    //             console.log(result);
    //         });
    //         break;
    //     case "publication":
    //         var requete_sql = '\
    //         INSERT INTO publication (nomcreateur,contenu,dateecriture)'+
    //         // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
    //         // et "?" lorsqu'il s'agit d'un nombre
    //         'VALUES(??, ??, NOW())';
    //         // l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
    //         // qui doivent remplacer les points d'interrogation
    //         var inserts = [
    //             nomcreateur,
    //             contenu,
    //         ];
                    
    //         con.connect(function(err) {   
    //             if (err) throw err;   
    //                 console.log("Connecté à la base de données MySQL!");   
    //             });

    //         requete_sql = sql.preparer(mysql, requete_sql, inserts);
    //         con.query(
    //             requete_sql,
    //             function(err,result){
    //                 if(err) throw err;
    //                 console.log(result);}
    //         );
    //         break;
    //     case "connection":
            
    //         break;

    // }