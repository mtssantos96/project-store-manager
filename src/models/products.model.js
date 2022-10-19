const connection = require('./connection');

async function getAll() {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return result;
}

async function getById(id) {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
}

module.exports = {
  getAll,
  getById,
};