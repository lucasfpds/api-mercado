const express = require("express");
const usuario = require("./controladores/usuario");
const login = require("./controladores/login");
const verificaLogin = require("./filtro/verificaLogin");
const produtos = require('./controladores/produtos');
const swaggerUi = require('swagger-ui-express');

const rotas = express();
rotas.use("/docs", swaggerUi.serve, swaggerUi.setup(require("../swagger.json")))


// CADASTRAR USUARIO
rotas.post("/usuario", usuario.registerUser);

// LOGIN DO USUARIO
rotas.post("/login", login.userLogin);

// VERIFICAÇÃO DE LOGIN E REGISTRO DE TOKEN
rotas.use(verificaLogin)

// PERFIL DO USUARIO
rotas.get("/usuario", usuario.userData);
rotas.put("/usuario", usuario.updateUser);

//PRODUTOS
rotas.post("/produtos", produtos.registerProduct);
rotas.get("/produtos", produtos.findAllProducts);
rotas.get("/produtos/:id", produtos.findProduct);
rotas.put("/produtos/:id", produtos.updateProduct);
rotas.delete("/produtos/:id", produtos.deleteProduct);


module.exports = rotas;
