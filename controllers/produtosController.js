//Path tem acesso a tudo, que ele vai usar para saber as pastas e arquivos do projeto 
const path = require("path")

//Importa tudo que tem no model 
const produtosModel = require("../models/produtosModel")
const { json } = require("stream/consumers")


module.exports = {
    //Crud
    //Responde a requisição mostrando a visualização da tela de cadastro
    produtoCadastro: (req,res) => {
      res.render("produtos/cadastroProduto", {titulo:"Cadastro"})
    },
    //FUnção para levar dados preenchidos para o model realizar o cadastro
    salvarProduto: (req,res) => {
      const {nome, descricao, preco, quantidade, categoria, imagem} = req.body
      produtoNovo = produtosModel.guardar({nome, descricao, preco, quantidade, categoria, imagem})
      res.render("produtos/confirmaProdutos", {
        tipo: "cadastro",
        titulo: "Cadastro confirmado",
        produtoNovo
      })
    },
    // R
    //Função Mostrar os usuarios
    listarProdutos: (req,res) => {
      const osProdutos = produtosModel.listarGeral()
      res.render("produtos/listaProdutos",
        {osProdutos, titulo: "Lista de produtos"})
    },
    //Função Mostrar so um usuario
    //Req sempre vem primeiro e res depois
    buscarProdutos: (req,res) => {
      //Buscar id vindo de url como parametro
      const id = req.params.id

      //Guardar o usuario retornado, depois de buscar pelo model
      const aquelesProdutos = produtosModel.irPorid(id)
      //se não achar, avisa que deu erro
      if(!aquelesProdutos){
        return res.status(404).json({mensagem: "Produto não encontrado"})
      }
      //se achar, devolve as informações via json
      res.json(aquelesProdutos)
    },
    //Função para atualizar informações de um usuario
    atualizarProdutos: (req,res) => {
       //Buscar id vindo de url como parametro
      const id = req.params.id;
      //Buscar as novas informações para atualizar 
      const {nome, descricao, preco, quantidade, categoria} = req.body
       //Guarda o usuario atualizado numa variavel 
      const produtoAtualizado = produtosModel.Renovar(id, {nome, descricao, preco, quantidade, categoria})

      //se não achar, avisa que deu erro
      if(!produtoAtualizado){
        return res.status(404).json({mensagem: "Produto não encontrado"})
      }
      //se atualizar, manda uma mensagem dizendo que deu certo 
      res.json({mensagem: "Produto foi atualizado"})
    },
    // Função para deletar um usuario 
    deletarProduto: (req,res) => {
          //Buscar id vindo de url como parametro
      const id = req.params.id;

      const Apagado = produtosModel.deletar(id)

       if(!Apagado){
        return res.status(404).json({mensagem: "Produto não encontrado"})
      }
      //se atualizar, manda uma mensagem dizendo que deu certo 
      res.json({mensagem: "Produto foi deletado"})
    }

}