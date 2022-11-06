const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

async function getAll(_req, res) {
  const result = await productsService.getAll();
  return res.status(200).json(result.message);
}

async function getById(req, res) {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) {
        return res.status(errorMap.mapError(type)).json({ message });    
      }
     return res.status(200).json(message);
}

async function addNewProduct(req, res) {
  const product = req.body;
  
  const { type, message } = await productsService.addNewProduct(product);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json(message);
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const productDetails = { id, name };

  const { type, message } = await productsService.update(productDetails);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json(message);
}

async function remove(req, res) {
  const { id } = req.params;
  const { type, message } = await productsService.remove(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  addNewProduct,
  update,
  remove,
};