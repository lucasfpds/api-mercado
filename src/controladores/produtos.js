const conexao = require('../conexao')
const bcrypt = require("bcrypt");
const usuarios = require('./usuario')

const { showError, executionResponse, findUser} = usuarios

const findAllProducts = async (req, res) =>{
    const {usuario} = req
    const {categoria} = req.query
    
    try {   
        if(!categoria){
            const query = 'select * from produtos where usuario_id = $1';
            const allProducts = await conexao.query(query, [usuario.id]);
            return res.status(200).json(allProducts.rows)
        } else {
            const query = 'select * from produtos where usuario_id = $1 and categoria = $2';
            const allProducts = await conexao.query(query, [usuario.id, categoria]);
            return res.status(200).json(allProducts.rows)
        }
        
    } catch (error) {
        showError(error, res);        
    }
}


const findProduct = async (req, res) =>{
    const {usuario} = req
    const id = Number(req.params.id)
    try {   
        
        const query = 'select * from produtos where id = $1';
        const findedProduct = await conexao.query(query, [id]);

        if(findedProduct.rowCount === 0){
            return executionResponse(404, `Não existe produto cadastrado com ID ${id}`, res)
        }

        const product = findedProduct.rows[0]

        if(usuario.id !== product.usuario_id){
            return executionResponse(403, "O usuário logado não tem permissão para acessar este produto.", res)
        }

        return res.status(200).json(product)

    } catch (error) {
        showError(error, res);        
    }
}

const registerProduct = async (req, res) => {
    const {usuario} = req
    const {nome, quantidade, categoria, preco, descricao, imagem} = req.body;

    try {

        if(!nome || !descricao ){
            return executionResponse(400, "Os campos nome, quantidade, preço e descrição devem estar preenchidos", res)
        }

        if(quantidade <= 0){
            return executionResponse(400, "A quantidade do produto deve ser maior que zero.", res)
        }
        if(preco <= 0){
            return executionResponse(400, "O preço do produto deve ser maior que zero.", res)
        }
        
        const query = 'insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';

        const registeredProduct = await conexao.query(query, [usuario.id, nome, quantidade, categoria, preco, descricao, imagem]);

        if(registeredProduct.rowCount === 0){
            return executionResponse(400,'Não foi possível cadastrar o produto',res);
        }
        
        return res.status(201).json()
    } catch (error) {
        showError(error, res);
    }
}

const updateProduct = async (req, res) => {
    const {nome, quantidade, categoria, preco, descricao, imagem} = req.body;
    const {usuario} = req
    const {id} = req.params
    
    try {   
        
        const query = 'select * from produtos where id = $1';
        const findedProduct = await conexao.query(query, [id]);

        if(findedProduct.rowCount === 0){
            return executionResponse(404, `Não existe produto cadastrado com ID ${id}`, res)
        }

        const product = findedProduct.rows[0]

        if(usuario.id !== product.usuario_id){
            return executionResponse(403, "O usuário logado não tem permissão para acessar este produto.", res)
        }

        if(!nome || !descricao ){
            return executionResponse(400, "Os campos nome, quantidade, preço e descrição devem estar preenchidos", res)
        }

        if(quantidade <= 0){
            return executionResponse(400, "A quantidade do produto deve ser maior que zero.", res)
        }

        if(preco <= 0){
            return executionResponse(400, "O preço do produto deve ser maior que zero.", res)
        }


        const queryUpdate = 'update produtos set  nome=$1, quantidade=$2, categoria=$3, preco=$4, descricao=$5, imagem=$6  where id = $7';

        const updatedProduct = await conexao.query(queryUpdate, [nome, quantidade, categoria, preco, descricao, imagem, id]);


        if(updatedProduct.rowCount === 0){
            return executionResponse(400,'Não foi possível atualizar o produto',res);
        }
        
        return executionResponse(204,'',res);

        } catch (error) {
            showError(error, res);
    }
}


const deleteProduct = async (req, res) =>{
    const {usuario} = req
    const id = Number(req.params.id)
    
    try {   
        
        const query = 'select * from produtos where id = $1';
        const findedProduct = await conexao.query(query, [id]);

        if(findedProduct.rowCount === 0){
            return executionResponse(404, `Não existe produto cadastrado com ID ${id}`, res)
        }

        const product = findedProduct.rows[0]

        if(usuario.id !== product.usuario_id){
            return executionResponse(403, "O usuário logado não tem permissão para acessar este produto.", res)
        }

        const queryDelete = 'delete from produtos where id = $1';

        const deleteProduct = await conexao.query(queryDelete, [id]);


        if(deleteProduct.rowCount === 0){
            return executionResponse(400,'Não foi possível Deletar o produto',res);
        }
        
        return executionResponse(204,'',res);

        } catch (error) {
            showError(error, res);
    }

}

    module.exports = {
        registerProduct,
        findAllProducts,
        findProduct,
        updateProduct,
        deleteProduct
    }
