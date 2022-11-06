const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', productsController.addNewProduct);

module.exports = router;