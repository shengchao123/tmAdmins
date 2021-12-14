import { deleteObjectEmptyAttr } from '@/utils/tool.js'
export const getLabelParams = (vue) => {
  const form = vue.form
  const { name, memberLabelGroupId, isPublic, isAutomatic, startDate, isDynamic, dynamicDate } = form
  let ruleList = null
  if (isAutomatic) {
    ruleList = []
    switch (form.setLabelRange) {
      case '01':
        ruleList.push(...getConsumingBehaviorRuleList(vue.$refs.consumingBehavior))
        break
      case '03':
        ruleList.push(...getMemberCharacteristicsRuleList(vue.$refs.memberCharacteristics))
        break
      case '05':
        ruleList.push(...getCardUseRuleList(vue.$refs.cardUse))
        break
    }
  }
  const params = {
    name: name, // 名称
    memberLabelGroupId: memberLabelGroupId, // 会员标签组id
    isPublic: isPublic, // 是否公开
    isAutomatic: isAutomatic, // 是否自动
    ruleList: ruleList, // 自动标签规则列表
    startCalculationDate: isAutomatic ? new Date(startDate).getTime() : null, // 开始计算日期
    isDynamic: isAutomatic ? isDynamic : null, // 是否动态
    memberLabelDynamicType: isAutomatic ? dynamicDate.memberLabelDynamicType : null, // 会员标签动态类型（01：每月，02：每周，03：每多少天）
    dynamicCycle: isAutomatic ? dynamicDate.dynamicCycle : null // 动态周期
  }
  deleteObjectEmptyAttr(params)
  return params
}

export const setLabelParams = (vue, data) => {
  const setLabelRange = data.ruleList ? data.ruleList[0].memberLabelRuleClassification : '01'
  vue.isDataEcho = true
  vue.form = {
    name: data.name,
    memberLabelGroupId: data.memberLabelGroupId,
    isPublic: data.isPublic,
    isAutomatic: data.isAutomatic,
    setLabelRange: setLabelRange,
    startDate: data.startCalculationDate,
    isDynamic: data.isDynamic,
    dynamicDate: {
      dynamicCycle: data.dynamicCycle || '',
      memberLabelDynamicType: data.memberLabelDynamicType || ''
    }
  }
  switch (setLabelRange) {
    case '01':
      vue.$refs.consumingBehavior.setData(data.ruleList)
      break
    case '02':
      break
    case '03':
      vue.$refs.memberCharacteristics.setData(data.ruleList)
      break
    case '04':
      break
    case '05':
      vue.$refs.cardUse.setData(data.ruleList)
      break
  }
}

//  -------------------------------------

const getConsumingBehaviorRuleList = (data) => {
  const cacheArr = []
  const { daysNotConsumed, checkData } = data.formData
  // 未消费天数 - 数据
  if (daysNotConsumed.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      flag: daysNotConsumed.flag, // 特殊标记（多个标记位运算叠加） (1:包含从未消费过的会员)
      upperLimit: daysNotConsumed.upperLimit, // 上限
      lowerLimit: daysNotConsumed.lowerLimit, // 下限
      memberLabelRuleClassification: '01', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: daysNotConsumed.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  // 累计消费金额 | 平均消费金额 | 累计消费次数  - 数据
  checkData && checkData.forEach(val => {
    const { model } = val
    if (model.isSelect === '1') {
      const ruleItem = deleteObjectEmptyAttr({
        timeSpan: model.dateType !== 1 ? model.dateType : null, // 时间跨度
        startDate: model.dateType === 1 ? new Date(model.dateValue[0]).getTime() : null, // 开始日期
        endDate: model.dateType === 1 ? new Date(model.dateValue[1]).getTime() : null, // 结束日期
        upperLimit: model.upperLimit, // 上限
        lowerLimit: model.lowerLimit, // 下限
        memberLabelRuleClassification: '01', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
        memberLabelRuleType: val.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
      })
      cacheArr.push(ruleItem)
    }
  })
  return cacheArr
}

const getMemberCharacteristicsRuleList = (data) => {
  const cacheArr = []
  const { memberBirthday, memberAge, membershipLevel, memberRegistrationTime } = data.formData
  // 会员生日距离 - 数据
  if (memberBirthday.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      memberLabelRuleClassification: '03', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: memberBirthday.id, // 类型 (0101:累计消费金额; 0102:平均消费金额...)
      memberLabelRuleValueType: memberBirthday.dateType, // 规则值类型 (030101:本日; 030102:本周; 030103:下周; 030104:本月; 030105:下月; 030106:自定义;...)
      timeSpan: memberBirthday.dateType === '030106' ? memberBirthday.heavenNum : null // 时间跨度
    })
    cacheArr.push(ruleItem)
  }
  // 会员年龄范围 - 数据
  if (memberAge.isSelect === '1') {
    const isCustomize = memberAge.ageType === 1
    const ruleItem = deleteObjectEmptyAttr({
      upperLimit: isCustomize ? memberAge.upperLimit : memberAge.ageType[1], // 上限
      lowerLimit: isCustomize ? memberAge.lowerLimit : memberAge.ageType[0], // 下限
      memberLabelRuleClassification: '03', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: memberAge.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  // 会员等级 - 数据
  if (membershipLevel.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      detailIds: [membershipLevel.levelCode],
      memberLabelRuleClassification: '03', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: membershipLevel.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  // 会员注册时间 - 数据
  if (memberRegistrationTime.isSelect === '1') {
    const isCustomize = memberRegistrationTime.dateType === '030403'
    const ruleItem = deleteObjectEmptyAttr({
      memberLabelRuleClassification: '03', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: memberRegistrationTime.id, // 类型 (0101:累计消费金额; 0102:平均消费金额...)
      memberLabelRuleValueType: memberRegistrationTime.dateType, // 规则值类型 (030101:本日; 030102:本周; 030103:下周; 030104:本月; 030105:下月; 030106:自定义;...)
      startDate: isCustomize ? new Date(memberRegistrationTime.dateValue[0]).getTime() : null, // 开始日期
      endDate: isCustomize ? new Date(memberRegistrationTime.dateValue[1]).getTime() : null // 结束日期
    })
    cacheArr.push(ruleItem)
  }
  return cacheArr
}

const getCardUseRuleList = (data) => {
  const cacheArr = []
  const { couponsReceivedNum, couponsHeldNum, couponUsedNum, holdCoupons, usedCoupons } = data.formData
  // 优惠券领取数量 - 数据
  if (couponsReceivedNum.isSelect === '1') {
    const isCustomize = couponsReceivedNum.dateType === 1
    const ruleItem = deleteObjectEmptyAttr({
      upperLimit: couponsReceivedNum.upperLimit, // 上限
      lowerLimit: couponsReceivedNum.lowerLimit, // 下限
      startDate: isCustomize ? new Date(couponsReceivedNum.dateValue[0]).getTime() : null, // 开始日期
      endDate: isCustomize ? new Date(couponsReceivedNum.dateValue[1]).getTime() : null, // 结束日期
      memberLabelRuleClassification: '05', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: couponsReceivedNum.id, // 类型 (0101:累计消费金额; 0102:平均消费金额...)
      timeSpan: isCustomize ? null : couponsReceivedNum.dateType // 时间跨度
    })
    cacheArr.push(ruleItem)
  }
  // 优惠券持有数量 - 数据
  if (couponsHeldNum.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      upperLimit: couponsHeldNum.upperLimit, // 上限
      lowerLimit: couponsHeldNum.lowerLimit, // 下限
      memberLabelRuleClassification: '05', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: couponsHeldNum.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  // 优惠券适用数量 - 数据
  if (couponUsedNum.isSelect === '1') {
    const isCustomize = couponUsedNum.dateType === 1
    const ruleItem = deleteObjectEmptyAttr({
      upperLimit: couponUsedNum.upperLimit, // 上限
      lowerLimit: couponUsedNum.lowerLimit, // 下限
      startDate: isCustomize ? new Date(couponUsedNum.dateValue[0]).getTime() : null, // 开始日期
      endDate: isCustomize ? new Date(couponUsedNum.dateValue[1]).getTime() : null, // 结束日期
      memberLabelRuleClassification: '05', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: couponUsedNum.id, // 类型 (0101:累计消费金额; 0102:平均消费金额...)
      timeSpan: isCustomize ? null : couponUsedNum.dateType // 时间跨度
    })
    cacheArr.push(ruleItem)
  }
  // 持有优惠券 - 数据
  if (holdCoupons.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      detailIds: holdCoupons.selectList, // 规则详情id列表
      memberLabelRuleClassification: '05', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: holdCoupons.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  // 使用过的优惠券 - 数据
  if (usedCoupons.isSelect === '1') {
    const ruleItem = deleteObjectEmptyAttr({
      detailIds: usedCoupons.selectList, // 规则详情id列表
      memberLabelRuleClassification: '05', // 分类（01：按消费行为，02：按商品喜好，03：按会员特征，04：按会员账户，05：按卡券领用）
      memberLabelRuleType: usedCoupons.id // 类型 (0101:累计消费金额; 0102:平均消费金额...)
    })
    cacheArr.push(ruleItem)
  }
  return cacheArr
}
