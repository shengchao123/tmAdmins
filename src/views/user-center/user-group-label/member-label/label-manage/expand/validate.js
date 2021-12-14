export const startDateValidate = (vue, params) => {
  if (!vue.form.isAutomatic) return params.callback()
  if (params.value) {
    params.callback()
  } else {
    params.callback(new Error('请选择日期'))
  }
}

export const memberLabelDynamicTypeValidate = (vue, params) => {
  if (!vue.form.isDynamic || !vue.form.isAutomatic) return params.callback()
  if (params.value) {
    params.callback()
  } else {
    params.callback(new Error('请选择日期'))
  }
}

export const dateTypeValidate = (vue, params) => {
  const { isSelect, dateType } = params.value
  if (isSelect !== '1') return params.callback()
  if (!dateType) return params.callback(new Error('请选择'))
  params.callback()
}

export const dateValueValidate = (vue, params) => {
  const { isSelect, dateValue, dateType } = params.value
  if (isSelect !== '1' || dateType !== 1) return params.callback()
  if (!dateValue) return params.callback(new Error('请选择日期'))
  params.callback()
}

export const limitValidate = (vue, params) => {
  const { isSelect, lowerLimit, upperLimit } = params.value
  if (isSelect !== '1') return params.callback()
  if (vue.$isEmpty(lowerLimit) || vue.$isEmpty(upperLimit)) return params.callback(new Error('请输入'))
  if (upperLimit < lowerLimit) return params.callback(new Error('下限不得大于上限'))
  params.callback()
}

export const memberAgeTypeValidate = (vue, params) => {
  const { isSelect, ageType } = params.value
  if (isSelect !== '1') return params.callback()
  if (!ageType) return params.callback(new Error('请选择年龄范围'))
  params.callback()
}

export const memberAgeLimitValidate = (vue, params) => {
  const { isSelect, lowerLimit, upperLimit, ageType } = params.value
  if (isSelect !== '1' || ageType !== 1) return params.callback()
  if (vue.$isEmpty(lowerLimit) || vue.$isEmpty(upperLimit)) return params.callback(new Error('请输入'))
  if (upperLimit < lowerLimit) return params.callback(new Error('下限不得大于上限'))
  params.callback()
}

export const memberBirthdayHeavenNumValidate = (vue, params) => {
  const { isSelect, dateType, heavenNum } = params.value
  if (isSelect !== '1' || dateType !== '030106') return params.callback()
  if (vue.$isEmpty(heavenNum)) return params.callback(new Error('请输入'))
  params.callback()
}

export const membershipLevelValidate = (vue, params) => {
  const { isSelect, levelCode } = params.value
  if (isSelect !== '1') return params.callback()
  if (!levelCode) return params.callback(new Error('请选择等级'))
  params.callback()
}

export const memberRegistrationTimeValidate = (vue, params) => {
  const { isSelect, dateType, dateValue } = params.value
  if (isSelect !== '1' || dateType !== '030403') return params.callback()
  if (!dateValue) return params.callback(new Error('请选择时间'))
  params.callback()
}

export const couponsListValidate = (vue, params) => {
  const { isSelect, selectList } = params.value
  if (isSelect !== '1') return params.callback()
  if (vue.$isEmpty(selectList)) return params.callback(new Error('请选择优惠券'))
  params.callback()
}
