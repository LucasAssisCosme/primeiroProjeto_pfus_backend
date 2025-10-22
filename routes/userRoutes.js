//Importação ((pegar)) do modulo express
const express = require("express")
//criando uma variavel para gerenciar as rotas dos usuarios
const roteador = express.Router()

//Importando tudo que tem no arquivo de controller do usuario 
const userController = require("../controllers/userController")

//Login
//Rota para solicitar a página de login
roteador.get("/login", userController.formLogin)
//Rota para enviar dados da página de login
roteador.post("/login", userController.loginUsuario)

//Crud

//C = Criar novo usuario 
//Rota para solicitar a página de cadastro
roteador.get("/cadastrar", userController.formCadastro)
//Rota para enviar dados da página de cadastro
roteador.post("/cadastrar", userController.salvarUsuario)


//R = Obter informações de usuarios
//Retorna as informações de todos os usuarios
roteador.get("/", userController.listarUsuarios)
//Retorna as informações de um usuário apenas

roteador.get("/:id", userController.buscarUsuario)

// U = Atualizar um usuario

roteador.post("/:id", userController.atualizarUsuario)

// D = Deletar um usuario

roteador.get("/:id", userController.deletarUsuario)



//Criando a exportação desse arquivo 
module.exports = roteador
