const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const {
  allSalesProducts,
  updateSalesBody,
  updatedSaleResponse,
  invalidId,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  wrongZeroQuantityBody,
  rightSaleBody,
  saleCreateResponse,
} = require("../mocks/sales_productsMock");

const { salesProductsController } = require("../../../src/controllers");
const { salesProductsService } = require("../../../src/services");

describe("Unit tests - sales_products.controller", function () {
  describe("POST /sales", function () {
    it("createNewSale - Successfully", async function () {
      const res = {};
      const req = { body: { ...rightSaleBody } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "createNewSale")
        .resolves({ type: null, message: saleCreateResponse });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleCreateResponse);
    });

    it("createNewSale - NOT_FOUND - Product not found", async function () {
      const res = {};
      const req = { body: { ...nonexistentProductIdBody } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "createNewSale")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("createNewSale - MISSING_FIELD - 'productId' is required", async function () {
      const res = {};
      const req = { body: { ...wrongSaleNotProductIdBody } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"productId" is required',
      });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });

    it("createNewSale - MISSING_FIELD - 'quantity' is required", async function () {
      const res = {};
      const req = { body: { ...wrongSaleNotQuantityBody } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"quantity" is required',
      });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });

    it("createNewSale - INVALID_VALUE - 'quantity' must be greater than or equal to 1", async function () {
      const res = {};
      const req = { body: { ...wrongZeroQuantityBody } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe("GET /sales/:id", function () {
    it("getById - Successfully", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "getById")
        .resolves({ type: null, message: allSalesProducts[0] });

      await salesProductsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesProducts[0]);
    });

    it("getById - NOT_FOUND - Sale not found", async function () {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "getById")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      await salesProductsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
  });

  describe("PUT /sale/:id", function () {
    it("update - Successfully", async function () {
      const res = {};
      const req = {
        body: { updateSalesBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "update")
        .resolves({ type: null, message: updatedSaleResponse });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSaleResponse);
    });

    it("update - NOT_FOUND - Sale not found", async function () {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "update")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    it("update - NOT_FOUND - Product not found", async function () {
      const res = {};
      const req = {
        body: { nonexistentProductIdBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "update")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("update - MISSING_FIELD - 'productId' is required", async function () {
      const res = {};
      const req = {
        body: { wrongSaleNotProductIdBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "update").resolves({
        type: "MISSING_FIELD",
        message: '"productId" is required',
      });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });

    it("update - MISSING_FIELD - 'quantity' is required", async function () {
      const res = {};
      const req = {
        body: { wrongSaleNotQuantityBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "update").resolves({
        type: "MISSING_FIELD",
        message: '"quantity" is required',
      });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });

    it("update - INVALID_VALUE - 'quantity' must be greater than or equal to 1", async function () {
      const res = {};
      const req = {
        body: { wrongZeroQuantityBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "update").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesProductsController.update(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  afterEach(sinon.restore);
});
