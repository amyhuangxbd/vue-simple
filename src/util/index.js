class Util {
  /* 格式化接口URI */
  urlFormat (key, obj) {
    let URI = key
    if (typeof obj === 'object' && !this.isEmptyObject(obj)) {
      for (let k in obj) {
        URI = URI.replace('{{' + k + '}}', obj[k])
      }
    }
    return URI
  };

  /* 判断Object是否为空 */
  isEmptyObject (items) {
    for (let item in items) {
      return false
    }
    return true
  };

  timeFormat (date, format) {
    if (!date) return
    if (!format) format = 'yyyy-MM-dd'
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/, '/'))
        break
      case 'number':
        date = new Date(date)
        break
    }
    if (!(date instanceof Date)) return
    let dict = {
      'yyyy': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'H': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'MM': ('' + (date.getMonth() + 101)).substr(1),
      'dd': ('' + (date.getDate() + 100)).substr(1),
      'HH': ('' + (date.getHours() + 100)).substr(1),
      'mm': ('' + (date.getMinutes() + 100)).substr(1),
      'ss': ('' + (date.getSeconds() + 100)).substr(1)
    }
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
      return dict[arguments[0]]
    })
  };

  numFormat (num) {
    if (num > 9999) {
      return (num / 10000).toFixed(1) + '万'
    } else {
      return num
    }
  };

  splitArray (data, len) {
    const dataLen = data.length
    const result = []
    for (var i = 0; i < dataLen; i += len) {
      result.push(data.slice(i, i + len))
    }
    return result
  }
}

export default new Util()
