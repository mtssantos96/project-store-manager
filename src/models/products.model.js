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

async function update(product) {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [product.name, product.id],
  );
  return result;
}

async function remove(id) {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return result;
}

async function search(name) {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`,
  );
  return result;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
  search,
};