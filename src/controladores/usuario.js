const conexao = require('../conexao')
const bcrypt = require("bcrypt");

function showError(error, res){
    console.log(error.message);
    return res.status(400).json({
        "mensagem": error.message
    });  
}

function executionResponse(statusCode,message,res){
    return res.status(statusCode).json({
        "mensagem": message
    });
}

const findUser = async (email) => {
    const verifyEmail = 'select * from usuarios where email = $1';
    return await conexao.query(verifyEmail, [email]);    
}



const registerUser = async (req, res) => {
    const {nome,email,senha,nome_loja} = req.body;
    
    try {
        if(!nome || !email || !senha || !nome_loja){
            return executionResponse(400, "Todos os campos devem estar preenchidos", res)
        }

        const {rowCount} = await findUser(email);

        if(rowCount > 0){
            return executionResponse(400, "Este email já está cadastrado", res)
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);
  
        const query = 'insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)';
        const registeredUser = await conexao.query(query, [nome, nome_loja, email, encryptedPassword]);

        if(registeredUser.rowCount === 0){
            return executionResponse(400,'Não foi possível cadastrar o usuário',res);
        }
        
        return executionResponse(201,'',res);
    } catch (error) {
        showError(error, res);
    }
}


const userData = async (req, res) => {
    const {usuario} = req;
    
    try {
        return res.status(200).json(usuario);
    } catch (error) {
        showError(error, res);        
    }
}

const updateUser = async (req, res) => {
    const {usuario} = req;
    const {nome,email,senha,nome_loja} = req.body;

    try {
        
        if(!nome || !email || !senha || !nome_loja){
            return executionResponse(400, "Todos os campos devem estar preenchidos", res)
        }


        const {rowCount} = await findUser(email);

        if(rowCount > 0){
            return executionResponse(400, "Este email já está cadastrado", res)
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);
  
        const query = 'update usuarios set nome=$1, nome_loja=$2, email=$3, senha=$4 where id = $5';
        const updatedUser = await conexao.query(query, [nome, nome_loja, email, encryptedPassword, usuario.id]);

        if(updatedUser.rowCount === 0){
            return executionResponse(400,'Não foi possível cadastrar o usuário',res);
        }
        
        return executionResponse(204,'',res);
    } catch (error) {
        showError(error, res);        
    }

}


module.exports = {
    registerUser,
    showError,
    executionResponse,
    findUser,
    userData,
    updateUser
}