export { default as SelectedLabel } from './SelectedLabel'
export { default as CustomerInfo } from './CustomerInfo'

// 如何根据对象某个相同属性，重新组成新数组
export default function sameAttrToNewArrayObj (StationTrain) {
  var oldDataRule = []
  StationTrain.forEach(el => {
    var oldObj = {
      titleName: el.titleName,
      tagOptions: []
    }
    var stationObj = {
      id: el.id,
      name: el.name
    }
    oldObj.tagOptions.push(stationObj)
    oldDataRule.push(oldObj)
  })
  var newData = []
  var newObj = {}
  oldDataRule.forEach((el, i) => {
    if (!newObj[el.titleName]) {
      newData.push(el)
      newObj[el.titleName] = true
    } else {
      newData.forEach(el => {
        if (el.titleName === oldDataRule[i].titleName) {
          // el.tagOptions = el.tagOptions.concat(oldDataRule[i].tagOptions)
          el.tagOptions = [...el.tagOptions, ...oldDataRule[i].tagOptions] // es6语法
        }
      })
    }
  })
  return newData
}
