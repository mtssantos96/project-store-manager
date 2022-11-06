const Joi = require('joi');

const addProductSchema = Joi.object({
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

module.exports = {
  validateNewProduct,
};
