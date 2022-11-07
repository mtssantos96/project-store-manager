const invalidId = 99;

const allSalesResponse = [
  {
    saleId: 1,
    date: "2022-11-07T15:37:55.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-11-07T15:37:55.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-11-07T15:37:55.000Z",
    productId: 3,
    quantity: 15,
  },
];

const salesByIdResponse = [
  {
    date: "2022-11-07T15:37:55.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-11-07T15:37:55.000Z",
    productId: 2,
    quantity: 10,
  },
];


const saleDate = "2022-11-07 13:33:00";

module.exports = {
  invalidId,
  allSalesResponse,
  salesByIdResponse,
  saleDate,
};
