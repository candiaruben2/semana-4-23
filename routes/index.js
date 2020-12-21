const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo');
const categoriaRouter = require('./api/categoria');
const usuarioRouter = require('./api/usuario');

const router = routerx();

//router.use('/usuario', articuloRouter);
router.use('/articulo', articuloRouter);
router.use('/categoria', categoriaRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;