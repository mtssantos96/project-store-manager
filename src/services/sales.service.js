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

async function remove(id) {
  const sale = await salesModel.getById(id);
  if (sale && sale.length > 0) {
    await salesModel.remove(id);
    return { type: null };
  }
  return { type: 'NOT_FOUND', message: 'Sale not found' };
}
module.exports = {
  newSaleRegistry,
  getAll,
  getById,
  remove,
};