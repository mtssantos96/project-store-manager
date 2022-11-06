const connection = require('./connection');

async function getAll() {
  const [result] = await connection.execute(
    `SELECT
    sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return result;
}

async function getById(id) {
  const [result] = await connection.execute(
    `SELECT
    s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;`,
    [id],
  );
  return result;
}

async function insert(date) {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [date],
  );
  return insertId;
}

async function remove(id) {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [id],
  );
  return result;
}

module.exports = {
  getAll,
  getById,
  insert,
  remove,
};
