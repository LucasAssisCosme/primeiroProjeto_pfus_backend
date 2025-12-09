//Importa conexão banco de dados
const conn = require("../config/conexao-banco")


module.exports = {
     
   //Login
   login: (email, senha, callback) => {
    //Criar variavel sql que guarda a consulta
      const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`

      // Valores que serão utilizados na consulta
      const valores = [email, senha]

      //Executar o comando no banco
      conn.query(sql, valores, (erro,resultados) => {
             //Lidar com erro 
             if(erro){
              return callback( erro, null)
             }

             // Retorna resultado para o controller
             callback(null, resultados[0] || null)
      })
   },


   //Criar = CREATE
   salvar: ({usuario, email, senha, tipo} ,callback ) => {
        //Variavel sql que guarda a consulta desejada
        const sql = `INSERT INTO usuarios (usuario,email,senha,tipo) VALUES(?,?,?,?) `

        // Valores que serão utilizados na consulta
        const valores = [usuario,email,senha,tipo]

        conn.query(sql, valores, (erro, resultado) => {
              if(erro){
              return callback( erro, null)
             }
             const novoUsuario = {id: resultado.insertId, usuario, email, senha, tipo}

             callback(null, novoUsuario )
        })
   },

   //Listar = READ
   listarTodos: (callback) => {
     //Variavel sql que guarda a consulta desejada
      const sql = `SELECT * FROM usuarios`

        //Executar o comando no banco
        conn.query(sql, (erro, resultados) => {
        if(erro){
          return callback(erro, null)
        }
        callback(null, resultados)
        })
   },

   //Atualizar = UPDATE
   //Buscar usuario
   buscarPorid: (id, callback) => {
            const sql = `SELECT * FROM  usuarios WHERE id = ?`
            const valor = [ id ]
            conn.query(sql, valor, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, resultado[0] || null)
            })
            
   },
   //Atualizar informações
   atualizar: (id,{usuario,email,senha,tipo}, callback) => {
        //Variavel sql que guarda a consulta desejada
    
      //criar um objeto para retronar para o usuario 
     
    
        const sql = `UPDATE usuarios
      SET usuario = ?, email = ?, senha = ?, tipo = ?
      WHERE id = ?
      `
     //Variavel com informação oculta/misteriosa
            const valores = [usuario, email,senha,tipo, id]

             const atualizado = {
          usuario: valores[0] 
      }
             //Executar o comando no banco
            conn.query(sql, valores, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, atualizado)
            })

   },
   //Deletar = DELETAR
   deletar: (id, callback) => {
            //Variavel sql que guarda a consulta desejada
                 const sql = `DELETE FROM usuarios WHERE id = ?`
                 //Variavel com informação oculta/misteriosa
                 const valor = [id]                  
            
            //Executar o comando no banco
            conn.query( sql, valor, (erro, resultado) => {
                   if(erro){
                    return callback(erro, null)
                   }
                   callback(null, resultado.affectedRows > 0)
            })
   }
}