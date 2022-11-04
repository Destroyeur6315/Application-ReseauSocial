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

        console.log("test =" + pseudoFormulaire);
        console.log("test =" + motDePasseFormulaire);
        console.log("test =" + emailFormulaire);
        console.log("test =" + numTelFormulaire);

        // gérer les erreurs 
        if(pseudoFormulaire == "" || motDePasseFormulaire == ""){
            return res.status(400).send("<h1> ERREUR </h1>");
        }

        let addNewValue = "INSERT INTO user VALUES('" + idUser + "', '" + pseudoFormulaire + "' , '" + motDePasseFormulaire + "', '" + emailFormulaire + "', '"  + numTelFormulaire + "');"
        idUser = idUser + 1;
        console.log("SALUT");

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