const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

async function getAll(_req, res) {
  const { message } = await salesService.getAll();
  return res.status(200).json(message);
}

async function getById(req, res) {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(200).json(message);
}

module.exports = {
  getAll,
  getById,
};
