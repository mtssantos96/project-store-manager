const { salesModel } = require('../models');

async function newSaleRegistry() {
  const currentDate = new Date();
  const newSaleId = await salesModel.insert(currentDate);
  return newSaleId;
}

async function getAll() {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
}

async function getById(saleId) {
  const sale = await salesModel.getById(saleId);
  if (sale && sale.length > 0) {
    return { type: null, message: sale };
  }
  return { type: 'NOT_FOUND', message: 'Sale not found' };
}

module.exports = {
  newSaleRegistry,
  getAll,
  getById,
};