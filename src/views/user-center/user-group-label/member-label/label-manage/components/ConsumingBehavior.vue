<template>
  <div class='consuming-behavior-wrap'>
    <el-form ref="form"
             :rules="rules"
             :model="formData">
      <div class="check-item"
           v-for="(item, index) in formData.checkData"
           :key="index">
        <el-checkbox v-model="item.model.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">{{item.name}}</el-checkbox>
        <div class="row"
             v-show="item.model.isSelect === '1'">
          <el-form-item :prop="`checkData.${index}.model`"
                        :rules="rules.dateType"
                        class="item-mb-10">
            <el-select placeholder="选日期"
                       class="w96 mt4 mr16"
                       v-model="item.model.dateType">
              <el-option v-for="item in days"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :prop="`checkData.${index}.model`"
                        v-show="item.model.dateType === 1"
                        :rules="rules.dateValue"
                        class="item-mb-10">
            <el-date-picker v-model="item.model.dateValue"
                            type="daterange"
                            class="w240 mt4 mr16"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <div>
            <span class="mr8">{{item.name}}</span>
            <el-form-item :prop="`checkData.${index}.model`"
                          :rules="rules.limit"
                          class="item-mb-10">
              <el-input-number v-model="item.model.lowerLimit"
                               :controls="false"
                               class="w96 mt4 mr8"
                               :placeholder="item.placeholder"></el-input-number>
              <span>~</span>
              <el-input-number v-model="item.model.upperLimit"
                               :controls="false"
                               class="w96 mt4 ml8 mr8"
                               :placeholder="item.placeholder"></el-input-number>
            </el-form-item>
            <span>{{item.unit}}</span>
          </div>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.daysNotConsumed.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">未消费天数</el-checkbox>
        <div v-show="formData.daysNotConsumed.isSelect === '1'">
          <span class="mr16 ml24">未消费天数</span>
          <el-form-item prop="daysNotConsumed"
                        :rules="rules.limit"
                        class="item-mb-10">
            <el-input-number v-model="formData.daysNotConsumed.lowerLimit"
                             :controls="false"
                             class="w96 mt4 mr8"
                             placeholder="输入数量"></el-input-number>
            <span>~</span>
            <el-input-number v-model="formData.daysNotConsumed.upperLimit"
                             :controls="false"
                             class="w96 mt4 ml8 mr8"
                             placeholder="输入数量"></el-input-number>
          </el-form-item>
          <span>天</span>

          <el-checkbox v-model="formData.daysNotConsumed.flag"
                       :true-label="1"
                       :false-label="0"
                       class="ml32">包含从未消费过的会员</el-checkbox>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { dateTypeValidate, dateValueValidate, limitValidate } from '../expand/validate'
export default {
  name: 'ConsumingBehavior',
  methods: {
    setData (ruleList) {
      const checkData = this.formData.checkData
      const daysNotConsumed = this.formData.daysNotConsumed
      ruleList && ruleList.forEach(val => {
        const id = val.memberLabelRuleType
        switch (id) {
          case '0101':
            checkData[0].model = {
              isSelect: '1',
              dateType: val.timeSpan || 1,
              dateValue: val.startDate ? [val.startDate, val.endDate] : null,
              lowerLimit: this.$isEmpty(val.lowerLimit) ? undefined : val.lowerLimit,
              upperLimit: this.$isEmpty(val.upperLimit) ? undefined : val.upperLimit
            }
            break
          case '0102':
            checkData[1].model = {
              isSelect: '1',
              dateType: val.timeSpan || 1,
              dateValue: val.startDate ? [val.startDate, val.endDate] : null,
              lowerLimit: this.$isEmpty(val.lowerLimit) ? undefined : val.lowerLimit,
              upperLimit: this.$isEmpty(val.upperLimit) ? undefined : val.upperLimit
            }
            break
          case '0103':
            checkData[2].model = {
              isSelect: '1',
              dateType: val.timeSpan || 1,
              dateValue: val.startDate ? [val.startDate, val.endDate] : null,
              lowerLimit: this.$isEmpty(val.lowerLimit) ? undefined : val.lowerLimit,
              upperLimit: this.$isEmpty(val.upperLimit) ? undefined : val.upperLimit
            }
            break
          case '0104':
            daysNotConsumed.isSelect = '1'
            daysNotConsumed.lowerLimit = this.$isEmpty(val.lowerLimit) ? undefined : val.lowerLimit
            daysNotConsumed.upperLimit = this.$isEmpty(val.upperLimit) ? undefined : val.upperLimit
            daysNotConsumed.flag = val.flag
            break
        }
      })
    }
  },
  data () {
    const dateTypeVal = (rule, value, callback) => {
      dateTypeValidate(this, { rule, value, callback })
    }
    const dateValueVal = (rule, value, callback) => {
      dateValueValidate(this, { rule, value, callback })
    }
    const limitVal = (rule, value, callback) => {
      limitValidate(this, { rule, value, callback })
    }
    return {
      formData: {
        daysNotConsumed: {
          id: '0104',
          isSelect: '0',
          lowerLimit: undefined,
          upperLimit: undefined,
          flag: 0
        },
        checkData: [
          {
            id: '0101',
            name: '累计消费金额',
            placeholder: '请输入金额',
            unit: '元',
            model: {
              isSelect: '0',
              dateType: '',
              dateValue: null,
              lowerLimit: undefined,
              upperLimit: undefined
            }
          },
          {
            id: '0102',
            name: '平均消费金额',
            placeholder: '请输入金额',
            unit: '元',
            model: {
              isSelect: '0',
              dateType: '',
              dateValue: null,
              lowerLimit: undefined,
              upperLimit: undefined
            }
          },
          {
            id: '0103',
            name: '累计消费次数',
            placeholder: '请输入次数',
            unit: '次',
            model: {
              isSelect: '0',
              dateType: '',
              dateValue: null,
              lowerLimit: undefined,
              upperLimit: undefined
            }
          }
        ]
      },
      rules: {
        dateType: [
          { trigger: ['blur', 'change'], validator: dateTypeVal }
        ],
        dateValue: [
          { trigger: ['blur', 'change'], validator: dateValueVal }
        ],
        limit: [
          { trigger: 'blur', validator: limitVal }
        ]
      },
      days: [{ label: '近7天', value: 7 }, { label: '近15天', value: 15 }, { label: '近30天', value: 30 }, { label: '近60天', value: 60 }, { label: '自定义', value: 1 }]
    }
  }
}
</script>

<style lang='scss' scoped>
.consuming-behavior-wrap {
  /deep/ .el-input-number .el-input__inner {
    text-align: left !important;
  }
  /deep/ .item-mb-10 {
    margin-bottom: 10px !important;
  }
  .el-form-item {
    display: inline-block;
    /deep/.el-form-item__content {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
}
.w96 {
  width: 96px;
}
.check-item {
  // line-height: 20px !important;
}
</style>
