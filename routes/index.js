const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo');
const categoriaRouter = require('./api/categoria');

const router = routerx();

//router.use('/usuario', articuloRouter);
router.use('/articulo', articuloRouter);

router.use('/categoria', categoriaRouter);

console.log("carga rutas")

module.exports = router;