const { salesProductsService } = require('../services');
const errorMap = require('../utils/errorMap');

async function getById(req, res) {
  const { id } = req.params;
  const { type, message } = await salesProductsService.getById(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(200).json(message);
}

async function createNewSale(req, res) {
  const sale = req.body;
  const { type, message } = await salesProductsService.createNewSale(sale);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(201).json(message);
}

async function update(req, res) {
  const { id } = req.params;
  const saleInfo = req.body;
  const { type, message } = await salesProductsService.update(
    id,
    saleInfo,
  );
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(200).json(message);
}

module.exports = {
  getById,
  createNewSale,
  update,
};
