const express = require('express')
const router = express.Router()
const { headerTpl, insertFrm, updateFrm, deleteFrm, footerTpl, listTpl } = require('./template')
const { getData, setData } = require('./repository')

router.get('/', async (req, res) => {
  const listData = await getData()
  res.send(`
      ${headerTpl}
      ${insertFrm}
      ${updateFrm}
      ${deleteFrm}
      ${listData.map((v, k) => `<p>${k} / ${v}</p>`).join('')}
      ${footerTpl}
  `)
})

router.post('/action', async (req, res) => {
  const { action, content, idx } = req.body
  const listData = await getData()
  switch (action) {
    case 'insert' : listData.push(content); break;
    case 'update' : listData[idx] = content; break;
    case 'delete' : listData.splice(idx, 1); break;
  }

  await setData(listData)
  res.send(`
    <script>alert('완료'); location.replace('/')</script>
  `)
})

module.exports = router