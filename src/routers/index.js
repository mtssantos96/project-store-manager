const express = require('express');

const router = express.Router();

const productsRouter = require('./products.routes');
const salesRouter = require('./sales.routes');

router.use('/products', productsRouter);

router.use('/sales', salesRouter);

module.exports = router;