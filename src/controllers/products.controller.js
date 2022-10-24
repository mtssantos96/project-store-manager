const { productsService } = require('../services');

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
  const { name } = req.body;
  const result = await productsService.addNewProduct(name);
  res.status(201).json(result.message);
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
};