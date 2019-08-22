const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())

const listData = []

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Express CRUD</title>
    </head>
    <body>
      <form action="/action" method="post">
        <fieldset><legend>추가</legend>
          <input type="hidden" name="action" value="insert" />
          <input type="text" name="content" size="40" autofocus />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      <form action="/action" method="post">
        <fieldset><legend>수정</legend>
          <input type="hidden" name="action" value="update" />
          <input type="text" name="idx" size="10" />
          <input type="text" name="content" size="40" />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      <form action="/action" method="post">
        <fieldset><legend>삭제</legend>
          <input type="hidden" name="action" value="delete" />
          <input type="text" name="idx" size="10" />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      ${listData.map((v, k) => `<p>${k} / ${v}</p>`).join('')}
    </body>
    </html>
  `)
})

app.post('/action', (req, res) => {
  const { action, content, idx } = req.body
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
  res.send(`
    <script>alert('완료'); location.replace('/')</script>
  `)
})

app.listen(8080, _ => {
  console.log("Server : http://localhost:8080")
})