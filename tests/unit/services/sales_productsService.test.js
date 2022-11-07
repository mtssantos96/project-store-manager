const { expect } = require("chai");
const sinon = require("sinon");

const {
  productsModel,
  salesModel,
  salesProductsModel,
} = require("../../../src/models");
const { salesProductsService } = require("../../../src/services");

const { allProductsResponse } = require("../mocks/productsMock");
const {
  rightSaleBody,
  nonexistentProductIdBody,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  wrongZeroQuantityBody,
  saleCreateResponse,
  updatedSaleResponse,
  updateSalesBody,
  saleId,
  invalidId,
} = require("../mocks/sales_productsMock");

describe("Unit tests - sales_products.service", function () {
  describe("POST /sales", function () {
    it("createNewSale - Successfully", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
      sinon.stub(salesModel, "insert").resolves(3);
      sinon.stub(salesProductsModel, "insert").resolves(rightSaleBody);
      sinon.stub(salesProductsModel, "getById").resolves(saleCreateResponse);

      const result = await salesProductsService.createNewSale(rightSaleBody);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleCreateResponse);
    });

    it("createNewSale - NOT_FOUND - Product not found", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
      sinon.stub(productsModel, "getById").resolves(undefined);
      sinon.stub(salesModel, "insert").resolves(undefined);
      sinon.stub(salesProductsModel, "insert").resolves(undefined);

      const result = await salesProductsService.createNewSale(
        nonexistentProductIdBody
      );
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("createNewSale - MISSING_FIELD - 'productId' is required", async function () {
      sinon.stub(salesProductsModel, "getById").resolves(undefined);

      const result = await salesProductsService.createNewSale(
        wrongSaleNotProductIdBody
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("createNewSale - MISSING_FIELD - 'quantity' is required", async function () {
      const result = await salesProductsService.createNewSale(
        wrongSaleNotQuantityBody
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("createNewSale - INVALID_VALUE - 'quantity' must be greater than or equal to 1", async function () {
      const result = await salesProductsService.createNewSale(
        wrongZeroQuantityBody
      );
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });


  describe("GET /sales/:id", function () {
    it("getById - Successfully", async function () {
      sinon
        .stub(salesProductsModel, "getById")
        .resolves(allProductsResponse[0]);

      const result = await salesProductsService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(allProductsResponse[0]);
    });

    it("getById - NOT_FOUND - Sale not found", async function () {
      sinon.stub(salesProductsModel, "getById").resolves(undefined);

      const result = await salesProductsService.getById();
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });
  });

  describe("PUT /sale/:id", function () {
    it("update - Successfully", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
      sinon
        .stub(salesProductsModel, "getById")
        .resolves(allProductsResponse[0]);
      sinon.stub(salesProductsModel, "update").resolves({ changedRows: 1 });

      const result = await salesProductsService.update(saleId, updateSalesBody);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedSaleResponse);
    });

    it("update - NOT_FOUND - Sale not found", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
      sinon.stub(salesProductsModel, "getById").resolves(undefined);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.update(
        invalidId,
        rightSaleBody
      );
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("update - NOT_FOUND - Product not found", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);
      sinon.stub(salesProductsModel, "getById").resolves(saleCreateResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.update(
        saleId,
        nonexistentProductIdBody
      );
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("update - MISSING_FIELD - 'productId' is required", async function () {
      sinon.stub(productsModel, "getById").resolves(saleCreateResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.update(
        saleId,
        wrongSaleNotProductIdBody
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("update - MISSING_FIELD - 'quantity' is required", async function () {
      sinon.stub(productsModel, "getById").resolves(saleCreateResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.update(
        saleId,
        wrongSaleNotQuantityBody
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("update - INVALID_VALUE - 'quantity' must be greater than or equal to 1", async function () {
      sinon.stub(productsModel, "getById").resolves(saleCreateResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.update(
        saleId,
        wrongZeroQuantityBody
      );
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  afterEach(sinon.restore);
});
