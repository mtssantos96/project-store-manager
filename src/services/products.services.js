const { productsModels } = require('../models');

async function getAll() {
  const result = await productsModels.getAll();
  return { type: null, message: result }; 
}

async function getById(id) {
  const result = await productsModels.getById(id);
  return { type: null, message: result }; 
}

module.exports = {
  getAll,
  getById,
};