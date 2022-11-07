const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");

const { salesModel } = require("../../../src/models");
const {
  allSalesResponse,
  salesByIdResponse,
  saleDate,
} = require("../mocks/salesMock");

describe("Unit tests - sales.model", function () {
  it("getAll - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([allSalesResponse]);

    const result = await salesModel.getAll();
    expect(result).to.deep.equal(allSalesResponse);
  });

  it("getById - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([salesByIdResponse]);

    const result = await salesModel.getById(1);
    expect(result).to.deep.equal(salesByIdResponse);
  });

  it("createNewSale - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.insert(saleDate);
    expect(result).to.equal(1);
  });

  it("update - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.remove(allSalesResponse[0].saleId);
    expect(result).to.deep.equal({ affectedRows: 1 });
  });

  afterEach(sinon.restore);
});
