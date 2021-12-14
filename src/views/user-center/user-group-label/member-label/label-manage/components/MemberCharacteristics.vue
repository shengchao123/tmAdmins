
<template>
  <div class='member-characteristics-wrap'>
    <el-form ref="form"
             :rules="rules"
             :model="formData">
      <div class="check-item">
        <el-checkbox v-model="formData.memberBirthday.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">会员生日距离</el-checkbox>
        <div class="row"
             v-show="formData.memberBirthday.isSelect === '1'">
          <el-form-item prop="memberBirthday"
                        :rules="rules.dateType"
                        class="item-mb-10">
            <el-select placeholder="请选择"
                       v-model="formData.memberBirthday.dateType"
                       class="w96 mt4 mr16">
              <el-option v-for="item in days"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <div v-show="formData.memberBirthday.dateType === '030106'">
            <span class="mr8">距离生日前后</span>
            <el-form-item prop="memberBirthday"
                          :rules="rules.memberBirthdayHeavenNum"
                          class="item-mb-10">
              <el-input-number v-model="formData.memberBirthday.heavenNum"
                               :controls="false"
                               class="w96 mt4 mr8"
                               placeholder="请输入"></el-input-number>
            </el-form-item>
            <span>天</span>
          </div>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.memberAge.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">会员年龄范围</el-checkbox>
        <div class="row"
             v-show="formData.memberAge.isSelect === '1'">
          <el-form-item prop="memberAge"
                        :rules="rules.memberAgeType"
                        class="item-mb-10">
            <el-select placeholder="请选择"
                       v-model="formData.memberAge.ageType"
                       class="w96 mt4 mr16">
              <el-option v-for="item in ageRange"
                         :key="item.label"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="formData.memberAge.ageType === 1"
                        prop="memberAge"
                        :rules="rules.memberAgeLimitVal"
                        class="item-mb-10">
            <el-input-number v-model="formData.memberAge.lowerLimit"
                             :controls="false"
                             class="w96 mt4 mr8"
                             placeholder="输入年龄"></el-input-number>
            <span>~</span>
            <el-input-number v-model="formData.memberAge.upperLimit"
                             :controls="false"
                             class="w96 mt4 ml8 mr8"
                             placeholder="输入年龄"></el-input-number>
            <span>周岁</span>
          </el-form-item>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.membershipLevel.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">会员等级</el-checkbox>
        <div class="row"
             v-show="formData.membershipLevel.isSelect === '1'">
          <el-form-item prop="membershipLevel"
                        class="item-mb-10">
            <el-select placeholder="请选择"
                       true-label="1"
                       false-label="0"
                       v-model="formData.membershipLevel.levelCode"
                       class="w96 mt4 mr16">
              <el-option v-for="item in levelList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.memberRegistrationTime.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">会员注册时间</el-checkbox>
        <div class="row"
             v-show="formData.memberRegistrationTime.isSelect === '1'">
          <el-form-item prop="memberRegistrationTime"
                        :rules="rules.dateType"
                        class="item-mb-10">
            <el-select placeholder="请选择"
                       true-label="1"
                       false-label="0"
                       v-model="formData.memberRegistrationTime.dateType"
                       class="w96 mt4 mr16">
              <el-option v-for="item in registrationTimes"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="formData.memberRegistrationTime.dateType === '030403'"
                        prop="memberRegistrationTime"
                        :rules="rules.memberRegistrationTimeVal"
                        class="item-mb-10">
            <el-date-picker class="w240 mt4"
                            v-model="formData.memberRegistrationTime.dateValue"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            prefix-icon="el-icon-date">
            </el-date-picker>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { dateTypeValidate, memberBirthdayHeavenNumValidate, memberAgeTypeValidate, memberAgeLimitValidate, membershipLevelValidate, memberRegistrationTimeValidate } from '../expand/validate'
export default {
  name: 'MemberCharacteristics',
  methods: {
    setData (ruleList) {
      ruleList && ruleList.forEach(val => {
        const id = val.memberLabelRuleType
        switch (id) {
          case '0301': {
            const { memberLabelRuleValueType } = val
            this.formData.memberBirthday = {
              id: '0301',
              isSelect: '1',
              dateType: memberLabelRuleValueType,
              heavenNum: memberLabelRuleValueType === '030106' ? val.timeSpan : undefined
            }
            break
          }
          case '0302': {
            const { lowerLimit, upperLimit } = val
            const typeIndex = [20, 31, 41].indexOf(lowerLimit)
            const isCustomize = typeIndex < 0
            this.formData.memberAge = {
              id: '0302',
              isSelect: '1',
              ageType: isCustomize ? 1 : this.ageRange[typeIndex].value,
              lowerLimit: isCustomize ? lowerLimit : undefined,
              upperLimit: isCustomize ? upperLimit : undefined
            }
            break
          }
          case '0303':
            this.formData.membershipLevel = {
              id: '0303',
              isSelect: '1',
              levelCode: val.detailIds[0] + ''
            }
            break
          case '0304': {
            const { memberLabelRuleValueType, startDate, endDate } = val
            this.formData.memberRegistrationTime = {
              id: '0304',
              isSelect: '1',
              dateType: memberLabelRuleValueType,
              dateValue: memberLabelRuleValueType === '030403' ? [startDate, endDate] : ''
            }
            break
          }
        }
      })
    }
    // getEnableMemberLevelList () {
    //   this.$api.getEnableMemberLevelList().then(res => {
    //     if (res.isError) return
    //     this.levelList = res.content
    //   })
    // }

  },
  data () {
    const dateTypeVal = (rule, value, callback) => {
      dateTypeValidate(this, { rule, value, callback })
    }
    const memberBirthdayHeavenNumVal = (rule, value, callback) => {
      memberBirthdayHeavenNumValidate(this, { rule, value, callback })
    }
    const memberAgeTypeVal = (rule, value, callback) => {
      memberAgeTypeValidate(this, { rule, value, callback })
    }
    const memberAgeLimitVal = (rule, value, callback) => {
      memberAgeLimitValidate(this, { rule, value, callback })
    }
    const membershipLevelVal = (rule, value, callback) => {
      membershipLevelValidate(this, { rule, value, callback })
    }
    const memberRegistrationTimeVal = (rule, value, callback) => {
      memberRegistrationTimeValidate(this, { rule, value, callback })
    }
    return {
      levelList: [],
      formData: {
        memberBirthday: {
          id: '0301',
          isSelect: '0',
          dateType: '',
          heavenNum: undefined
        },
        memberAge: {
          id: '0302',
          isSelect: '0',
          ageType: '',
          lowerLimit: undefined,
          upperLimit: undefined
        },
        membershipLevel: {
          id: '0303',
          isSelect: '0',
          levelCode: ''
        },
        memberRegistrationTime: {
          id: '0304',
          isSelect: '0',
          dateType: '',
          dateValue: ''
        }
      },
      rules: {
        dateType: [
          { trigger: ['blur', 'change'], validator: dateTypeVal }
        ],
        memberBirthdayHeavenNum: [
          { trigger: 'blur', validator: memberBirthdayHeavenNumVal }
        ],
        memberAgeType: [
          { trigger: 'blur', validator: memberAgeTypeVal }
        ],
        memberAgeLimit: [
          { trigger: 'blur', validator: memberAgeLimitVal }
        ],
        membershipLevel: [
          { trigger: ['blur', 'change'], validator: membershipLevelVal }
        ],
        memberRegistrationTime: [
          { trigger: ['blur', 'change'], validator: memberRegistrationTimeVal }
        ]
      },
      days: [
        { label: '本日', value: '030101' }, { label: '本周', value: '030102' }, { label: '下周', value: '030103' },
        { label: '本月', value: '030104' }, { label: '下月', value: '030105' }, { label: '自定义', value: '030106' }
      ],
      registrationTimes: [{ label: '本周', value: '030401' }, { label: '本月', value: '030402' }, { label: '自定义', value: '030403' }],
      ageRange: [{ label: '20-30周岁', value: [20, 30] }, { label: '31-40周岁', value: [31, 40] }, { label: '41-50周岁', value: [41, 50] }, { label: '自定义', value: 1 }]
    }
  },
  created () {
    // this.getEnableMemberLevelList()
  }
}
</script>

<style lang='scss' scoped>
.member-characteristics-wrap {
  .w96 {
    width: 96px;
  }
  /deep/ .item-mb-10 {
    margin-bottom: 12px !important;
  }
  .el-form-item {
    display: inline-block;
    /deep/.el-form-item__content {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
}
</style>
