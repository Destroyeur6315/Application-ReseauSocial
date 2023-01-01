// Imports
var express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
var sessions = require('express-session');
const cookieParser = require("cookie-parser");
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
var crypto = require('crypto');
const console = require('console');
const { time } = require('console');
const { TimeoutError } = require('sequelize');
//const { Server } = require('http');


// Definition de variable globale
const onehour= 1000*60*60;
let nom;
var session;
let idUser=1;


// variable pour connexion à la base de donnée
nomHost = "localhost";
nomUser = "romainSAE";
leMDP = "guerre";
laDatabase = "romain_application";


// Instancier le serveur
var serveur = express();

var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};

// Création des tables
createtable();

////////// Middleware \\\\\\\\\\
// Utilise le module de parsing
serveur.use(express.json());
serveur.use(bodyParser.urlencoded({ extended: true }));

// Accéder aux Css et aux images
serveur.use(express.static(path.join(__dirname, '..', 'Code-FrontEnd')));

// Instancier les sessions
serveur.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: onehour },
    resave: false 
}));

// cookie parser middleware
serveur.use(cookieParser());

////////// Définiton des routes \\\\\\\\\\
// Méthode HTTP -> GET
serveur.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/inscriptionNew.html'))
});

serveur.get('/deconnection',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

serveur.get('/connexion.html',function(req,res){
    session=req.session;
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/connexionNew.html'))
});

serveur.get('/publiformulaire.html',function(req,res){
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/publiformulaire.html'))
});

serveur.get('/accueil.html', function(req, res){
    res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/accueil.html'))
});

serveur.get('/romainProfildonne', function(req, res){
    res.status(200).send(session);
});

// Méthode HTTP -> POST
serveur.post('/inscription.html', function(req, res) {
    pseudo=req.body.pseudo;
    passwd=req.body.pass;
    email=req.body.email;
    numtel=req.body.numTel;  

    // gérer les erreurs 
    if(pseudo == "" || passwd == ""){
         return res.status(400).send("<h1> Erreur : veuillez renseigner un mot de passe et un nom d'utilisater ! <h1>");
    }

    let requeteAddUser = "INSERT INTO user VALUES('" + idUser + "', '" + pseudo + "' , '" + passwd + "', '" + email + "', '"  + numtel + "');";

    insertUser(requeteAddUser);

    idUser = idUser + 1;
});


serveur.post('/connexion.html', async function(req, res, next){

    pseudo=req.body.pseudo;
    motdepasse=req.body.pass;

    const con = await mysql.createConnection({ host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase, Promise: bluebird  });

    const [rows, fields] = await con.execute('SELECT * FROM user WHERE nom = ? AND motdepasse = ?', [pseudo, motdepasse]);
    
    // transforme rows en json
    var test = JSON.stringify(rows);
    var json = JSON.parse(test);

    // gérer si la requête ne retourne rien (pseudo ou mot de passe incorrecte)
    try{
        session=req.session;
        session.loggedin=true;
        session.userid = await json[0].id;
        session.userpseudo = await json[0].nom;
        session.userMotDepasse = await json[0].motDePasse;
        session.email = json[0].email;
        session.numero = json[0].numTelephone;

        console.log(session);

        // redirige vers la page d'accueil
        res.redirect('http://localhost:8080/accueil.html');

    }catch(error){
        res.send("<h1> Erreur mot de passe incorrecte </h1>");
    }

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


////////// Fonction pour bdd \\\\\\\\\\
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

    const con = mysql.createConnection({   host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase })

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

async function createtable(){
        const con = await mysql.createConnection({ host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase, Promise: bluebird  });

        // Requête sql
        let supprimertable = "DROP TABLE IF EXISTS user;"
        let createtable = "CREATE TABLE user(\
                                    id char(5) PRIMARY KEY,\
                                    nom varchar(100) NOT NULL,\
                                    motDePasse varchar(100) NOT NULL,\
                                    email varchar(150),\
                                    numTelephone varchar(20)\
                                    );"


        const test = await con.execute(supprimertable);
        const test2 = await con.execute(createtable);
}

async function insertUser(requete){
        const con = await mysql.createConnection({ host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase, Promise: bluebird  });

         const test3 = await con.execute(requete);
}

