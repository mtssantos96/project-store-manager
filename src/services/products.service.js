const { productsModel } = require('../models');

const {
  validateNewProduct,
  validateProductUpdate,
} = require('./validations/validateProducts');

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

async function update(product) {
  const error = await validateProductUpdate(product);
  if (error.type) {
    return error;
  }

  const updateProduct = await productsModel.getById(product.id);
  if (updateProduct) {
    await productsModel.update(product);
    return { type: null, message: product };
  }
  return { type: 'NOT_FOUND', message: 'Product not found' };
}

async function remove(id) {
  const product = await productsModel.getById(id);
  if (product) {
    await productsModel.remove(id);
    return { type: null };
  }
  return { type: 'NOT_FOUND', message: 'Product not found' };
}

async function search(name) {
  const products = await productsModel.search(name);
  if (products) {
    return { type: null, message: products };
  }
  return { type: 'NOT_FOUND', message: 'Product not found' };
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
  update,
  remove,
  search,
};