export function serviceTypeFormatter (row, column) {
  const arr = []
  if (row.isLeaveComments) {
    arr.push('留言回复')
  }
  if (row.isVisit) {
    arr.push('实地走访')
  }
  if (row.isTelephoneCommunication) {
    arr.push('电话沟通')
  }
  if (arr.length === 0) {
    return '--'
  }
  return arr.join('、')
}

export function registerFormatter (row, column) {
  if (!row[column.property]) return '--'
  return row[column.property] ? '已注册' : '未注册'
}
