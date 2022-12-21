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
/** 
        const con = mysql.createConnection({   host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase });

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
        */
}

function connexion2(pseudo, motDePasse){
    const con = mysql.createConnection({    host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase });

    let validation = "INVALIDE";

    var query = con.query("SELECT * FROM user WHERE nom = '" + pseudo + "';");

    query
        .on('error', function(err) {
            // Handle error, an 'end' event will be emitted after this as well
            throw err; 
        })
        .on('fields', function(fields) {
            // the field packets for the rows to follow
        })
        .on('result', function(rows) {
            // Pausing the connnection is useful if your processing involves I/O
            con.pause();

            console.log(rows.nom);
            console.log(rows.motDePasse);

            if(rows.motDePasse == motDePasse){
                validation = "VALIDE";
                mdp = rows.motDePasse;
                user = rows.nom;
            }

            //con.resume();
        })
        .on('end', function() {
            // all rows have been received
        });

    console.log(validation);

}

// Voir évènements
// Voir comment envoyer données directement dans les vues
async function connexion(req, res, pseudo, motDePasse){
    const con = await mysql.createConnection({ host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase, Promise: bluebird  });

    const [rows, fields] = await con.execute('SELECT * FROM user WHERE nom = ? AND motdepasse = ?', ["romain", "guerre"]);

    
    //console.log(fields);
    console.log(rows);

    var test = JSON.stringify(rows);
    var json = JSON.parse(test);

    nom = await json[0].nom;

    console.log(json[0].nom);
    console.log("nom = " + nom);

    console.log("*******************");

    return rows;

    //const con = mysql.createConnection({    host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase });
    /** 
    // Try to connect
    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");  
    });

    const [rows, fields] = await con.query('SELECT * FROM user WHERE nom = ? AND motdepasse > ?', [pseudo, motDePasse]);

    
    con.end(function (err) { 
        if (err) throw err;
        else  console.log('Fin de la connexion en BDD'); 
    });

    console.log("test ======" + rows);

    /** 
    var requete_sql = '\
        SELECT * FROM user WHERE nom="' + pseudo + '" AND motdepasse="' + motDePasse + '";';

    var inserts = [
    pseudo,
    motDePasse,
    ];

    function preparer(mysql, requete_sql, inserts) {
        requete_sql = mysql.format(requete_sql, inserts)
        // nous utilisons la méthode .remplace avec une expression régulière
        // pour supprimer les accents graves et les points
        .replace(/`/g, "'")
        .replace(/'\.'/g, ".")
        .replace(/'/g, "\\'");
        return requete_sql;
    }

    requete_sql = preparer(mysql,requete_sql,inserts);
    

    
    function maFonction(param1, param2, callback){
        var result;
        var err;
        
        callback(err, result);
    }
    
    maFonction("param1", "param2", function(err, result){
        doSomethingWithResult(result);
        doSomethingWithError(err);
    }); 

    const donne = await con.query(requete_sql, function(err,results,fields){
        console.log(results);
        if(err) throw err;
        if (results.length>0){
             var test = JSON.stringify(results);
             var json = JSON.parse(test);

            session=req.session;
            session.loggedin=true;
            session.userid = pseudo;
            session.userMotDepasse = motDePasse;
            session.email = json[0].email;
            //session.userid=results[1];
            console.log(req.session);
            res.status(200).json({ results });
            //res.sendFile(path.resolve(__dirname+'/../Code-FrontEnd/Html/romainProfil.html'));
        }
        else{
            console.log(req.session);
            res.send("mot de passe et/ou identifiant incorrecte");
        }
    });

    */

    //console.log(donne);

    
}

function connexion3(pseudo, motDePasse){
    const con = mysql.createConnection({    host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase });

    // Try to connect
    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");  
    });

    let requete = "SELECT * FROM user WHERE nom = '" + pseudo + "';";

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

            if(motDePasse == json[0].motDePasse){
                console.log("OUI mot de passe VALIDE");
            }
            else{
                console.log("NON mot de passe INVALIDE");
            }

           //var n = comparePassword(motDePasse, json[0].motDePasse);
            /**
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
             */
        }

        return result;
    }   

    con.query(requete,  recupResultat);
    
    console.log("OUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

    con.end(function (err) { 
        if (err) throw err;
        else  console.log('Fin de la connexion en BDD'); 
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

    //document=path.resolve(__dirname+'/../Code-FrontEnd/Html/romainProfil.html');

    //const contenu1= document.getElementById("name");

    //console.log("contenu1 =" + contenu1);

    //console.log(nom);
    /** 
    const mysql = require('mysql');

    const con = mysql.createConnection({   host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase })

    con.connect(function(err) {   
        if (err) throw err;   
        console.log("Connecté à la base de données MySQL!");   
    });

    requete_sql = 'SELECT * FROM user WHERE nom = "' + pseudo  + '" AND motdepasse = "' + motdepasse +'"';

    //requete_sql = sql.preparer(mysql, requete_sql, inserts);
    await con.query(
        requete_sql,
        function (err, result) {
            if(err){
                throw err;
            } 

            var test = JSON.stringify(result);

            console.log(test);
            //var json = JSON.parse(test);

            res.send(test)
    });

    next();

    /**
    const con = mysql.createConnection({ host: nomHost,   user: nomUser,   password: leMDP,   database : laDatabase, Promise: bluebird  });

    const rows = con.execute('SELECT * FROM user WHERE nom = ? AND motdepasse = ?', [pseudo, motdepasse]);

    //console.log(fields);
    console.log(rows);

    var test = JSON.stringify(rows);
    var json = JSON.parse(test);

    nom = json[0].nom;

    console.log(json[0].nom);
    console.log("nom = " + nom);

    console.log("*******************");
     */

    /**
    if(pseudo == myusername && motdepasse == mypassword){
        session=req.session;
        session.userid=pseudo;
        console.log(req.session);
        res.send(`Hey there, welcome <a href=\'/deconnection'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
    */

    //await connexion2(pseudo, motdepasse);
    //let data = connexion(req, res, pseudo, motdepasse);

    //console.log("test data =" + data);
    /** 
    async function data(req, res){
        try{
            const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });
            
            const donne = await con.query(
                'SELECT * FROM user WHERE nom="' + romain + '" AND motdepasse="' + roro + '";',
                (error, results) => {
                    if(error){
                        res.json({ error });
                    }else {
                        res.status(200).json({result});
                    }
                }

            )}catch(err){
                res.status(500).json({ error : err})
            }
        }       

    data();
    */

    //console.log("test = ");