const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded())

const getData = () => new Promise(resolve => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    resolve(JSON.parse(data))
  })
})
const setData = data => new Promise(resolve => {
  fs.writeFile('./data.json', JSON.stringify(data), "utf-8", _ => {
    resolve()
  })
})
const headerTpl = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Express CRUD</title>
  </head>
  <body>
`
const insertFrm = `
  <form action="/action" method="post">
    <fieldset><legend>추가</legend>
      <input type="hidden" name="action" value="insert" />
      <input type="text" name="content" size="40" autofocus />
      <button type="submit">전송</button>
    </fieldset>
  </form>
`
const updateFrm = `
  <form action="/action" method="post">
    <fieldset><legend>수정</legend>
      <input type="hidden" name="action" value="update" />
      <input type="text" name="idx" size="10" />
      <input type="text" name="content" size="40" />
      <button type="submit">전송</button>
    </fieldset>
  </form>
`
const deleteFrm = `
  <form action="/action" method="post">
    <fieldset><legend>삭제</legend>
      <input type="hidden" name="action" value="delete" />
      <input type="text" name="idx" size="10" />
      <button type="submit">전송</button>
    </fieldset>
  </form>
`
const footerTpl = `
  </body>
  </html>
` 
const listTpl = async () => {
  const listData = await getData()
  return listData.map((v, k) => `<p>${k} / ${v}</p>`).join('')
}

app.get('/', async (req, res) => {
  res.send(`
      ${headerTpl}
      ${insertFrm}
      ${updateFrm}
      ${deleteFrm}
      ${await listTpl()}
      ${footerTpl}
  `)
})

app.post('/action', async (req, res) => {
  const { action, content, idx } = req.body
  const listData = await getData()
  switch (action) {
    case 'insert' :
      listData.push(content)
    break;
    case 'update' :
      listData[idx] = content
    break;
    case 'delete' :
      listData.splice(idx, 1)
    break;
  }

  await setData(listData)
  res.send(`
    <script>alert('완료'); location.replace('/')</script>
  `)
})

app.listen(8080, _ => {
  console.log("Server : http://localhost:8080")
})