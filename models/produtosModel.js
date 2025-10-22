const db = require("../data/db.json")
const { deletar } = require("./userModel")

let listaProdutos = db.produtos

module.exports = {
 guardar: ({nome,  descricao, preco, quantidade, categoria, imagem}) => {
          const novoProduto = {
               id: listaProdutos.length + 1,
               nome,
              descricao,
               preco,
               quantidade,
               categoria,
               imagem 
               
          }
         listaProdutos.push(novoProduto)
          console.log("Novo produto salvo: ", novoProduto);
          return novoProduto
          
     },
     //Busca todos os usuarios pelo banco
     listarGeral: () => {
        return listaProdutos
     },
     //Buscar usuario especifico pelo banco
     irPorid: (id) => {
      return listaProdutos.find((produtos) => produtos.id == id || null)
     },

      Renovar: (id,{nome, descricao, preco, quantidade, categoria, imagem}) => {
        //Busca na lista de usuarios, um usuario com aquele id especifico, se achar, pega o index dele e guarda na variavel index
           const index = listaProdutos.findIndex((produtos) => produtos.id == id)
           //se não achar significa que um usuario com aquele index não existe
           if(index === -1)  return null 
           //se achar subistuir as informações que estavam nele, pelas novas enviadas
           listaProdutos[index] = {
            ...listaProdutos[index],
            descricao : descricao || listaProdutos[index].descricao,
            nome: nome || listaProdutos[index].nome,
            preco: preco || listaProdutos[index].preco,
            quantidade: quantidade || listaProdutos[index].quantidade,
            categoria : categoria || listaProdutos[index].categoria,
            imagem : imagem|| listaProdutos[index].categoria,
           }
           //Retorna usuario atualizado 
           return listaProdutos[index]
      },
      deletar: (id) => {
           const index = listaProdutos.findIndex((produto) => produto.id == id)
           if(index === -1) return false
           listaProdutos.splice(index,1);
           return true
      }
    }