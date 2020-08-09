const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "111111111",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Ferego Dinandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "111111111",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber -1 // O + na frente do subjectNumber garante 
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html") // O "render, diferente do sendFiles, usa as configurações do nunjucks"
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res){
    const data = req.query

    // Transforma as chaves em um array, logo se ele não tem dados, o array será vazio
    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        // Adiciona data ao vetor
        proffys.push(data)

        return res.redirect("/study")
    }

    return res.render("give-classes.html", { subjects, weekdays })
}

const express = require('express')
const server = express()
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