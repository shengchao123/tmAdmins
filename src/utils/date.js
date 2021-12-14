
export function getWeekOfYear (date) {
  var today = date
  var firstDay = new Date(today.getFullYear(), 0, 1)
  var dayOfWeek = firstDay.getDay()
  var spendDay = 1
  if (dayOfWeek !== 0) {
    spendDay = 7 - dayOfWeek + 1
  }

  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
  var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
  var result = Math.ceil(d / 7)
  return result + 1
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]

    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

export function dateFormatForMinutes (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    var year = d.getFullYear()
    var month = ('0' + (d.getMonth() + 1)).slice(-2)
    var sdate = ('0' + d.getDate()).slice(-2)
    return year + '-' + month + '-' + sdate
  }
}

// elementui日期时间范围 快捷选项
export const pickerOptionsRange = {
  shortcuts: [
    {
      text: '今天',
      onClick (picker) {
        const end = new Date()
        const start = new Date(new Date().toDateString())
        start.setTime(start.getTime())
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一周',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

// elementui月份范围 快捷选项
export const pickerOptionsRangeMonth = {
  shortcuts: [
    {
      text: '今年至今',
      onClick (picker) {
        const end = new Date()
        const start = new Date(new Date().getFullYear(), 0)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近半年',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 6)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一年',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 12)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

/**
 * 连续日期的过滤
 * 示例[1,2,3,4,5,19,20,30]=>["1日 至 5日","19日","20日","30日"]
 * 示例[1,2,3,5,6]=>["周一 至 周三","周五","周六"]
 * 示例['2-4','2-5','2-6','2-8','3-1']=>["2-4 至 2-6","2-8","3-1"]
 */
export function filterContinuousDate (arr, type = '01') {
  // 数组从小到大排序
  arr.sort(function (a, b) { return a > b ? 1 : -1 })
  // if (type === '04') return monthRender(arr) // 自定义日期
  /**
   * js如何判断一组数字是否连续
   * 示例
   * arr = [3, 4, 13 ,14, 15, 17, 20, 22];
   * 判断一组数字是否连续,得到一个临时数组
   * [[3,4],[13,14,15],[17],[20],[22]];
   */
  const weekStrList = ['-', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const result = []
  let tmp
  // eslint-disable-next-line no-cond-assign
  while (tmp = arr.shift()) {
    if (result.length === 0) {
      result.push([tmp]); continue
    }
    const e = result[result.length - 1]
    if (tmp === e[e.length - 1] + 1) {
      e.push(tmp)
    } else {
      result.push([tmp])
    }
  }
  const newArr = []
  result.forEach((el2) => {
    if (el2.length > 2) {
      if (type === '01') { // 周
        newArr.push(weekStrList[el2[0]] + ' 至 ' + weekStrList[el2[el2.length - 1]])
      } else { // 日
        newArr.push(el2[0] + '日 至 ' + el2[el2.length - 1] + '日')
      }
    } else if (el2.length === 2) {
      if (type === '01') { // 周
        newArr.push(...[weekStrList[el2[0]], weekStrList[el2[1]]])
      } else { // 日
        newArr.push(...[el2[0] + '日', el2[1] + '日'])
      }
    } else {
      newArr.push(type === '01' ? weekStrList[el2] : el2 + '日')
    }
  })
  return newArr.join('、')
}
