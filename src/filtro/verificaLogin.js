const conexao = require("../conexao");
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');
const functions = require('../controladores/usuario');

const verificaLogin = async (req, res, next) => {
    
    const {executionResponse,showError} = functions
    const {authorization} = req.headers
    
    try {
        if(!authorization){
            return executionResponse(400,'Token não informado',res);
        }
    
        const token = authorization.replace('Bearer', '').trim();
        
        const {id} = jwt.verify(token, segredo);
        const query = 'select * from usuarios where id = $1';

        const { rows, rowCount} = await conexao.query(query,[id]);
        if(rowCount === 0 ){
            return executionResponse(404,'O usuário não foi encontrado',res);
        }

        const {senha, ...usuario} = rows[0];
        
        req.usuario = usuario;

        next();
    } catch (error) {
        if(error.message.includes('invalid') || error.message.includes('jwt')  || error.message.includes('Unexpected token') || error.message.includes('expired')){
            return executionResponse(401,"Para acessar este recurso um token de autenticação válido deve ser enviado.",res)
        }
        showError(error, res);
    }
}

module.exports = verificaLogin