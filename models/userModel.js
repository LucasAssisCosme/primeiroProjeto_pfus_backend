//Importa json para servir como banco de dados
const db = require("../data/db.json")

//variavel para armazenar usuarios vindo do db
let listaUsuarios = db.usuarios

module.exports = {
    //Função para validar o login 
    login : (usuario, senha) => { 
        //Login
        // Busca a lista de usuarios, se tem aquele usuario com as informações que ele me passou
        let logado = listaUsuarios.find(
            (user) => {user.email === usuario && user.senha == senha}) || null

            return logado
     }
}