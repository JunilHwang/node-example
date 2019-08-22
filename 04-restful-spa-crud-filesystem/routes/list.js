const express = require('express')
const router = express.Router()
const {getData, setData} = require('../repository')

getData().then(data => {
  let list = data
  router.get('/', async (req, res) => {
    res.send({
      success: true,
      data: list
    })
  })
  router.post('/', async (req, res) => {
    await setData((list.push(req.body.content), list))
    res.send({ success: true })
  })
  router.put('/:idx', async (req, res) => {
    await setData((list[req.params.idx] = req.body.content, list))
    res.send({ success: true })
  })
  router.delete('/:idx', async (req, res) => {
    await setData((list.splice(req.params.idx, 1), list))
    res.send({ success: true })
  })
})
module.exports = router