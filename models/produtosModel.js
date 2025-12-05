
const conn = require("../config/conexao-banco")

module.exports = {
 guardar: ({nome, categoria, descricao, preco, quantidade, imagemURL}, callback) => {
           //Variavel que guarda consulta sql
         const sql = `INSERT INTO produtos(nome,categoria,descricao,preco,quantidade,imagemURL)
         VALUES(?, ?, ?, ?, ?,?)`

         const valores = [nome, categoria, descricao, preco, quantidade, imagemURL]

          conn.query( sql, valores, (erro, resultados) => {
          if(erro){
          return callback(erro, null)
        }

        const novoProduto = { id:resultados.insertId, nome, categoria, descricao, preco, quantidade, imagemURL }

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
      const sql = `SELECT * FROM  produtos WHERE id = ?`
            const valores = [ id ]
            conn.query(sql, valores, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, resultado[0] || null)
            })
     },

      Renovar: (id,{nome, categoria, descricao, preco, quantidade, imagemURL}, callback) => {

        const sql = `UPDATE produtos
      SET nome = ?, categoria = ?, decricao = ?, preco = ?, quantidade = ?, imagemURL = ?
      WHERE id = ?`
            const valor = [ nome,categoria,descricao,preco,quantidade,imagemURL,id ]
            conn.query(sql, valor, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, resultado.affectedRows > 0)
            })
        
      },
      deletar: (id, callback) => {
            //Variavel sql que guarda a consulta desejada
                 const sql = `DELETE FROM produtos WHERE id = ?`
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