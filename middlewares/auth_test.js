//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verifyUsuario: async(req, res, next) => {
        const response = await tokenService.decode(token);
        return res;
    },

}