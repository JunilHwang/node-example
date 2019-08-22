const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(8080, _ => { console.log("Server : http://localhost:8080") })