const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {

    const data = {
        avatar_url: "https://avatars3.githubusercontent.com/u/19847794?s=460&u=f4cf6fb57198d776d29ac7304201be3cc0ccdbc4&v=4",
        name: "Henrique Buzin",
        role: "Instrutor - Rocketseat",
        description: 'Programador full-stack, focado em trazer o lehor ensino para iniciantes em programação. Colaborador da <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/HenriqueBuzin/" },
            { name: "Twitter", url: "https://twitter.com/henrique_buzin" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/henrique-buzin/" }
        ]
    }

    return res.render("about", { about: data})
})

server.get("/portifolio", function(req, res) {
    return res.render("portifolio", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        res.send("Video not found!")
    }

    res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})