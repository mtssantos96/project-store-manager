const Joi = require('joi');
const { productsModel } = require('../../models');

const newSaleSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

function validateNewSale(saleInfo) {
  const { error } = newSaleSchema.validate(saleInfo);
  if (error) {
    const { type, message } = error.details[0];
    console.log(type);
    return {
      type: type === 'number.min' ? 'INVALID_VALUE' : 'MISSING_FIELD',
      message,
    };
  }
  return { type: null, message: '' };
}

async function validateIds(saleInfo) {
  const allProducts = await productsModel.getAll();
  const allProductsId = allProducts.map(({ id }) => id);
  const allProductsSaleId = saleInfo.map(({ productId }) => productId);
  return allProductsSaleId.every((id) => allProductsId.includes(id));
}

async function validateSaleBody(saleInfo) {
  const validateBody = saleInfo.map((sale) => validateNewSale(sale));
  const validationError = validateBody.find(({ type }) => type);
  return validationError || { type: null, message: '' };
}

module.exports = {
  validateNewSale,
  validateIds,
  validateSaleBody,
};
