const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const updateProductSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().min(5).required(),
});

function validateNewProduct(name) {
  const { error } = addProductSchema.validate(name);
  if (error) {
    const { type, message } = error.details[0];
    return {
      type: type === 'string.min' ? 'INVALID_VALUE' : 'MISSING_FIELD',
      message,
    };
  }
  
  return { type: null, message: '' };
}

function validateProductUpdate(productInfo) {
  const { error } = updateProductSchema.validate(productInfo);
  if (error) {
    const { type, message } = error.details[0];
    return {
      type: type === 'string.min' ? 'INVALID_VALUE' : 'MISSING_FIELD',
      message,
    };
  }
  return { type: null, message: '' };
}

module.exports = {
  validateNewProduct,
  validateProductUpdate,
};
