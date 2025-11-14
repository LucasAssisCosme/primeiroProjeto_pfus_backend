//Path tem acesso a tudo, que ele vai usar para saber as pastas e arquivos do projeto 
const path = require("path")

//Importa tudo que tem no model 
const userModel = require("../models/userModel")
const { json } = require("stream/consumers")

module.exports = {
  //Responde a requisição mostrando a visualização da tela de login 
  formLogin: (req, res) => {
    res.status(200)
    res.render("login", { titulo: "login" })
  },
  // Função para levar os dados preenchidos para model realizar o login
  loginUsuario: (req, res) => {
    //Cria um objeto com as informações do body, retirado dos inputs
    const { email, senha } = req.body
    //Manda as informações do objeto para o model 
    userModel.login(email, senha, (erro, logado) => {
      if (erro) {
        res.status(401)
        return res.render("login", { titulo: "Login errado", erro: "erro no servidor" })
      }


      //Se não conseguiu logar, manda mensagem de erro
      if (!logado) {
        res.status(401)
        res.render("login", { titulo: "Login errado", erro: "Email ou senha inválidos" })
      }
      //se conseguiu manda mensagem de confirmação 
      else {
        res.status(200)
        res.render("index", { titulo: "Bem vindo", usuario: logado.nome })
      }
    })
  },
  //Crud
  //Responde a requisição mostrando a visualização da tela de cadastro
  formCadastro: (req, res) => {
    res.render("usuarios/cadastroUsuarios", { titulo: "Cadastro" })
  },
  //FUnção para levar dados preenchidos para o model realizar o cadastro
  salvarUsuario: (req, res) => {
    const { usuario, email, senha, tipo } = req.body
    userModel.salvar({ usuario, email, senha, tipo }, (erro, usuarioNovo) => {

      if(erro){
        return res.render("usuarios/erroUsuario", {
          titulo: "Erro",
          erro: "Erro ao salvar usuário"
        })
      }

    res.render("usuarios/confirmacaoUsuario", {
      tipo: "cadastro",
      titulo: "Cadastro confirmado",
      usuarioNovo
    })
    })
  },
  // R
  //Função Mostrar os usuarios
  listarUsuarios: (req, res) => {
    // Guarda a lista de usuarios, que o model mandou depois que buscou no banco
    const usuarios = userModel.listarTodos()
    //mostra a tela de lista para pessoa, mandando a variavel como parametro 
    res.render("usuarios/listaUsuarios",
      { usuarios, titulo: "Lista de usuarios" })

  },
  //Função Mostrar so um usuario
  //Req sempre vem primeiro e res depois
  buscarUsuario: (req, res) => {
    //Buscar id vindo de url como parametro
    const id = req.params.id

    //Guardar o usuario retornado, depois de buscar pelo model
    const usuario = userModel.buscarPorid(id)
    //se não achar, avisa que deu erro
    if (!usuario) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Usuário não encontrado"
      })

    }
    //se achar, devolve as informações via json
    res.render("usuarios/editarUsuarios", {
      titulo: "Editar",
      usuario
    })
  },

  //Função para atualizar informações de um usuario
  atualizarUsuario: (req, res) => {
    //Buscar id vindo de url como parametro
    const id = req.params.id;
    //Buscar as novas informações para atualizar 
    const { usuario, email, senha, tipo } = req.body
    //Guarda o usuario atualizado numa variavel 
    const usuarioAtualizado = userModel.atualizar(id, { usuario, email, senha, tipo })

    //se não achar, avisa que deu erro
    if (!usuarioAtualizado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Não foi possivel atuzalizar"
      })
    }
    //se atualizar, manda uma mensagem dizendo que deu certo 
    res.render("usuarios/confirmacaoUsuario", {
      titulo: "Edição confirmada",
      tipo: "edicao",
      usuarioAtualizado
    })
  },
  // Função para deletar um usuario 
  deletarUsuario: (req, res) => {
    //Buscar id vindo de url como parametro
    const id = req.params.id;

    const deletado = userModel.deletar(id)

    if (!deletado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Não foi possivel deletar"
      })
    }
    //se atualizar, manda uma mensagem dizendo que deu certo 
    res.render("usuarios/confirmacaoUsuario", {
      titulo: "Deletação confirmada",
      tipo: "deletar",
      deletado

    })
  }

}
