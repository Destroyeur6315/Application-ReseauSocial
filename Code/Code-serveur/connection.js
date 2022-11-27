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
let createtable = "CREATE TABLE user(id char(5) PRIMARY KEY AUTO_INCREMENT, nom varchar(20));"
let addValue = "INSERT INTO user VALUES('00001', 'Manon');"

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

con.query(
    addValue,
    function (err, result){
        if(err) throw err;
        console.log(result); 
});

con.end(function (err) { 
    if (err) throw err;
    else  console.log('Done.') 
});


 
