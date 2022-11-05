// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Variable 
let idUser = 0;

// Routes
module.exports = {
    register: function(req, res){

        // Réponse du formulaire
        var pseudoFormulaire = req.body.pseudo;
        var motDePasseFormulaire = req.body.pass;
        var emailFormulaire = req.body.email;
        var numTelFormulaire = req.body.numTel;

        // var motDePasseCripte = "";

        // Tests en console
        console.log("test =" + pseudoFormulaire);
        console.log("test =" + motDePasseFormulaire);
        console.log("test =" + emailFormulaire);
        console.log("test =" + numTelFormulaire);

        // gérer les erreurs 
        if(pseudoFormulaire == "" || motDePasseFormulaire == ""){
            return res.status(400).send("<h1> ERREUR </h1>");
        }

        bcrypt.hash(motDePasseFormulaire, 5, function (err, bcryptedPassword){
            var motDePasseCripte = bcryptedPassword;
            console.log("mot de passe crypté 1 =" + motDePasseCripte);

            let addNewValue = "INSERT INTO user VALUES('" + idUser + "', '" + pseudoFormulaire + "' , '" + motDePasseCripte + "', '" + emailFormulaire + "', '"  + numTelFormulaire + "');";

            connexionBaseDeDonnees(addNewValue);
        });
        idUser = idUser + 1;

        return res.status(200);
    },
    login: function(req, res){
        var pseudoFormulaire = req.body.pseudo;
        var motDePasseFormulaire = req.body.pass;

        console.log("test =" + pseudoFormulaire);
        console.log("test =" + motDePasseFormulaire);
    },
    getRegister: function(req, res){
        res.sendFile( __dirname +  '/inscription.html');
    },
    getLogin: function(req, res){
        res.sendFile( __dirname + '/connexion.html');
    }
}

function connexionBaseDeDonnees(requeteInsert){
    const mysql = require('mysql');
    // var requeteInsert = require('./routes/userFormulaire').addNewValue;

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
        else  console.log('Nouveau utilisateur ajouté à la BASE DE DONNEES avec succès !'); 
    });
}
