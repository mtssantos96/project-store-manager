const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const {
  wrongSizeProductBody,
  invalidId,
  allProductsResponse,
  rightProductBody,
  wrongProductBody,
  productCreateResponse,
  productId,
  productUpdateInvalideId,
  productUpdateResponse,
  productSearchNameResponse,
} = require("../mocks/productsMock");

describe("Unit tests - products.service", function () {
  describe("GET /products", function () {
    it("getAll", async function () {
      sinon.stub(productsModel, "getAll").resolves(allProductsResponse);

      const result = await productsService.getAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse);
    });
  });

  describe("GET /products/:id", function () {
    it("getById - Successfully", async function () {
      sinon.stub(productsModel, "getById").resolves(allProductsResponse[0]);

      const result = await productsService.getById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse[0]);
    });

    it("getById - NOT_FOUND - Product not found", async function () {
      sinon.stub(productsModel, "getById").resolves(undefined);

      const result = await productsService.getById(invalidId);
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  describe("GET /products/search", function () {
    it("search - Successfully", async function () {
      sinon.stub(productsModel, "search").resolves(productSearchNameResponse);

      const result = await productsService.search("%martelo%");
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productSearchNameResponse);
    });

    it("search - values empty - getAll", async function () {
      sinon.stub(productsModel, "search").resolves(allProductsResponse);

      const result = await productsService.search();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProductsResponse);
    });
  });

  describe("POST /products", function () {
    it("addNewProduct - Successfully", async function () {
      sinon.stub(productsModel, "insert").resolves([{ insertId: 1 }]);
      sinon.stub(productsModel, "getById").resolves(productCreateResponse);

      const result = await productsService.addNewProduct(rightProductBody);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productCreateResponse);
    });

    it("update - MISSING_FIELD - 'name' is required", async function () {
      sinon.stub(productsModel, "insert").resolves([{ insertId: 1 }]);
      sinon.stub(productsModel, "getById").resolves(allProductsResponse[0]);

      const result = await productsService.addNewProduct(productId);
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"name" is required');
    });

    it("addNewProduct - INVALID_VALUE - 'name' length must be at least 5 characters long", async function () {
      const result = await productsService.addNewProduct(wrongSizeProductBody);
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.deep.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe("PUT /product/:id", function () {
    it("update - Successfully", async function () {
      sinon.stub(productsModel, "update").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "getById").resolves(allProductsResponse[0]);
      console.log({ affectedRows: 1 });

      const result = await productsService.update(productUpdateResponse);
      
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(productUpdateResponse);
    });

    it("update - NOT_FOUND - Product not found", async function () {
      sinon.stub(productsModel, "update").resolves(undefined);
      sinon.stub(productsModel, "getById").resolves(undefined);

      const result = await productsService.update(productUpdateInvalideId);
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("update - MISSING_FIELD - 'name' is required", async function () {
      sinon.stub(productsModel, "update").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "getById").resolves(allProductsResponse[0]);

      const result = await productsService.update(productId);
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"name" is required');
    });

    it("update - INVALID_VALUE - name length must be at least 5 characters long", async function () {
      const result = await productsService.update(wrongSizeProductBody);
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe("DELETE /product/:id", function () {
    it("remove - Successfully", async function () {
      sinon.stub(productsModel, "remove").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "getById").resolves(allProductsResponse[0]);

      const result = await productsService.remove(
        allProductsResponse[0].id
      );
      expect(result.type).to.equal(null);
    });

    it("remove - NOT_FOUND - Product not found", async function () {
      sinon.stub(productsModel, "getById").resolves(undefined);
      sinon.stub(productsModel, "remove").resolves(undefined);

      const result = await productsService.remove(invalidId);
      expect(result.type).to.equal("NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  afterEach(sinon.restore);
});
