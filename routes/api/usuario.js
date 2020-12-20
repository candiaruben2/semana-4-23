/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../../controllers/UserController');
//const auth = require('../../middlewares/auth');

const router = routerx();


router.post('./register', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(200).json(user);
})

router.post('/login', userController.login);


module.exports = router;