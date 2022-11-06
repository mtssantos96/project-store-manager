const camelize = require('camelize');
const connection = require('./connection');

async function getById(id) {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?;',
    [id],
  );
  return camelize(result);
}

async function insert(info) {
  const { saleId, productId, quantity } = info;
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
  return insertId;
}

module.exports = {
  getById,
  insert,
};
