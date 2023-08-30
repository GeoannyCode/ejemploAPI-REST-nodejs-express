const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middleware/error.handler');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Servidor Node - Express</h1>')
});

routerApi(app)

//Implementar middleware:
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
