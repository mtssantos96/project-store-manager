/*-------------------------- Products --------------------------*/
const wrongProductBody = {};

const productId = { id: 1 }

const wrongSizeProductBody = { id: 1, name: "Prod" };

const invalidId = 99;

const rightProductBody = { name: "Produto1" };

const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const productCreateResponse = { id: 4, name: "Produto1" };

const productUpdateBody = { name: "Machado do Thor Stormbreaker" };

const productUpdateResponse = { id: 1, name: "Machado do Thor Stormbreaker" };

const productUpdateInvalideId = { id: 99, name: "Machado do Thor Stormbreaker" };

const productUpdateExistsNameBody = { name: "Martelo de Thor" };

const productSearchNameResponse = [{ id: 1, name: "Martelo de Thor" }];

module.exports = {
  wrongSizeProductBody,
  wrongProductBody,
  invalidId,
  rightProductBody,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateResponse,
  productUpdateExistsNameBody,
  productSearchNameResponse,
  productUpdateInvalideId,
  productId,
};
