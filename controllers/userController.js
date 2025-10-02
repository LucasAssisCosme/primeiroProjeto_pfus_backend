//Path tem acesso a tudo, que ele vai usar para saber as pastas e arquivos do projeto 
const path = require("path")

//Importa tudo que tem no model 
const userModel = require("../models/userModel")
const { json } = require("stream/consumers")

module.exports = {
    //Responde a requisição mostrando a visualização da tela de login 
    formLogin : (req, res) => {
        res.status(200)
        res.render("login", { titulo: "login"})
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
    },
    //Crud
    //Responde a requisição mostrando a visualização da tela de cadastro
    formCadastro: (req,res) => {
      res.render("Entrando")
    },
    //FUnção para levar dados preenchidos para o model realizar o cadastro
    salvarUsuario: (req,res) => {
      const {usuario, email, senha} = req.body
      userModel.salvar({usuario, email, senha})
      res.render("cadastroConfirmado")
    },
    // R
    //Função Mostrar os usuarios
    listarUsuarios: (req,res) => {
      const usuarios = userModel.listarTodos()
      res.json(usuarios);
      //res.render("Usuarios",{ usuarios })
    },
    //Função Mostrar so um usuario
    //Req sempre vem primeiro e res depois
    buscarUsuario: (req,res) => {
      //Buscar id vindo de url como parametro
      const id = req.params.id

      //Guardar o usuario retornado, depois de buscar pelo model
      const usuario = userModel.buscarPorid(id)
      //se não achar, avisa que deu erro
      if(!usuario){
        return res.status(404).json({mensagem: "Usuário não encontrado"})
      }
      //se achar, devolve as informações via json
      res.json(usuario)
    },
    //Função para atualizar informações de um usuario
    atualizarUsuario: (req,res) => {
       //Buscar id vindo de url como parametro
      const id = req.params.id;
      //Buscar as novas informações para atualizar 
      const {usuario, email, senha} = req.body
       //Guarda o usuario atualizado numa variavel 
      const usuarioAtualizado = userModel.atualizar(id, {usuario, email, senha} )

      //se não achar, avisa que deu erro
      if(!usuarioAtualizado){
        return res.status(404).json({mensagem: "Usuário não encontrado"})
      }
      //se atualizar, manda uma mensagem dizendo que deu certo 
      res.json({mensagem: "Usuário foi atualizado"})
    },
    // Função para deletar um usuario 
    deletarUsuario: (req,res) => {
          //Buscar id vindo de url como parametro
      const id = req.params.id;

      const deletado = userModel.deletar(id)

       if(!deletado){
        return res.status(404).json({mensagem: "Usuário não encontrado"})
      }
      //se atualizar, manda uma mensagem dizendo que deu certo 
      res.json({mensagem: "Usuário foi deletado"})
    }

}
