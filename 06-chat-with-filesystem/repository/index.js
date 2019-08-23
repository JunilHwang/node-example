const fs = require('fs')
const getData = _ => new Promise(resolve => {
  fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
    console.log(data)
    resolve(JSON.parse(data || '[]'))
  })
})
const setData = data => new Promise(resolve => {
  fs.writeFile(__dirname + '/data.json', JSON.stringify(data), 'utf-8', err => {
    resolve()
  })
})

module.exports = { getData, setData }