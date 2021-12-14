<template>
  <page class='detail-wrap'
        title="客群详情"
        :needPadding="true">
    <div class="detail-info mt16">
      <detail-info :detailInfo.sync="detailInfo"></detail-info>
    </div>
    <div class="mt24">
      <p class="ft14 bold color-333">用户列表</p>
      <member-list ref="memberList"></member-list>
    </div>
    <page-handle :config="{btns: [{ text: '返回', event: 'cancel' }]}">
    </page-handle>
  </page>
</template>
<script>
import { DetailInfo } from './components'
import { MemberList } from '../../customer-label/components'
import PageHandle from '@/components/PageHandle.vue'
export default {
  name: 'Detail',
  watch: {
    detailInfo: {
      handler: function (val) {
        if (this.$refs.memberList) {
          this.$refs.memberList.memberLabelList = val.memberLabels
          this.$refs.memberList.getTableData()
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      detailInfo: {}
    }
  },
  components: { DetailInfo, MemberList, PageHandle }
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
  .detail-info {
    border: 1px solid #e6e5ea;
    border-radius: 2px;
  }
}
</style>
