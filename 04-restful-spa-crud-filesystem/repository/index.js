const fs = require('fs')
const getData = () => new Promise(resolve => {
  fs.readFile(__dirname + '/data.json', 'utf-8', (err, data) => {
    resolve(JSON.parse(data))
  })
})
const setData = data => new Promise(resolve => {
  fs.writeFile(__dirname + '/data.json', JSON.stringify(data), 'utf-8', _ => {
    resolve()
  })
})

module.exports = { getData, setData }