require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const pessoaRota = require('./rotas/person'); // Rota do controlador pessoa
const authRota = require('./rotas/auth'); // Rota do controlador auth
const userRota = require('./rotas/user'); // Rota do controlador user
const sequelize = require('./db'); // Ligação à base de dados

app.use('/person', pessoaRota); // Utiliza a rota de pessoas
app.use('/auth', authRota); // Utiliza a rota da autenticação
app.use('/user', userRota); // Utiliza a rota do utilizador

// Sincronizar o modelo Sequelize com a base de dados
sequelize.sync().then(() => {
  console.log('Conexão com a base de dados estabelecida com sucesso!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('Erro ao estabelecer conexão com a base de dados:', error);
});

