const { productsModel } = require('../models');

const { validateNewProduct } = require('./validations/validateProducts');

async function getAll() {
  const result = await productsModel.getAll();
  return { type: null, message: result };
}

async function getById(id) {
  const product = await productsModel.getById(id);
  if (product) {
    return { type: null, message: product };
  }
  return { type: 'NOT_FOUND', message: 'Product not found' };
}

async function addNewProduct(product) {
  const error = await validateNewProduct(product);

  if (error.type) {
  return error;
  }

  const newProductId = await productsModel.insert(product);
  const newProduct = await productsModel.getById(newProductId);
  return { type: null, message: newProduct };
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
};