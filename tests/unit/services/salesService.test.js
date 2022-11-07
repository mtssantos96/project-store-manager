const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const {
  invalidId,
  salesByIdResponse,
  allSalesResponse,
} = require("../mocks/salesMock");

describe("Unit tests - sales.controller", function () {
  describe("GET /sales", function () {
    it("getAll - Successfully", async function () {
      sinon.stub(salesModel, "getAll").resolves(allSalesResponse);

      const result = await salesService.getAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSalesResponse);
    });
  });

  describe("GET /sales/:id", function () {
    it("getById - Successfully", async function () {
      sinon.stub(salesModel, "getById").resolves(salesByIdResponse);

      const result = await salesService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(salesByIdResponse);
    });

    
    it("getById - NOT_FOUND - Sale not found", async function () {
      sinon.stub(salesModel, "getById").resolves(undefined);

      const result = await salesService.getById(invalidId);
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });
  });

  describe("DELETE - sale/:id", function () {
    it("remove - Successfully", async function () {
      sinon.stub(salesModel, "getById").resolves(salesByIdResponse);
      sinon.stub(salesModel, "remove").resolves({ affectedRows: 1 });

      const result = await salesService.remove(1);
      expect(result.type).to.equal(null);
    });

    it("remove - NOT_FOUND - Sale not found", async function () {
      sinon.stub(salesModel, "getById").resolves([]);
      sinon.stub(salesModel, "remove").resolves(undefined);

      const result = await salesService.remove(invalidId);
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });
  });

  afterEach(sinon.restore);
});
