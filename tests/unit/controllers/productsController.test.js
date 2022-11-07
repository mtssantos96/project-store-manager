const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const {
  invalidId,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateResponse,
  productSearchNameResponse,
} = require("../mocks/productsMock");

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");

describe("Unit tests - products.controller", function () {
  describe("GET /products", function () {
    it("getAll", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves({ type: null, message: allProductsResponse });

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe("GET /products/:id", function () {
    it("getById - Successfully", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: null, message: allProductsResponse[0] });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it("getById - NOT_FOUND - Product not found", async function () {
      const res = {};
      const req = {
        params: { id: 99 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getById")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("GET /products/search", function () {
    it("search - Successfully", async function () {
      const res = {};
      const req = {
        query: { q: "martelo" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "search")
        .resolves({ type: null, message: productSearchNameResponse });

      await productsController.search(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productSearchNameResponse);
    });

    it("search - values empty - getAll", async function () {
      const res = {};
      const req = {
        query: { q: "" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "getAll")
        .resolves({ type: null, message: allProductsResponse });

      await productsController.search(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe("POST /products", function () {
    it("addNewProduct - Successfully", async function () {
      const res = {};
      const req = { body: { ...productCreateResponse } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "addNewProduct")
        .resolves({ type: null, message: productCreateResponse });

      await productsController.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productCreateResponse);
    });

    it("addNewProduct - MISSING_FIELD - 'name' is required", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "addNewProduct")
        .resolves({ type: "MISSING_FIELD", message: '"name" is required' });

      await productsController.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });
  });

  describe("PUT /product/:id", function () {
    it("update - Successfully", async function () {
      const res = {};
      const req = {
        body: { ...productUpdateBody },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "update")
        .resolves({ type: null, message: productUpdateResponse });

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productUpdateResponse);
    });

    it("update - NOT_FOUND - Product not found", async function () {
      const res = {};
      const req = {
        body: { ...productUpdateBody },
        params: { id: invalidId },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "update")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("DELETE /product/:id", function () {
    it("remove - Successfully", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsService, "remove").resolves({ type: null });

      await productsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("remove - NOT_FOUND - Product not found", async function () {
      const res = {};
      const req = { params: { id: invalidId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "remove")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  afterEach(sinon.restore);
});
