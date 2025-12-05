
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
     //Busca todos os produtos pelo banco
     listarGeral: (callback) => {
       //Variavel sql que guarda a consulta desejada
          const sql = `SELECT * FROM produtos`

           //Executar o comando no banco
        conn.query(sql, (erro, resultados) => {
          if(erro){
            return callback(erro, null)
          }
          callback(null, resultados)
        })

     },
     //Buscar usuario especifico pelo banco
     irPorid: (id) => {
     },

      Renovar: (id,{nome, descricao, preco, quantidade, categoria, imagem}) => {
        
      },
      deletar: (id, callback) => {
            //Variavel sql que guarda a consulta desejada
                 const sql = `DELETE FROM usuarios WHERE id = ?`
                 const valor = [id]
             //Executar o comando no banco
             conn.query(sql, valor, (erro, resultado) => {
                          if(erro){
                            return callback(erro, null)
                          }
                          callback(null, resultado.affectedRows > 0)
             })
      }
    }