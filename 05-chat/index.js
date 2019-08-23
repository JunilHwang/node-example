const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')()

io.on('connection', socket => {
  socket.on('msg', v => {
    console.log(V)
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

http.listen(8080, _ => {
  console.log('Server : http://localhost:8080')
})