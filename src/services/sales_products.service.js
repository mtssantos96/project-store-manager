const { salesProductsModel } = require('../models');
const salesService = require('./sales.service');
const {
  validateIds,
  validateSaleBody,
} = require('./validations/validateSalesProducts');

async function getById(id) {
  const sale = await salesProductsModel.getById(id);
  if (sale) {
    return { type: null, message: sale };
  }
  return { type: 'NOT_FOUND', message: 'Sale not found' };
}

async function createNewSale(saleInfo) {
  const validateProductsId = await validateIds(saleInfo);

  const validateSale = await validateSaleBody(saleInfo);
  if (validateSale.type) {
    return validateSale;
  }

  if (validateProductsId) {
    const saleId = await salesService.newSaleRegistry();
    const createAllSales = saleInfo.map(async (sale) => {
      await salesProductsModel.insert({ saleId, ...sale });
    });
  
    await Promise.all(createAllSales);
    const newSale = {
      id: saleId,
      itemsSold: saleInfo,
    };
    return { type: null, message: newSale };
  }
  return { type: 'NOT_FOUND', message: 'Product not found' };
}

async function update(id, saleInfo) {
  const validateProductsId = await validateIds(saleInfo);

  const validateSale = await validateSaleBody(saleInfo);
  if (validateSale.type) {
    return validateSale;
  }
  const sale = await salesProductsModel.getById(id);
  if (validateProductsId && sale) {
    const updateSales = saleInfo.map(async (info) => {
      await salesProductsModel.update(id, info);
    });

    await Promise.all(updateSales);
    const updatedSales = { saleId: id, itemsUpdated: saleInfo };
    return { type: null, message: updatedSales };
  }
  return sale
    ? { type: 'NOT_FOUND', message: 'Product not found' }
    : { type: 'NOT_FOUND', message: 'Sale not found' };
}

module.exports = {
  createNewSale,
  getById,
  update,
};