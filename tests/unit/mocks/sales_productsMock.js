const invalidId = 99;

const allSalesProducts = [
  { id: 1, itemsSold: [{ productId: 1, quantity: 5 }] },
  { id: 2, itemsSold: [{ productId: 1, quantity: 5 }] },
];

const wrongSaleNotProductIdBody = [{ quantity: 1 }];

const wrongSaleNotQuantityBody = [{ productId: 1 }];

const nonexistentProductIdBody = [{ productId: 99, quantity: 1 }];

const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];

const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];

const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];

const otherProductIdSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 3, quantity: 5 },
];

const updateSalesBody = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

const updatedSaleResponse = {
  saleId: "1",
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 10,
    },
  ],
};

const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};


const saleFromDB = [{ sale_id: 1, product_id: 1, quantity: 5 }];
const formattedSale = [{ saleId: 1, productId: 1, quantity: 5 }];

module.exports = {
  invalidId,
  allSalesProducts,
  updateSalesBody,
  updatedSaleResponse,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  otherProductIdSaleBody,
  rightSaleBody,
  saleCreateResponse,
  saleFromDB,
  formattedSale,
};
