const express = require('express');

const router = express.Router();

const productsRouter = require('./productsRouter');

router.use('/products', productsRouter);

module.exports = router;