const express = require('express');

const errorMiddleware = require('./middlewares/error');
const routers = require('./routers');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(routers);

app.use(errorMiddleware);

module.exports = app;