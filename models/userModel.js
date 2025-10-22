//Importa json para servir como banco de dados
const db = require("../data/db.json")

//variavel para armazenar usuarios vindo do db
let listaUsuarios = db.usuarios

module.exports = {
    //Função para validar o login 
    login : (email, senha) => { 
        //Login
        // Busca a lista de usuarios, se tem aquele usuario com as informações que ele me passou
        let logado = listaUsuarios.find(
            (user) => user.email === email && user.senha == senha) || null

            return logado
     },
     //Crud
     // Função para cadastro o novo usuario 
     //Ta em chaves por ser um objeto
     salvar: ({ usuario, email, senha, tipo}) => {
          const novoUsuario = {
               id: listaUsuarios.length + 1,
               usuario,
               email,
               senha,
               tipo
          }
          listaUsuarios.push(novoUsuario)
          console.log("Novo usuario salvo: ", novoUsuario);
          return novoUsuario
          
     },
     
     //Busca todos os usuarios pelo banco
     listarTodos: () => {
        return listaUsuarios
     },
     //Buscar usuario especifico pelo banco
     buscarPorid: (id) => {
      return listaUsuarios.find((user) => user.id == id || null)
     },

      atualizar: (id, {usuario, email, senha, tipo} ) => {
        //Busca na lista de usuarios, um usuario com aquele id especifico, se achar, pega o index dele e guarda na variavel index
           const index = listaUsuarios.findIndex((user) => user.id == id)
           //se não achar significa que um usuario com aquele index não existe
           if(index === -1)  return null 
           //se achar subistuir as informações que estavam nele, pelas novas enviadas
           listaUsuarios[index] = {
            ...listaUsuarios[index],
            usuario: usuario || listaUsuarios[index].usuario,
            email: email || listaUsuarios[index].email,
            senha: senha || listaUsuarios[index].senha,
            tipo: tipo || listaUsuarios[index].tipo
           }
           //Retorna usuario atualizado 
           return listaUsuarios[index]
      },
      deletar: (id) => {
           const index = listaUsuarios.findIndex((user) => user.id == id)
           if(index === -1) return false
           listaUsuarios.splice(index,1);
           return true
      }
    }