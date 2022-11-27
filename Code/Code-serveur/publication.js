const mysql = require('mysql');

// Créer la variable pour se connecter à notre base
const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });  

// Try to connect
con.connect(function(err) {   
    if (err) throw err;   
    console.log("Connecté à la base de données MySQL!");   
}); 
let createtable = "CREATE TABLE publication(id char(5) PRIMARY KEY AUTO_INCREMENT, nomcreateur varchar(20),contenu text(),dateecriture date(),image varchar(30));"
con.query(
    createtable,
    function(err,result){
        if (err) throw err;
        console.log(result);
    }
)

//requête SQL
var requete_sql = '\
  INSERT INTO publication '+
  // ici, les valeurs prennent "??" lorsque nous insérons une chaîne de caractères
  // et "?" lorsqu'il s'agit d'un nombre
  'VALUES(??, ??, NOW(), ?, 0)';
// l'array "inserts" contient, dans l'ordre d'apparition dans la requête, les éléments
// qui doivent remplacer les points d'interrogation
var inserts = [
  nomcreateur,
  contenu,
  dateecriture
];
// enfin, nous préparons la requête SQL en exécutant la fonction sql.preparer()
requete_sql = sql.preparer(mysql, requete_sql, inserts);
