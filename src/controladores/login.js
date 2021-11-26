
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');
const functions = require('./usuario');



const userLogin = async (req, res) => {
    const {executionResponse,showError,findUser} = functions
    const { email, senha } = req.body;

    console.log(email, senha) 
    try {        
        if(!email || !senha){
            return executionResponse(400, "Todos os campos devem estar preenchidos", res)
        }

        const userFound = await findUser(email);

        if(userFound.rowCount === 0){
            return executionResponse(404, "Nenhum Usuario foi encontrado", res)
        }
        
        const verifiedPassword = await bcrypt.compare(senha, userFound.rows[0].senha);
        
        
        if (
            userFound.rows[0].email !== email ||
            !verifiedPassword
            ) {
                return executionResponse(404,'Email ou senha incorretos',res);
            }
            
        
        const token = await jwt.sign({id: userFound.rows[0].id}, segredo, {expiresIn: '6h'});

        return res.status(201).json({ token });

    } catch (error) {
       showError(error, res);        
    }
}

module.exports = {userLogin}