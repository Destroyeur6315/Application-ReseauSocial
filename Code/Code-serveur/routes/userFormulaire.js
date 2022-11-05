// Imports
var bcrypt = require('bcrypt');
var insertUser = require('../ConnexionBDD/BaseDeDonnee');

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

            insertUser.insertUserInBDD(addNewValue);
        });
        idUser = idUser + 1;

        return res.status(200).send("<h1> Inscription validé ! </h1>");
    },
    login: function(req, res){
        var pseudoFormulaire = req.body.pseudo;
        var motDePasseFormulaire = req.body.pass;

        console.log("test =" + pseudoFormulaire);
        console.log("test =" + motDePasseFormulaire);

        let requete = "SELECT * FROM user WHERE nom = " + pseudoFormulaire + ";";
        console.log(requete);
    },
    getRegister: function(req, res){
        res.sendFile( __dirname +  '/inscription.html');
    },
    getLogin: function(req, res){
        res.sendFile( __dirname + '/connexion.html');
    }
}
