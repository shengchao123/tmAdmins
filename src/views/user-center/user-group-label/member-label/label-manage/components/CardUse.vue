<template>
  <div class='card-use-wrap'>
    <el-form ref="form"
             :rules="rules"
             :model="formData">
      <div class="check-item">
        <el-checkbox v-model="formData.couponsReceivedNum.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">优惠券领取数量</el-checkbox>
        <div class="row"
             v-show="formData.couponsReceivedNum.isSelect === '1'">
          <el-form-item prop="couponsReceivedNum"
                        :rules="rules.dateType"
                        class="item-mb-10">
            <el-select placeholder="选日期"
                       v-model="formData.couponsReceivedNum.dateType"
                       class="w96 mt4 mr16">
              <el-option v-for="item in days"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="formData.couponsReceivedNum.dateType === 1"
                        prop="couponsReceivedNum"
                        :rules="rules.dateValue"
                        class="item-mb-10">
            <el-date-picker v-model="formData.couponsReceivedNum.dateValue"
                            type="daterange"
                            class="w240 mt4 mr16"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <div>
            <span class="mr8">优惠券领取</span>
            <el-form-item prop="couponsReceivedNum"
                          :rules="rules.limit"
                          class="item-mb-10">
              <el-input-number v-model="formData.couponsReceivedNum.lowerLimit"
                               :controls="false"
                               class="w96 mt4 mr8"
                               placeholder="输入数量"></el-input-number>
              <span>~</span>
              <el-input-number v-model="formData.couponsReceivedNum.upperLimit"
                               :controls="false"
                               class="w96 mt4 ml8 mr8"
                               placeholder="输入数量"></el-input-number>
            </el-form-item>
            <span>张</span>
          </div>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.couponsHeldNum.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">优惠券持有数量</el-checkbox>
        <div>
          <el-form-item v-show="formData.couponsHeldNum.isSelect === '1'"
                        prop="couponsHeldNum"
                        :rules="rules.limit"
                        class="item-mb-10">
            <el-input-number v-model="formData.couponsHeldNum.lowerLimit"
                             :controls="false"
                             class="w96 mt4 mr8"
                             placeholder="输入数量"></el-input-number>
            <span>~</span>
            <el-input-number v-model="formData.couponsHeldNum.upperLimit"
                             :controls="false"
                             class="w96 mt4 ml8 mr8"
                             placeholder="输入数量"></el-input-number>
            <span>张</span>
          </el-form-item>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.couponUsedNum.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">优惠券使用数量</el-checkbox>
        <div class="row"
             v-show="formData.couponUsedNum.isSelect === '1'">
          <el-form-item prop="couponUsedNum"
                        :rules="rules.dateType"
                        class="item-mb-10">
            <el-select placeholder="选日期"
                       v-model="formData.couponUsedNum.dateType"
                       class="w96 mt4 mr16">
              <el-option v-for="item in days"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="couponUsedNum"
                        :rules="rules.dateValue"
                        class="item-mb-10">
            <el-date-picker v-model="formData.couponUsedNum.dateValue"
                            v-show="formData.couponUsedNum.dateType === 1"
                            type="daterange"
                            class="w240 mt4 mr16"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <div>
            <span class="mr8">优惠券使用</span>
            <el-form-item prop="couponUsedNum"
                          :rules="rules.limit"
                          class="item-mb-10">
              <el-input-number v-model="formData.couponUsedNum.lowerLimit"
                               :controls="false"
                               class="w96 mt4 mr8"
                               placeholder="输入数量"></el-input-number>
              <span>~</span>
              <el-input-number v-model="formData.couponUsedNum.upperLimit"
                               :controls="false"
                               class="w96 mt4 ml8 mr8"
                               placeholder="输入数量"></el-input-number>
            </el-form-item>
            <span>张</span>
          </div>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.holdCoupons.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">持有优惠券</el-checkbox>
        <div v-show="formData.holdCoupons.isSelect === '1'">
          <el-form-item prop="holdCoupons"
                        :rules="rules.couponsList"
                        class="item-mb-10">
            <el-select placeholder="选择优惠券，可多选"
                       v-model="formData.holdCoupons.selectList"
                       v-loadMore="loadmoreCouponList"
                       multiple
                       collapse-tags
                       class="w240 mt4">
              <el-option v-for="item in couponList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="check-item">
        <el-checkbox v-model="formData.usedCoupons.isSelect"
                     true-label="1"
                     false-label="0"
                     class="mb4">使用过的优惠券</el-checkbox>
        <div v-show="formData.usedCoupons.isSelect === '1'">
          <el-form-item prop="usedCoupons"
                        :rules="rules.couponsList"
                        class="item-mb-10">
            <el-select placeholder="选择优惠券，可多选"
                       v-model="formData.usedCoupons.selectList"
                       v-loadMore="loadmoreCouponList"
                       multiple
                       collapse-tags
                       class="w240 mt4">
              <el-option v-for="item in couponList"
                         :key="item.id"
                         :label="item.name"
                         collapse-tags
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

import { dateTypeValidate, dateValueValidate, limitValidate, couponsListValidate } from '../expand/validate'
export default {
  name: 'CardUse',
  methods: {
    loadmoreCouponList () {
      if (this.isLoading && !this.isHave) return
      this.pageNumber++
      this.getCouponList()
    },
    getCouponList () {
      this.isLoading = true
      const params = {
        status: [0], // 券状态
        pageNumber: this.pageNumber, // 页数
        pageSize: 100 // 一页的数据量
      }
      this.$api.findCouponByPage(params).then(res => {
        if (res.isError) return
        if (res.content.items.length === 0) {
          this.isHave = false
          return
        }
        this.couponList = [...this.couponList, ...res.content.items]
        this.isLoading = false
      })
    },
    setData (ruleList) {
      ruleList && ruleList.forEach(val => {
        const id = val.memberLabelRuleType
        switch (id) {
          case '0501': {
            const { timeSpan, lowerLimit, upperLimit, startDate, endDate } = val
            this.formData.couponsReceivedNum = {
              id: '0501',
              isSelect: '1',
              dateType: timeSpan || 1,
              dateValue: startDate ? [startDate, endDate] : null,
              lowerLimit: this.$isEmpty(lowerLimit) ? undefined : lowerLimit,
              upperLimit: this.$isEmpty(upperLimit) ? undefined : upperLimit
            }
            break
          }
          case '0502': {
            const { lowerLimit, upperLimit } = val
            this.formData.couponsHeldNum = {
              id: '0502',
              isSelect: '1',
              lowerLimit: lowerLimit,
              upperLimit: upperLimit
            }
            break
          }
          case '0503': {
            const { timeSpan, lowerLimit, upperLimit, startDate, endDate } = val
            this.formData.couponUsedNum = {
              id: '0503',
              isSelect: '1',
              dateType: timeSpan || 1,
              dateValue: startDate ? [startDate, endDate] : null,
              lowerLimit: this.$isEmpty(lowerLimit) ? undefined : lowerLimit,
              upperLimit: this.$isEmpty(upperLimit) ? undefined : upperLimit
            }
            break
          }
          case '0504':
            this.formData.holdCoupons = {
              id: '0504',
              isSelect: '1',
              selectList: val.detailIds.map(String)
            }
            break
          case '0505':
            this.formData.usedCoupons = {
              id: '0505',
              isSelect: '1',
              selectList: val.detailIds.map(String)
            }
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
    const couponsListVal = (rule, value, callback) => {
      couponsListValidate(this, { rule, value, callback })
    }
    return {
      isLoading: false,
      isHave: true,
      pageNumber: 1,
      formData: {
        couponsReceivedNum: {
          id: '0501',
          isSelect: '0',
          dateType: '',
          dateValue: null,
          lowerLimit: undefined,
          upperLimit: undefined
        },
        couponsHeldNum: {
          id: '0502',
          isSelect: '0',
          lowerLimit: undefined,
          upperLimit: undefined
        },
        couponUsedNum: {
          id: '0503',
          isSelect: '0',
          dateType: '',
          dateValue: null,
          lowerLimit: undefined,
          upperLimit: undefined
        },
        holdCoupons: {
          id: '0504',
          isSelect: '0',
          selectList: []
        },
        usedCoupons: {
          id: '0505',
          isSelect: '0',
          selectList: []
        }
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
        ],
        couponsList: [
          { trigger: ['blur', 'change'], validator: couponsListVal }
        ]
      },
      days: [{ label: '近7天', value: 7 }, { label: '近15天', value: 15 }, { label: '近30天', value: 30 }, { label: '近60天', value: 60 }, { label: '自定义', value: 1 }],
      couponList: []
    }
  },
  created () {
    this.getCouponList()
  }
}
</script>

<style lang='scss' scoped>
.card-use-wrap {
  .w96 {
    width: 96px;
  }
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
</style>
