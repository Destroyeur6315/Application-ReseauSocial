// Imports
var express = require('Express');
const { post } = require('./app');
var userFormulaire = require('./routes/LoginRegister');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
    
    // Users routes

    // Obtenir la page inscription
    apiRouter.route('/register/').get(userFormulaire.getPageRegister);

    // Obtenir la page connexion
    apiRouter.route('/connexion.html').get(userFormulaire.getPageLogin);

    // lorsque l'utilisateur veut s'incrire (envoie du formulaire)
    apiRouter.route('/user/').post(userFormulaire.registerUser);

    // lorsque l'utilisateur veut se connecter (envoie du formulaire)
    apiRouter.route('/login/').post(userFormulaire.login);

    //
    

    // Gérer le css 
    apiRouter.route('/Css/InscriptionEtConnexion.css').get(userFormulaire.getLoginCss);
    apiRouter.route('/Css/profil.css').get(userFormulaire.getProfilCss);
    
    //apiRouter.route('/users/connexion.html/').get(userFormulaire.getLogin);
    //apiRouter.route('/users/register/').get(userFormulaire.getRegister);
    //apiRouter.route('/users/register/').post(userFormulaire.register);
    //apiRouter.route('/users/connexion.html/').post(userFormulaire.login);
    
    
    return apiRouter;
})();