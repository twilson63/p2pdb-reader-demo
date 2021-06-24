const express = require('express')
const { list } = require('./db')

const index = `<!doctype html>
<html>
  <head>
    <title>p2p Db Demo</title>
    <script src="https://unpkg.com/htmx.org@1.4.1"></script>
    <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
    <script src="https://unpkg.com/hyperscript.org@0.8.1"></script>
  </head>
  <body>
    <h1>p2p Db Demo</h1>
    <h2>Movies</h2>
    <div>
      <h3>Current Movie List</h3>
      <div id="movies" hx-get="/movies" hx-trigger="load">
      </div>
    </div>
  </body>
</html>
`


const app = express()

app.get('/movies', async (req, res) => {
  const movies = await list()
  res.setHeader('content-type', 'text/html')
  res.send(
    movies.map(
      m => `<li>${m.title}</li>`
    ).join('')
  )
})

app.get('/', (req, res) => {
  res.setHeader('content-type', 'text/html')
  res.send(index)
})

app.listen(3000)