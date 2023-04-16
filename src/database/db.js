// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  // criar uma tabela se não existir
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      image TEXT,
      address TEXT,
      number TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  // // Insetir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     name,
  //     image,
  //     address,
  //     number,
  //     state,
  //     city,
  //     items
  //   ) VALUES (
  //     ?, ?, ?, ?, ?, ?, ?
  //   );
  // `
  // const values = [
  //   "Papersider",
  //   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  //   "Guilherme Gemballa, Jardim América",
  //   "Nº 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Papeis e Papelão",
  // ]

  // db.run(query, values, function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log("Cadastrado com sucesso!")
  //   console.log(this)
  // })

  // // Consultar os dados da tabela
  // db.all("SELECT * FROM places", function (err, rows) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log(rows)
  // })

  // Deletar um dado da tabela
  // db.run("DELETE FROM places WHERE id = ?", [1], function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log("Registro deletado com sucesso!")
  // })
})

module.exports = db
