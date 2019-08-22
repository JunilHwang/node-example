/* DOM Selector */
const one = (ele, parent = document) => parent.querySelector(ele)
const all = (ele, parent = document) => parent.querySelectorAll(ele)

/* AJAX API */
const headers = { 'content-type': 'application/json'  }
const req = (url, type, data) => {
  const params = {
    method: type,
    headers: headers,
    body: data
  }
  return fetch(`/list/${url}`, params).then(res => res.json())
}
const getList = () => req('', 'get')
const postList = data => req('', 'post', JSON.stringify(data))
const putList = (idx, data) => req(idx, 'put', JSON.stringify(data))
const deleteList = idx => req(idx, 'delete')

const app = () => {
  const render = data => {
    one('#app').innerHTML = `
      <form name="insertFrm">
        <fieldset><legend>추가</legend>
          <input type="text" name="content" size="40" autofocus />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      <form name="updateFrm">
        <fieldset><legend>수정</legend>
          <input type="text" name="idx" size="10" />
          <input type="text" name="content" size="40" />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      <form name="deleteFrm">
        <fieldset><legend>삭제</legend>
          <input type="text" name="idx" size="10" />
          <button type="submit">전송</button>
        </fieldset>
      </form>
      ${data.map((v, k) => `<p>${k} / ${v}</p>`).join('')}
    `

    setEvent()
  }
  const dataToRender = _ => getList().then(({ success, data }) => { success && render(data) })

  const setEvent = () => {
    const { insertFrm, updateFrm, deleteFrm } = document.forms
    insertFrm.onsubmit = e => {
      e.preventDefault()
      const content = e.target.content.value
      postList({ content }).then(({ success }) => { success && dataToRender() })
    }
    updateFrm.onsubmit = e => {
      e.preventDefault()
      const content = e.target.content.value
      const idx = e.target.idx.value
      putList(idx, { content }).then(({ success }) => { success && dataToRender() })
    }
    deleteFrm.onsubmit = e => {
      e.preventDefault()
      deleteList(e.target.idx.value).then(({ success }) => { success && dataToRender() })
    }
  }

  dataToRender()

}
app()