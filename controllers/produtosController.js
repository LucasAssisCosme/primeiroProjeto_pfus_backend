const produtosModel = require("../models/produtosModel")
const { salvarProduto, listarProdutos, buscarProdutos, atualizarProdutos, deletarProduto } = require("./produtosController old")


module.exports = {
   produtoCadastro: (req,res) => {
   res.render("produtos/cadastroProduto", {titulo: "Cadastro"})
  },

  salvarProduto: (req,res) => {
         const {nome,descricao,categoria,preco, quantidade, imagemURL } = req.body

         produtosModel.guardar({nome,descricao,categoria,preco, quantidade, imagemURL }, (erro, novoProduto) => {
             if(erro){
              return res.status(500).render("produtos/erroProdutos", {
                titulo: "Erro",
                mensagem: "Erro ao cadastro produto"
              })
             }

              res.render("produtos/confirmaProdutos", {
              titulo: "Cadastro confirmado",
              tipo: "cadastro",
              novoProduto
            })
         })
  },

  //Ler
  listarProdutos: (req,res) => {

    produtosModel.listarGeral((erro, produtos) => {
                if(erro){
              return res.status(500).render("produtos/erroProdutos", {
                titulo: "Erro",
                mensagem: "Erro ao ver lista produtos"
              })
             }
             res.render("produtos/listaProdutos", {
              titulo: "lista produtos",
              produtos
             })
    })

  },
  buscarProdutos: (req,res) => {

    //Buscar id como parametro url
        const id = req.params.id
    
        //Acessar model para realizar busca
        produtosModel.irPorid(id, (erro,produto) => {
            //Se deu erro na busca, informar
            //ou se não achou usuario
              if(erro || !produto){
                return res.status(500).render("produtos/erroProduto", {
                  titulo: "erro",
                  mensagem: "Erro ao buscar produto"
                })
              }
    
              //Se achou usuario, renderiza pagina de ediçõa
              res.render("produtos/editarProdutos", {
                titulo: "Edição", 
               produto
              })
        })

  },
  //Atualizar
   atualizarProdutos: (req, res) => {
 
   const id = req.params.id;
   const{nome,descricao,categoria,preco, quantidade, imagemURL } = req.body;
 
   produtosModel.Renovar(id,{nome,descricao,categoria,preco, quantidade, imagemURL }, (erro, sucesso) => {
 
     if (erro || !sucesso) {
       return res.status(500).render("produtos/erroProdutos", {
         titulo: "erro",
         mensagem: "Erro ao atualizar produto"
       });
     }
 
     res.render("produtos/confirmaProdutos", {
       tipo: "edicao",
       titulo: "Edição confirmada"
     });
 
   });
 
 },
  //deletar
  deletarProduto: () => {
         const id = req.params.id
      
           //Acessar model e solicitar a exclusão do usuario
           produtosModel.deletar(id,(erro, sucesso) => {
      
                  if(erro || !sucesso){
                  return res.status(500).render("produtos/erroProdutos", {
                    titulo: "erro",
                    mensagem: "Erro ao deletar produto"
                  })
                }
      
                //Renderiza a tela de sucesso
                res.render("produtos/erroProdutos", {
                  tipo: "excluir",
                  titulo: "usuario deletado"
                })
           })
  }
}
