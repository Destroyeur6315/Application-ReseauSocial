// Imports
const mysql = require('mysql');

// Créer la variable pour se connecter à notre base
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
    else  console.log('Créaation de la table avec succés.'); 
});


 
