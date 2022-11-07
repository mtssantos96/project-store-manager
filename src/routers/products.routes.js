const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/search', productsController.search);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.delete('/:id', productsController.remove);

router.post('/', productsController.addNewProduct);

router.put('/:id', productsController.update);

module.exports = router;