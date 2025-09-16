const express = require('express')

const app = express()

const port = 5000

const path = require('path')
const caminho = path.join(__dirname, "views")



app.get("/home", (req,res) => {
    res.status(200)
    res.sendFile(`${caminho}/index.html`)
})

app.get("/pokemon", (req, res) => {
    res.status(200)
    res.send("Arceus")
})

app.use((req, res) => {
    res.status(404)
    res.sendFile(`${caminho}/404.html`)
})

//Pegar a mensagem com o nome da rota
app.get("/", (req,res) => {
    res.status(200).send("Ola, parabens conseguiu")
})
//Coloca o servidor para funcionar
app.listen(port, () => {
    console.log(`Servidor funcionando em http://localhost:${port}`);
    
})




