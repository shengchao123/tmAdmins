<template>
  <div v-if="!$isEmpty(tableData)">
    <donut-chart-wrap :spreadData="tableData"
                      v-if="tableData.hasData">
    </donut-chart-wrap>
    <page-empty style="height:100px;margin-top:70px"
                v-else
                class="color-999"
                icon="icon_zanwuhuiyuanfenbu"
                message="暂无会员分布">
    </page-empty>
  </div>
</template>
<script>

import DonutChartWrap from '@/views/components/DonutChartWrap'
import PageEmpty from '@c/PageEmpty.vue'

export default {
  name: 'MemberSpread',
  methods: {
    getTableData () { // 获取列表
      if (this.$isEmpty(this.memberLabelList)) return
      const memberLabelIds = this.memberLabelList.map(item => {
        return item.memberLabelId
      })
      const query = {
        memberLabelIds,
        memberGroupRuleType: this.memberGroupRuleType
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.getMemberGroupSpread(query).then(res => {
        this.listLoading = false
        if (res.isError) return
        this.tableData = res.content
      })
    }
  },
  props: {
    memberLabelList: Array,
    memberGroupRuleType: String
  },
  data () {
    return {
      tableData: {}
    }
  },
  watch: {
    memberLabelList () {
      this.getTableData()
    }
  },
  components: { DonutChartWrap, PageEmpty }
}
</script>

<style lang='scss' scoped>
</style>
