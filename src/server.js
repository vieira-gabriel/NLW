const express = require('express')
const server = express()
const { pageLanding, pageStudy, pageGiveClasses } = require('./pages')

const nunjucks = require('nunjucks')

// Configurando nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.use(express.static("public")) // Torna a pasta "public" a raiz onde __dirname procurará
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)