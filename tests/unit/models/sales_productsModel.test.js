const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { salesProductsModel } = require("../../../src/models");
const {
  updateSalesBody,
  updatedSaleResponse,
  rightSaleBody,
  saleCreateResponse,
  saleFromDB,
  formattedSale,
} = require("../mocks/sales_productsMock");

describe("Unit tests - sales_products.model", function () {
  it("getById - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([[saleFromDB]]);

    const result = await salesProductsModel.getById(1);
    expect(result).to.deep.equal(formattedSale);
  });

  it("addNewProduct - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    const result = await salesProductsModel.insert(rightSaleBody[0]);
    expect(result).to.equal(1);
  });

  it("update - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([updatedSaleResponse]);

    const saleId = 1;
    const result = await salesProductsModel.update(saleId, [updateSalesBody]);
    expect(result).to.deep.equal(updatedSaleResponse);
  });

  afterEach(sinon.restore);
});
