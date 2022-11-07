const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const {
  allProductsResponse,
  rightProductBody,
  productUpdateBody,
  productUpdateResponse,
  productSearchNameResponse,
} = require("../mocks/productsMock");

describe("Unit tests - products.model", function () {
  it("getAll - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([allProductsResponse]);

    const result = await productsModel.getAll();
    expect(result).to.deep.equal(allProductsResponse);
  });

  it("getById - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([[allProductsResponse[0]]]);

    const result = await productsModel.getById(1);
    expect(result).to.deep.equal(allProductsResponse[0]);
  });

  it("addNewProduct - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await productsModel.insert(rightProductBody);
    expect(result).to.equal(1);
  });

  it("update - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([productUpdateResponse]);

    const result = await productsModel.update(productUpdateBody);
    expect(result).to.deep.equal(productUpdateResponse);
  });

  it("remove - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await productsModel.remove(allProductsResponse[0].id);
    expect(result).to.deep.equal({ affectedRows: 1 });
  });

  it("search - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([productSearchNameResponse]);

    const result = await productsModel.search("%martelo%");
    expect(result).to.deep.equal(productSearchNameResponse);
  });

  it("search - values empty - getAll - Successfully", async function () {
    sinon.stub(connection, "execute").resolves([allProductsResponse]);

    const result = await productsModel.search();
    expect(result).to.deep.equal(allProductsResponse);
  });

  afterEach(sinon.restore);
});
