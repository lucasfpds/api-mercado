const express = require('express');
const app = express();
const cors = require('cors');
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
)


const rotas = require('./rotas')
app.use(express.json());
app.use(rotas);

module.exports = app;