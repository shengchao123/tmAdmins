export function proportionNum (item, infoData) {
  const { notStartWorkNumber, workingNumber, finishWorkNumber, callsNumber, messageNumber, visitNumber } = infoData
  const workTotal = notStartWorkNumber + workingNumber + finishWorkNumber
  const callTotal = callsNumber + messageNumber + visitNumber

  const notStartProp = Math.ceil((notStartWorkNumber / workTotal) * 100)
  const workingProp = Math.ceil((workingNumber / workTotal) * 100)
  const finishProp = Math.ceil(100 - notStartProp - workingProp)

  const callsProp = Math.ceil((callsNumber / callTotal) * 100)
  const messageProp = Math.ceil((messageNumber / callTotal) * 100)
  const visitProp = Math.ceil(100 - callsProp - messageProp)
  if (item.keyName === 'notStartWorkNumber') {
    return notStartProp
  }
  if (item.keyName === 'workingNumber') {
    return workingProp
  }
  if (item.keyName === 'finishWorkNumber') {
    return finishProp
  }
  if (item.keyName === 'callsNumber') {
    return callsProp
  }
  if (item.keyName === 'messageNumber') {
    return messageProp
  }
  if (item.keyName === 'visitNumber') {
    return visitProp
  }
}
export function compareNum (item, infoData) {
  const { todayVisitorsNumber, yesterdayVisitorsNumber, todayNewUserNumber, yesterdayNewUserNumber } = infoData
  // (今日/昨日)*100-100，保留整数，向上取整
  let num = ''
  if (item.keyName === 'todayVisitorsNumber') {
    num = Math.ceil((todayVisitorsNumber / yesterdayVisitorsNumber) * 100 - 100)
  }
  if (item.keyName === 'todayNewUserNumber') {
    num = Math.ceil((todayNewUserNumber / yesterdayNewUserNumber) * 100 - 100)
  }
  return num >= 0 ? `+${num}` : num
}
export function isShowProportion (item, infoData) {
  const { notStartWorkNumber, workingNumber, finishWorkNumber, callsNumber, messageNumber, visitNumber } = infoData
  if (item.keyName === 'notStartWorkNumber' || item.keyName === 'workingNumber' || item.keyName === 'finishWorkNumber') {
    if (notStartWorkNumber && workingNumber && finishWorkNumber) {
      return true
    }
  }
  if (item.keyName === 'callsNumber' || item.keyName === 'messageNumber' || item.keyName === 'visitNumber') {
    if (callsNumber && messageNumber && visitNumber) {
      return true
    }
  }
  return false
}
export function isShowCompare (item, infoData) {
  const { todayVisitorsNumber, yesterdayVisitorsNumber, todayNewUserNumber, yesterdayNewUserNumber } = infoData
  if (item.keyName === 'todayVisitorsNumber' && todayVisitorsNumber && yesterdayVisitorsNumber) return true
  if (item.keyName === 'todayNewUserNumber' && todayNewUserNumber && yesterdayNewUserNumber) return true
  return false
}
export function labelWidth (index) {
  const arr = [2, 5]
  if (arr.includes(index)) {
    return '104px'
  }
  if (index === 0 || index === 3) {
    return '138px'
  }
  return '118px'
}
