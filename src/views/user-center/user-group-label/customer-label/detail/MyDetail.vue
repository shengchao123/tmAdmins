<template>
  <div class='detail-wrap'>
    <detail-info :detailInfo.sync="detailInfo"></detail-info>
    <p class="line"></p>
    <el-tabs class="mt38 ml16 mr16 pb70"
             v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane v-if='$hasAuth($urls.getMemberGroupSpread)'
                   label="客群分布"
                   name="customerSpread"
                   :lazy="true">
        <member-spread ref="customerSpread"
                       :memberLabelList="detailInfo.memberLabels"
                       :memberGroupRuleType="detailInfo.memberGroupRuleType">
        </member-spread>
      </el-tab-pane>
      <el-tab-pane v-if='$hasAuth($urls.getMembersPage)'
                   label="会员列表"
                   name="memberList"
                   :lazy="true">
        <member-list ref="memberList"
                     :memberLabelList="detailInfo.memberLabels"
                     :memberGroupRuleType="detailInfo.memberGroupRuleType">
        </member-list>
      </el-tab-pane>
      <el-tab-pane v-if='$hasAuth($urls.findGuestGroupActivityStatisticsByPage)'
                   label="营销记录"
                   name="marketRecord"
                   :lazy="true">
        <market-record ref="marketRecord"
                       :detailInfo.sync="detailInfo">
        </market-record>
      </el-tab-pane>
      <page-handle :config="{ btns: [{ text: '返回', event: 'cancel' }]}">
      </page-handle>
    </el-tabs>
  </div>
</template>

<script>
import { DetailInfo, MarketRecord } from './components'
import { MemberSpread, MemberList } from '../../customer-label/components'
import PageHandle from '@/components/PageHandle.vue'

export default {
  name: 'Detail',
  methods: {
    handleClick () {
      this.$refs[this.activeName] && this.$refs[this.activeName].getTableData()
    }
  },
  data () {
    return {
      activeName: 'customerSpread',
      detailInfo: {}
    }
  },
  created () {
  },
  components: { DetailInfo, MemberList, MarketRecord, MemberSpread, PageHandle }
}
</script>

<style lang='scss' scoped>
.mt38 {
  margin-top: 38px;
}
.pb70 {
  padding-bottom: 70px !important;
}
.detail-wrap {
  .line {
    width: 100%;
    background: #eee;
    height: 24px;
    position: absolute;
    left: 0;
  }
}
</style>
