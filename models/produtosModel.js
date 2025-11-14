
const db = require("../data/db.json")


let listaProdutos = db.produtos 

const conn = require("../config/conexao-banco")

module.exports = {
 guardar: ({nome,  descricao, preco, quantidade, categoria, imagem}, callback) => {
           //Variavel que guarda consulta sql
         const sql = `INSERT INTO produtos(nome,descricao,preco,quantidade,categoria,imagem)
         VALUES(?, ?, ?, ?, ?,?)`

         const valores = [nome,  descricao, preco, quantidade, categoria, imagem]

          conn.query( sql, valores, (erro, resultados) => {
          if(erro){
          return callback(erro, null)
        }

        const novoProduto = { id:resultados.insertId, nome,descricao,preco,quantidade,categoria,imagem }

        callback(null, novoProduto)
     } )
     },
     //Busca todos os usuarios pelo banco
     listarGeral: () => {
        
     },
     //Buscar usuario especifico pelo banco
     irPorid: (id) => {
     },

      Renovar: (id,{nome, descricao, preco, quantidade, categoria, imagem}) => {
        
      },
      deletar: (id) => {
           
      }
    }