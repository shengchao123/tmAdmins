export function trueOrFalseFormatter (row, column, cellValue, index) {
  const isPublic = row[column.property]
  return isPublic ? '是' : '否'
}

export function labelQuantityFormatter (row, column, cellValue, index) {
  const num = row[column.property]
  return num || '--'
}

export function statusFormatter (row, column, cellValue, index) {
  const num = row[column.property]
  return num === 1 ? '已启用' : '已停用'
}
