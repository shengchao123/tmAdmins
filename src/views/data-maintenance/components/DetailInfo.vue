<template>
  <div class="detail-info-wrap">
    <div class="info-title ml12 mb24">{{current.label}}</div>
    <div class="ml90">
      <div v-for="(item,index) in formList"
           :key="index"
           :class="childKeysList.includes(item.keyName) ? 'mb24' : 'mb24 flex'">
        <span v-if="!childKeysList.includes(item.keyName)"
              :style="{width:labelWidth}"
              class="color-999 ft14 i-block">{{item.title}}：</span>
        <div v-if="childKeysList.includes(item.keyName)">
          <p>{{item.title}}：</p>
          <page-table class="mt16"
                      :data="table.data"
                      :col-configs="table.colConfig"
                      :isLoading="table.isLoading">
          </page-table>
          <!-- <div v-for="(child,childIndex) in item.child"
               :key="childIndex"
               class="flex">
            <p>{{selectedName(detailInfo[child.selectId])}}：</p>
            <span class="color-999">热度：</span>
            <p>{{detailInfo[child.inputKeyName]}}</p>
          </div> -->
        </div>
        <div v-else>
          <span class="color-333">{{detailInfo[item.keyName]}}</span>
          <span>{{item.unit}}</span>
          <span v-if="isShowCompare(item)"
                class="color-999 ft12 ml8">（较昨日对比：{{compareNum(item)}}%）</span>
          <span v-if="isShowProportion(item)"
                class="color-999 ft12 ml8">（占比：{{proportionNum(item)}}%）</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formListMap } from '@u/enum.js'
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import { replaceString } from '@u/tool.js'
import { proportionNum, compareNum, isShowProportion, isShowCompare } from './filter'
export default {
  name: 'DetailInfo',
  methods: {
    replaceString,
    getTableData () {
      const tableData = []
      let lineTop3 = []
      this.formList.forEach(el => {
        if (this.childKeysList.includes(el.keyName)) {
          lineTop3 = el.child
        }
      })
      if (this.$isEmpty(lineTop3)) return
      lineTop3.forEach((line, i) => {
        const obj = {
          id: i + 1,
          name: this[this.optionMapKey].get(this.detailInfo[line.selectId]),
          num: this.detailInfo[line.inputKeyName]
        }
        tableData.push(obj)
      })
      this.table.data = tableData
    }
  },
  watch: {
    current: {
      handler: function (val) {
        this.formList = this.formListMap.get(val.index)
        const journeyLineOptions = this.replaceString(this.journeyLineOptions, [{ key: 'journeyLineId', value: 'id' }])
        if (val.index === 0) {
          this.table.colConfig[1].label = '路线名称'
          this.selectOptions = journeyLineOptions
          this.optionMapKey = 'lineOptionMap'
        } else {
          this.table.colConfig[1].label = '联盟名称'
          this.selectOptions = this.journeyAllianceOptions
          this.optionMapKey = 'allianceOptionMap'
        }
        this.$nextTick(() => {
          this.getTableData()
        })
      },
      immediate: true,
      deep: true
    },
    detailObj: {
      handler: function (val) {
        if (this.$isEmpty(val)) return
        this.detailInfo = {
          ...val,
          concatTotalNum: val.callsNumber + val.messageNumber // 线上问诊总次数=电话+留言
        }
        this.getTableData()
      },
      immediate: true
    },
    journeyLineOptions: {
      handler: function (val) {
        if (this.$isEmpty(val)) return
        const arr = []
        val.forEach(item => {
          arr.push([item.journeyLineId, item.name])
        })
        this.lineOptionMap = new Map(arr)
      },
      deep: true,
      immediate: true
    },
    journeyAllianceOptions: {
      handler: function (val) {
        if (this.$isEmpty(val)) return
        const arr = []
        val.forEach(item => {
          arr.push([item.id, item.name])
        })
        this.allianceOptionMap = new Map(arr)
      },
      immediate: true,
      deep: true

    }
  },
  props: {
    detailObj: Object,
    journeyLineOptions: Array,
    journeyAllianceOptions: Array
  },
  data () {
    return {
      detailInfo: {},
      optionMapKey: '',
      lineOptionMap: new Map([]),
      allianceOptionMap: new Map([]),
      selectOptions: this.journeyLineOptions,
      childKeysList: ['firstPopularLineId', 'firstActiveAllianceId'],
      table: {
        colConfig: [
          {
            prop: 'id',
            label: '排名',
            width: 76
          },
          {
            prop: 'name',
            label: '路线名称',
            width: 316
          },
          {
            prop: 'num',
            label: '热度',
            width: 100
          }
        ]
      },
      formListMap,
      formList: [],
      current: {
        index: 0,
        label: '初心之旅'
      }
    }
  },
  computed: {
    proportionNum () {
      return function (item) {
        return proportionNum(item, this.detailInfo)
      }
    },
    compareNum () {
      return function (item) {
        return compareNum(item, this.detailInfo)
      }
    },
    isShowProportion () {
      return function (item) {
        return isShowProportion(item, this.detailInfo)
      }
    },
    isShowCompare () {
      return function (item) {
        return isShowCompare(item, this.detailInfo)
      }
    },
    labelWidth () {
      const { index } = this.current
      const arr = [2, 5]
      if (arr.includes(index)) {
        return '104px'
      }
      if (index === 0) {
        return '84px'
      }
      if (index === 3) {
        return '126px'
      }
      return '118px'
    }
  },
  mixins: [TableMixins],
  components: {
    PageTable
  }
}
</script>
<style lang='scss' scoped>
.ml90 {
  margin-left: 90px;
}
.detail-info-wrap {
  margin-left: 446px;
  margin-top: 64px;
}
</style>
