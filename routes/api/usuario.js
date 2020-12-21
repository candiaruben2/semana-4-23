/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.post('/register',userController.register);
//router.post('/login', auth.verifyUsuario, userController.login);
router.post('/login', userController.login);
router.get('/list', userController.list);


module.exports = router;