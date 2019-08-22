const express = require('express')
const app = express()

const list = []

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/list', (req, res) => {
  res.send({
    success: true,
    data: list
  })
})
app.post('/list', (req, res) => {
  list.push(req.body.content)
  res.send({ success: true })
})
app.put('/list/:idx', (req, res) => {
  list[req.params.idx] = req.body.content
  res.send({ success: true })
})
app.delete('/list/:idx', (req, res) => {
  list.splice(req.params.idx, 1)
  res.send({ success: true })
})
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(8080, _ => { console.log("Server : http://localhost:8080") })