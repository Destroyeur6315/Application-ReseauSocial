// Imports
var express = require('Express');
var userFormulaire = require('./routes/userFormulaire');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
    
    // Users routes
    apiRouter.route('/users/login/').get(userFormulaire.getLogin);
    apiRouter.route('/users/register/').get(userFormulaire.getRegister);
    apiRouter.route('/users/inscription.html/').post(userFormulaire.register);
    apiRouter.route('/users/connexion.html/').post(userFormulaire.login);
    
    return apiRouter;
})();