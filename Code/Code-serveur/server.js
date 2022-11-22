// Imports
var express = require('express');
// var connexionBDD = require('./connection');
const path=require('path');
var bodyParser = require("body-parser");
var sessions = require('express-session');
var crypto = require('crypto');
const { Server } = require('http');
const onehour=1000*60*60;



// Varibale pour données du formulaire
// Instancier le serveur
var serveur = express();


var session;
var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};
// utilise le module de parsing
serveur.use(bodyParser.urlencoded({ extended: true }));


serveur.get('/',(req,res)=>{
    sessions=req.session;
    if (sessions.userid){
        res.send("Tu es bien connecté")
    }
    else
        res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/inscription.html'))
});

serveur.get('/deconnection',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

serveur.get('inscription.html',function(req,res){
    res.sendFile(__dirname + '/publiFormulaire.html');
});

serveur.post('/', function(req, res) {
    nom=req.body.name;
    passwd=req.body.pass;
    email=req.body.email;
    numtel=req.body.numtel;  
    ajouteruser(nom,passwd,email,numtel);
});

serveur.get('/connexion.html',(req,res)=>{
    res.sendFile(__dirname + '/../Code-FrontEnd/Html/connexion.html')
});

Serveur.post('/connexion.html',function(req,res){
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
    console.log('Serveur en écoute...');
});

function ajouteruser(nom,passwd,email,numtel){
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
            requete_sql,
            function (err, result) {
                if(err) throw err;
                console.log(result);
            });
}

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

    con.query(
        requete_sql,
        function (err, result) {
            if(err) throw err;
            console.log(result);
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