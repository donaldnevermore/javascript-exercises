/**
 * 解析查询字符串
 */
function getQueryStringArgs () {
  let qs = location.search.length > 0 ? loction.search.substring(1) : ''
  let args = {}
  let items = qs.length ? qs.split('&') : []
  let item = null
  let name = null
  let value = null
  let i = 0
  let len = items.length

  for (let i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}

/**
 * 拼接查询字符串
 * @param {Object} obj
 */
function setQueryStringArgs (obj) {
  let value = null
  let name = null
  let query = ''
  for (let name of Object.keys(obj)) {
    value = obj[name]
    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
  }
  return query.length ? query.substring(0, query.length - 1) : ''
}