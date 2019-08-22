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

module.exports = { headerTpl, insertFrm, updateFrm, deleteFrm, footerTpl }