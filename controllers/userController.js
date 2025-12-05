// Importa tudo que tem no model
const userModel = require("../models/userModel");
const { formCadastro, salvarUsuario, listarUsuarios, buscarUsuario, atualizarUsuario, deletarUsuario } = require("./userController old");


module.exports = {
  // LOGIN
  // REsponde a requisição mostrando a visualização da tela de login
  formLogin: (req, res) => {
    res.render("login", { titulo: "Login" });
  },


  // Função para levar os dados preenchidos para o model realizar o login
  loginUsuario: (req, res) => {
    // Cria um objeto com as informações do body, retirados dos inputs
    const { email, senha } = req.body;
    // Manda as informações do objeto para o model
    userModel.login(email, senha, (erro, logado) => {
      if (erro) {
        return res.render("login", {
          titulo: "Login errado",
          erro: "erro no servidor",
        });
      }
      // Se não conseguiu logar, manda uma mensagem de erro
      if (!logado) {
        res.render("login", {
          titulo: "Login errado",
          erro: "Email ou senha inválidos",
        });
      }
      // Se conseguiu manda uma mensagem de confirmação
      else {
        res.status(200);
        res.render("index", { titulo: "Bem vindo", usuario: logado.nome });
      }
    });
  },

  //Crud

  //Criar

  formCadastro: () => {

  },

  salvarUsuario: () => {

  },

  //Ler
  listarUsuarios: () => {

  },
  buscarUsuario: () => {

  },
  //Atualizar
  atualizarUsuario: () => {

  },
  //deletar
  deletarUsuario: () => {

  }
  
   

}