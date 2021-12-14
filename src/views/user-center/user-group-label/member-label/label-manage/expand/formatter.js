export function isPublicFormatter (row, column, cellValue, index) {
  const isPublic = row[column.property]
  return isPublic ? '是' : '否'
}

export function isAutomaticFormatter (row, column, cellValue, index) {
  const isPublic = row[column.property]
  return isPublic ? '自动' : '手动'
}
