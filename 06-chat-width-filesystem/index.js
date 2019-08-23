const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const {getData, setData} = require('./repository')

getData().then(data => {
  const list = data

  io.on('connection', socket => {
    socket.on('load', _ => {
      io.emit('msgLoad', list)
    })
    socket.on('msg', v => {
      io.emit('msgAdd', v)
      list.push(v)
      setData(list)
    })
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })

  http.listen(8080, _ => {
    console.log('Server : http://localhost:8080')
  })
})