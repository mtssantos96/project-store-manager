const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

async function getAll(_req, res) {
  const result = await productsService.getAll();
  return res.status(200).json(result.message);
}

async function getById(req, res) {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (!result.message) {
        return res.status(404).json({ message: 'Product not found' });    
      }
     return res.status(200).json(result.message);
}

async function addNewProduct(req, res) {
  const product = req.body;
  
  const { type, message } = await productsService.addNewProduct(product);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json(message);
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
};