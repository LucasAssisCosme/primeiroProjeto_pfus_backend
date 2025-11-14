//Importa json para servir como banco de dados
const db = require("../data/db.json")

//variavel para armazenar usuarios vindo do db
let listaUsuarios = db.usuarios


//área nova com conexão ao banco de dados
//Variavel que importa a conexão com banco
const conn = require("../config/conexao-banco")


module.exports = {
    //Função para validar o login 
    login : (email, senha, callback ) => { 
        //Login
        // Busca a lista de usuarios, se tem aquele usuario com as informações que ele me passou
       
        //VAriavel que guarda consulta sql
         const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`

     //Valores para consulta sql 
     const valores = [ email,senha ]
     //FUnção para executar o sql, fazendo a requisição pro banco
     conn.query( sql, valores, (erro, resultados) => {
     // se deu algum erro, retorne o erro para o controller
          if(erro){
               return callback(erro, null)
          }
          //Se deu certo, retorna o usuario se achou ou null se não achou
          callback(null, resultados[0] || null)
     } )
     },
     //Crud
     // Função para cadastro o novo usuario 
     //Ta em chaves por ser um objeto
     salvar: ({ usuario, email, senha, tipo}, callback) => {
         //Variavel que guarda consulta sql
         const sql = `INSERT INTO usuarios(usuario,email,senha,tipo)
         VALUES(?, ?, ?, ?)`

         //Valores para consulta sql 
     const valores = [ usuario,email,senha,tipo ]

     conn.query( sql, valores, (erro, resultados) => {
        if(erro){
          return callback(erro, null)
        }
        //variavel que armazena as informações que foram adcionados no banco
        const novoUsuario = { id:resultados.insertId, usuario,email,senha,tipo }
        
     //Função que retorna pr controller
        callback(null, novoUsuario)
     } )
     },
     
     //Busca todos os usuarios pelo banco
     listarTodos: () => {
     },
     //Buscar usuario especifico pelo banco
     buscarPorid: (id) => {
     
     },

      atualizar: (id, {usuario, email, senha, tipo} ) => {
        
      },
      deletar: (id) => {
           
    }
};