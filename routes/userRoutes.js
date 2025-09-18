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


//Criando a exportação desse arquivo 
module.exports = roteador
