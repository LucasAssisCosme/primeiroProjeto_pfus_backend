//Importação ((pegar)) do modulo express
const express = require("express")
//criando uma variavel para gerenciar as rotas dos usuarios
const roteador = express.Router()

//Importando tudo que tem no arquivo de controller do usuario 
const produtosController = require("../controllers/produtosController")


//Crud

//C = Criar novo usuario 
//Rota para solicitar a página de cadastro
roteador.get("/cadastrar", produtosController.produtoCadastro)
//Rota para enviar dados da página de cadastro
roteador.post("/cadastrar", produtosController.salvarProduto)


//R = Obter informações de usuarios
//Retorna as informações de todos os usuarios
roteador.get("/", produtosController.listarProdutos)
//Retorna as informações de um usuário apenas
roteador.get("/:id", produtosController.buscarProdutos)

// U = Atualizar um usuario

roteador.post("/:id", produtosController.atualizarProdutos)

// D = Deletar um usuario

roteador.get("/:id", produtosController.deletarProduto)



//Criando a exportação desse arquivo 
module.exports = roteador