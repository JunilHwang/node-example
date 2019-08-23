const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const {getData, setData} = require('./repository')

io.on('connection', socket => {
  socket.on('load', async _ => {
    const list = await getData()
    io.emit('msgLoad', list)
  })
  socket.on('msg', async v => {
    io.emit('msgAdd', v)
    const list = await getData()
    list.push(v)
    setData(list)
  })
})

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

http.listen(8080, _ => {
  console.log('Server : http://localhost:8080')
})