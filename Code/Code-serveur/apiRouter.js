// Imports
var express = require('Express');
var userFormulaire = require('./routes/userFormulaire');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
    
    // Users routes
    apiRouter.route('/users/connexion.html/').get(userFormulaire.getLogin);
    apiRouter.route('/users/register/').get(userFormulaire.getRegister);
    apiRouter.route('/users/register/').post(userFormulaire.register);
    apiRouter.route('/users/connexion.html/').post(userFormulaire.login);
    apiRouter.route('/Css/InscriptionEtConnexion.css').get(userFormulaire.getLoginCss);
    
    return apiRouter;
})();