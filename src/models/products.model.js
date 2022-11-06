const connection = require('./connection');

async function getAll() {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
}

async function getById(id) {
  const [[result]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [id],
    );
  return result;
}

async function insert(product) {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return result.insertId;
}

module.exports = {
  getAll,
  getById,
  insert,
};