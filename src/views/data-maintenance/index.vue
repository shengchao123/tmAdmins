<template>
  <page title='数据维护'
        needPadding>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabList"
                   :key="index"
                   :label="item.label"
                   :name="item.label"></el-tab-pane>
    </el-tabs>
    <detail-info v-show="haveDataIndexList.includes(current.index)"
                 ref="detailInfo"
                 :detailObj="detailInfo"
                 :journeyLineOptions="journeyLineOptions"
                 :journeyAllianceOptions="journeyAllianceOptions"></detail-info>
    <form-info v-show="!haveDataIndexList.includes(current.index)"
               ref="formInfo"
               :detailInfo="detailInfo"
               :journeyLineOptions="journeyLineOptions"
               :journeyAllianceOptions="journeyAllianceOptions"></form-info>
    <page-handle @onConfirm="onConfirm"
                 @onCancel="onCancel"
                 @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import FormInfo from './components/FormInfo.vue'
import DetailInfo from './components/DetailInfo.vue'
import PageHandle from '@/components/PageHandle'
export default {
  name: 'index',
  methods: {
    // 获取线路列表
    getJourneyLineList () {
      this.$api.getJourneyLineList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.journeyLineOptions = res?.content ?? []
      })
    },
    // 获取联盟列表
    getJourneyAllianceList () {
      this.$api.getJourneyAllianceList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.journeyAllianceOptions = res?.content ?? []
      })
    },
    onCancel () {
      this.getCockpitData()
    },
    onEdit () {
      const current = this.haveDataIndexList.findIndex(item => item === this.current.index)
      this.haveDataIndexList.splice(current, 1)
    },
    getCockpitData () {
      const arr = []
      this.$api.getCockpitData().then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.detailInfo = res.content
        if (this.$isEmpty(this.detailInfo)) return
        this.isHaveDataKeyList.forEach((key, index) => {
          if (!this.$isEmpty(this.detailInfo[key])) {
            arr.push(index)
          }
        })
        this.haveDataIndexList = arr
      })
    },
    onConfirm () {
      this.$refs.formInfo.$refs.form.validate(valid => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.$refs.formInfo.form.data))
          const params = {
            ...formData
          }
          this.$api.saveCockpitData(params).then(res => {
            if (res.isError) {
              this.$message.error(res.message)
              return
            }
            this.getCockpitData()
          })
        }
      })
    },
    handleClick ({ index, label }) {
      this.current = {
        index: index * 1,
        label
      }
      this.$refs.formInfo.current = this.current
      this.$refs.detailInfo.current = this.current
    }
  },
  data () {
    return {
      journeyLineOptions: [],
      journeyAllianceOptions: [],
      current: {
        index: 0,
        label: '初心之旅'
      },
      detailInfo: {},
      isHaveDataKeyList: ['todayVisitorsNumber', 'productNumber', 'grassrootsPartyOrganizationsNumber', 'allianceActivityNumber', 'policyNumber', 'accumulativeVisitsNumber'],
      haveDataIndexList: [], // 存储有值的index 如何有值显示详情 无值显示form表单
      activeName: '初心之旅',
      tabList: [{
        label: '初心之旅'
      },
      {
        label: '城乡融合'
      },
      {
        label: '基层治理'
      },
      {
        label: '党建联盟'
      },
      {
        label: '人才服务'
      },
      {
        label: '红盟大数据'
      }]
    }
  },
  computed: {
    pageHandleConfig () {
      let obj = {
        btns: [
          {
            text: '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'onCancel'
          }
        ]
      }
      if (this.haveDataIndexList.includes(this.current.index)) {
        obj = {
          btns: [
            {
              text: '编辑',
              class: 'secondary-btn',
              event: 'onEdit'
            }
          ]
        }
      }
      return obj
    },
    // 展示已删除的图片
    deleteImg () {
      return (val) => {
        if (val.status === 3) return require('@/assets/noteManage/deleted.png')
      }
    }
  },
  created () {
    this.getJourneyLineList()
    this.getJourneyAllianceList()
    this.getCockpitData()
  },
  components: {
    FormInfo,
    DetailInfo,
    PageHandle
  }
}
</script>
<style lang='scss' scoped>
</style>
