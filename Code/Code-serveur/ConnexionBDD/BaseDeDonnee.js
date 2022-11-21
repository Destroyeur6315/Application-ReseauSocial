// Imports
var jwt = require('jsonwebtoken');
const mysql = require('mysql');
var bcrypt = require('bcrypt');
const res = require('express/lib/response');

// compare password
/** 
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    console.log(result);

    var test = result;
    console.log("test vaut =", test);

    return result;
}
*/

function valide(){

}

function invalide(){

}

module.exports = {
    createTable: function(){
        const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

        // Try to connect
        con.connect(function(err) {   
            if (err) throw err;   
            console.log("Connecté à la base de données MySQL!");   
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
            else  console.log('Création de la table avec succés.'); 
        });
    },
    insertUserInBDD: function(requete){
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
    },
    requeteLoginInBDD: function(pseudo, motDePasse){
        const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

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
                        invalide("invalide");
                    }
                })
            }
        }   

        con.query(requete, recupResultat);

        con.end(function (err) { 
            if (err) throw err;
            else  console.log('Fin de la connexion en BDD'); 
        });
    }
}