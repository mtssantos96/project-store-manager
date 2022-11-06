const express = require('express');

const router = express.Router();

const { salesController, salesProductsController } = require('../controllers');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesProductsController.createNewSale);

router.delete('/:id', salesController.remove);

module.exports = router;
