const mysql = require('mysql');
var requeteInsert = require('./routes/userFormulaire').addNewValue;

// Créer la variable pour se connecter à notre base
const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });  

// Try to connect
con.connect(function(err) {   
    if (err) throw err;   
    console.log("Connecté à la base de données MySQL!");   
});

con.query(
    requeteInsert,
    function (err, result) {
        if (err) throw err;       
        console.log(result);    
});

con.end(function (err) { 
    if (err) throw err;
    else  console.log('Done.') 
});

console.log("OUI FICHIER OUVERT");
