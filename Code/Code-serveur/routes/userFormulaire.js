// Imports
var bcrypt = require('bcrypt');
var connexionAbdd = require('../ConnexionBDD/BaseDeDonnee');

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

        // Cryptage password and add user in bdd
        bcrypt.hash(motDePasseFormulaire, 5, function (err, bcryptedPassword){
            var motDePasseCripte = bcryptedPassword;
            console.log("mot de passe crypté 1 =" + motDePasseCripte);

            let addNewValue = "INSERT INTO user VALUES('" + idUser + "', '" + pseudoFormulaire + "' , '" + motDePasseCripte + "', '" + emailFormulaire + "', '"  + numTelFormulaire + "');";

            connexionAbdd.insertUserInBDD(addNewValue);
        });
        idUser = idUser + 1;

        // à modifier ! 
        return res.status(200).send("<h1> Inscription validé ! </h1>");
    },
    login: function(req, res){
        var pseudoFormulaire = req.body.pseudo;
        var motDePasseFormulaire = req.body.pass;

        console.log("test =" + pseudoFormulaire);
        console.log("test =" + motDePasseFormulaire);

        let requete = "SELECT * FROM user WHERE nom = " + pseudoFormulaire + ";";
        console.log(requete);

        // connexionAbdd.insertUserInBDD(requete);
    },
    getRegister: function(req, res){
        // res.sendFile('d:/Cours/BUT-2eme-Année/SAE/Application-ReseauSocial/Code/Code-FrontEnd/Html/inscription.html');
        res.sendFile( __dirname + '/style/Html/inscription.html');
    },
    getLogin: function(req, res){
        res.sendFile( __dirname + '/style/Html/connexion.html');
    },
    getLoginCss: function(req, res){
        res.sendFile( __dirname+ '/style/Css/InscriptionEtConnexion.css');
    }
}
