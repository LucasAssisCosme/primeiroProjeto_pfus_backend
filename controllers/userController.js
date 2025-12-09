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

  formCadastro: (req,res) => {
    //Reenderiza a pagina de cadastro
    res.render("usuarios/cadastroUsuarios", {titulo: "Cadastro"})
  },

  salvarUsuario: (req,res) => {
      //Criar objeto com as informações da view
      const {usuario,email,senha,tipo } = req.body
     
      //Manda as informações para o model
      userModel.salvar({usuario,email,senha,tipo }, (erro, novoUsuario) => {
            //se deu erro, renderiza a mensagem de erro mostrando a mensagem
            if(erro){
              return res.status(500).render("usuarios/erroUsuario", {
                titulo: "Erro",
                mensagem: "Erro ao salvar o usuario"
              })
            }

            //Se deu certo renderiza a pagina de confirmação 
            res.render("usuarios/confirmacaoUsuario", {
              titulo: "Cadastro confirmado",
              tipo: "cadastro",
              novoUsuario
            })
      })
  },

  //Ler
  listarUsuarios: (req, res) => {
      //Acessar o model e resgatar as informações
      userModel.listarTodos((erro, usuarios) => {
               if(erro){
              return res.status(500).render("usuarios/erroUsuario", {
                titulo: "Erro",
                mensagem: "Erro ao listar os usuarios"
              })
            }
            //Se deu certo, renderizar a pagina de lista usuarios
            res.render("usuarios/listaUsuarios", {
              titulo: "Lista de usuarios",
              usuarios
            })
      })
  },
  buscarUsuario: (req,res) => {
    //Buscar id como parametro url
    const id = req.params.id

    //Acessar model para realizar busca
    userModel.buscarPorid(id, (erro,usuario) => {
        //Se deu erro na busca, informar
        //ou se não achou usuario
          if(erro || !usuario){
            return res.status(500).render("usuarios/erroUsuario", {
              titulo: "erro",
              mensagem: "Erro ao buscar usuario"
            })
          }

          //Se achou usuario, renderiza pagina de ediçõa
          res.render("usuarios/editarUsuarios", {
            titulo: "Edição", 
            usuario
          })
    })
  },
  //Atualizar
  atualizarUsuario: (req, res) => {

  const id = req.params.id;
  const { usuario, email, senha, tipo } = req.body;

  userModel.atualizar(id, { usuario, email, senha, tipo }, (erro, atualizado) => {

    if (erro || !atualizado) {
      return res.status(500).render("usuarios/erroUsuario", {
        titulo: "erro",
        mensagem: "Erro ao atualizar usuario"
      });
    }

    res.render("usuarios/confirmacaoUsuario", {
      tipo: "edicao",
      titulo: "Edição confirmada",
      atualizado
    });

  });

},

  //deletar
  deletarUsuario: (req,res) => {
     const id = req.params.id

     //Acessar model e solicitar a exclusão do usuario
     userModel.deletar(id,(erro, sucesso) => {

            if(erro || !sucesso){
            return res.status(500).render("usuarios/erroUsuario", {
              titulo: "erro",
              mensagem: "Erro ao deletar usuario"
            })
          }

          const deletado = { usuario: "Selecionado"}
          //Renderiza a tela de sucesso
          res.render("usuarios/confirmacaoUsuario", {
            tipo: "excluir",
            titulo: "usuario deletado",
           deletado
          })
     })
  }
  
   

}