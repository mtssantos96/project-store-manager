const Joi = require('joi');
const { productsModel } = require('../models');

const newProductBody = Joi.object({
  name: Joi.string().min(5).required(),
});

async function getAll() {
  const result = await productsModel.getAll();
  return { type: null, message: result };
}

async function getById(id) {
  const result = await productsModel.getById(id);
  return { type: null, message: result };
}

function validateNewProduct(product) {
  const { name } = product;
  if (!name) {
    return { type: 'MISSING_FIELD', message: '"name" is required' };
  }
  const { error } = newProductBody.validate(product);

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }
}

async function addNewProduct(product) {
  const error = validateNewProduct(product);

  if (error) {
  return error;
  }

  const id = await productsModel.insert(product);
  const result = await productsModel.getById(id);
  return { type: null, message: result };
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
};
