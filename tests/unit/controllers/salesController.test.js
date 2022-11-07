const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
const { invalidId, allSalesResponse, salesByIdResponse } = require("../mocks/salesMock");

describe("Unit tests - sales.controller", function () {
  describe("GET /sales", function () {
    it("getAll - Successfully", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getAll")
        .resolves({ type: null, message: allSalesResponse });

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesResponse);
    });
  });

  describe("GET /sales/:id", function () {
    it("getById - Successfully", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getById")
        .resolves({ type: null, message: salesByIdResponse });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesByIdResponse);
    });

    it("getById - NOT_FOUND - Sale not found", async function () {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getById")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
  });

  describe("DELETE - sale/:id", function () {
    it("remove - Successfully", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesService, "remove").resolves({ type: null });

      await salesController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("remove - NOT_FOUND - Sale not found", async function () {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "remove")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      await salesController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });

  afterEach(sinon.restore);
});
