const express = require('express')
const app = express()

// middle ware register
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

// routing
app.use('/list', require('./routes/list'))
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(8080, _ => { console.log("Server : http://localhost:8080") })