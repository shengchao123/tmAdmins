<template>
  <div class="form-info-wrap">
    <div class="info-title ml12 mb24">{{current.label}}</div>
    <el-form ref="form"
             class="form ml90"
             :rules="form.rules"
             :model="form.data"
             :label-width="labelWidth"
             label-position="left">
      <el-form-item v-for="(item,index) in formList"
                    :key="index"
                    :label="item.title"
                    :prop="item.keyName">
        <!-- Top3 -->
        <div v-if="childKeysList.includes(item.keyName)">
          <div v-for="(childItem,childIndex) in item.child"
               :key="childIndex"
               class="flex">
            <div>
              <el-form-item :prop="childItem.selectId">
                <el-select v-model="form.data[childItem.selectId]"
                           class="w240"
                           placeholder="请选择"
                           @change="(e)=>changeSelect(e,childIndex)">
                  <el-option v-for="(line,lineIndex) in selectOptions"
                             :key="lineIndex"
                             :label="line.name"
                             :disabled="selectedIdsList.includes(line.id)"
                             :value="line.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="heat-num">
              <el-form-item :prop="childItem.inputKeyName">
                <span class="mr8 ml32">热度</span>
                <el-input class="w120"
                          v-model="form.data[childItem.inputKeyName]"
                          placeholder="输入数字"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div v-else>
          <el-input-number class="w240"
                           :controls="false"
                           v-model="form.data[item.keyName]"
                           placeholder="输入数字"
                           :disabled="item.keyName === 'concatTotalNum'"></el-input-number>
          <span class="ml8">{{item.unit}}</span>
          <span v-if="isShowCompare(item)"
                class="color-999 ft12 ml8">（较昨日对比：{{compareNum(item)}}%）</span>
          <span v-if="isShowProportion(item)"
                class="color-999 ft12 ml8">（占比：{{proportionNum(item)}}%）</span>
        </div>
        <!-- <p class="spec"
           v-if="item.keyName === 'firstPopularLineId'">Top3</p> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { formListMap } from '@u/enum.js'
import { replaceString } from '@u/tool.js'
import { proportionNum, compareNum, isShowProportion, isShowCompare, labelWidth } from './filter'
export default {
  name: 'FormInfo',
  methods: {
    replaceString,
    changeSelect (e, i) {
      this.selectedIdsList[i] = e
    },
    setRules () {
      this.formList.forEach(el => {
        if (el.keyName === 'firstPopularLineId') {
          el.child.forEach(childItme => {
            this.form.rules[childItme.selectId] = [
              { required: true, message: childItme.selectMsg, trigger: 'blur' }
            ]
            this.form.rules[childItme.inputKeyName] = [
              { required: true, message: childItme.inputMsg, trigger: 'blur' }
            ]
          })
          return
        }
        this.form.rules[el.keyName] = [
          { required: true, message: el.msg, trigger: 'blur' }
        ]
      })
    }
  },
  watch: {
    current: {
      handler: function (val) {
        this.formList = this.formListMap.get(val.index)
        this.setRules()
      },
      immediate: true
    },
    detailInfo: {
      handler: function (val) {
        if (!val) return
        this.form.data = {
          ...this.form.data,
          ...val,
          concatTotalNum: val.callsNumber + val.messageNumber // 线上问诊总次数=电话+留言
        }
        // 将已经选中的下拉 禁选
        const lineTop3 = ['firstPopularLineId', 'secondPopularLineId', 'thirdPopularLineId']
        lineTop3.forEach((el, i) => {
          if (!this.$isEmpty(val[el])) {
            this.selectedIdsList[i] = val[el]
          }
        })
      },
      immediate: true
    }
  },
  props: {
    detailInfo: Object,
    journeyLineOptions: Array,
    journeyAllianceOptions: Array
  },
  data () {
    return {
      childKeysList: ['firstPopularLineId', 'firstActiveAllianceId'],
      formListMap,
      selectedIdsList: [], // 下拉选中的id集合
      current: {
        index: 0,
        label: '初心之旅'
      },
      form: {
        rules: {},
        data: {}
      },
      formList: []
    }
  },
  computed: {
    selectOptions () {
      const journeyLineOptions = this.replaceString(this.journeyLineOptions, [{ key: 'journeyLineId', value: 'id' }])
      return this.current.index === 0 ? journeyLineOptions : this.journeyAllianceOptions
    },
    proportionNum () {
      return function (item) {
        return proportionNum(item, this.form.data)
      }
    },
    compareNum () {
      return function (item) {
        return compareNum(item, this.form.data)
      }
    },
    isShowProportion () {
      return function (item) {
        return isShowProportion(item, this.form.data)
      }
    },
    isShowCompare () {
      return function (item) {
        return isShowCompare(item, this.form.data)
      }
    },
    labelWidth () {
      return labelWidth(this.current.index)
    }
  }
}
</script>
<style lang='scss' scoped>
.ml90 {
  margin-left: 90px;
}
.form-info-wrap {
  margin-left: 446px;
  margin-top: 64px;
  /deep/ .el-input__inner {
    text-align: left;
  }
  .heat-num {
    /deep/ .el-form-item__error {
      margin-left: 68px;
    }
  }
  // .spec {
  //   position: absolute;
  //   left: -94px;
  //   top: 18px;
  // }
}
</style>
