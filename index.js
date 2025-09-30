// diz  que precisa do expresse
const express = require('express')

//fala que o app é o express
const app = express()

//Diz qual a porta para ele acessa
const port = 5000

//Diz o caminho que vai seguir
const path = require('path')
//Junta o dirname com alguma palavra que exista dentro do doc
const caminho = path.join(__dirname, "views")

//Importações
// Importação roda dos usuarios 
const userRouters = require("./routes/userRoutes")
const produtosRoutes = require("./routes/produtosRoutes")

// interpretador de jason , para tratar as informações do body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Cria uma rota principal para as sub rotas de usuario 
//useRoutes diz as rotas possiveis para ele usar
app.use("/usuarios", userRouters)
app.use("/produtos", produtosRoutes)

//Definido o ejs como templante engine
app.set('view engine', 'ejs')

// Definindo 'Atalho' onde buscar as views
app.set("views", path.join(__dirname, "views"))

//Manda a pessoa para o index.ejs com /home
app.get("/home", (req,res) => {
    res.status(200)
    res.render("index", { titulo: "Pagina inicial"})
})
//Rota inicial do projeto
app.get("/", (req,res) => {
    res.status(200).render("index", { titulo: "Pagina inicial"})
})
// caso digite uma rota que não existe, leva para 404.ejs
app.use((req, res) => {
    res.status(404)
    res.render("404", { titulo: "Pagina de erro"})
})

//Coloca o servidor para funcionar
app.listen(port, () => {
    console.log(`Servidor funcionando em http://localhost:${port}`);
    
})




