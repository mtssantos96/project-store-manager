const { productsModel } = require('../models');

async function getAll() {
  const result = await productsModel.getAll();
  return { type: null, message: result }; 
}

async function getById(id) {
  const result = await productsModel.getById(id);
  return { type: null, message: result }; 
}

async function addNewProduct(name) {
  const id = await productsModel.insert(name);
  const result = await productsModel.getById(id);
  return { type: null, message: result };
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
};