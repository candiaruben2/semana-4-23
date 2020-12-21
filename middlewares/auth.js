//Middleware de autenticacion;
//const token = require('../services/token');
const tokenService = require('../services/token');
//var token_trial = require('../controllers/UserController')

module.exports = {
    verifyUsuario: async(req, res, next) => {
        token = tokenService.encode(req);
        if (!token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        if (req.body.rol === 'Administrador' || req.body.rol === 'Vendedor' || req.body.rol === 'Almacenero' || req.body.rol === null) {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
}
