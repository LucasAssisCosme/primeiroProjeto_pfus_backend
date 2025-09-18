//Path tem acesso a tudo, que ele vai usar para saber as pastas e arquivos do projeto 
const path = require("path")

//Importa tudo que tem no model 
const userModel = require("../models/userModel")

module.exports = {
    //Responde a requisição mostrando a visualização da tela de login 
    formLogin : (req, res) => {
        res.status(200)
        res.render("login")
    },
    // Função para levar os dados preenchidos para model realizar o login
    loginUsuario  : (req, res) => {
        //Cria um objeto com as informações do body, retirado dos inputs
      const  { email, senha } = req.body 
      //Manda as informações do objeto para o model 
      const logado = userModel.login(email, senha)

      //Se não conseguiu logar, manda mensagem de erro
      if(!logado){
        return res.status(401).json({mensagem: "Usuario ou senha invalidos"})
      }
      //se conseguiu manda mensagem de confirmação 
      else{
        res.json({mensagem: "Login realizado "})
      }
    }
}
