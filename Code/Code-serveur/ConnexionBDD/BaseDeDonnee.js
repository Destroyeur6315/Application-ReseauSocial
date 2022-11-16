// Imports
var jwt = require('jsonwebtoken');
const mysql = require('mysql');


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
                                    mot_de_passe varchar(100) NOT NULL,\
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
    requeteLoginInBDD: function(requete){
        const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

        // Try to connect
        con.connect(function(err) {   
            if (err) throw err;   
            console.log("Connecté à la base de données MySQL!");   
        });

        var globalResult;

        function recupResultat(err,  rows, fields) {
                if (err) throw err;
                for (var i = 0; i < rows.length; i++) {
                        result = rows; //je stock le résultat dans une variable pour l'envoyer à la vue
                };
                globalResult = console.log(JSON.stringify(result)); 
                //globalResult = result;
        }

        con.query(requete, recupResultat);

        //console.log(globalResult);    

        con.end(function (err) { 
            if (err) throw err;
            else  console.log('Fin de la connexion en BDD'); 
        });
    }
}