const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(
  express.urlencoded({
    extended: true,
  })
)

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: false,
})

// configurar caminhos da minha aplicação
server.get("/", (req, res) => {
  return res.render("index.njk")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.njk")
})

server.post("/save-point", (req, res) => {
  const { name, image, address, number, city, state, items } = req.body

  const query = `
    INSERT INTO places (
      name,
      image,
      address,
      number,
      city,
      state,
      items
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?
    )
  `

  const values = [name, image, address, number, city, state, items]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro!")
    }

    return res.render("create-point.njk", { saved: true })
  })
})

server.get("/search-results", (req, res) => {
  const search = req.query.search

  db.all(
    `SELECT * FROM places WHERE city LIKE '%${search}%'`,
    function (err, rows) {
      if (err) {
        return console.log(err)
      }

      const total = rows.length

      return res.render("search-results.njk", {
        places: rows,
        total_places: total,
      })
    }
  )
})

// ligar o servidor
server.listen(3000)
