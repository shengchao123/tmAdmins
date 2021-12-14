<template>
  <page title="编辑客群信息"
        needPadding>
    <customer-info :detailInfo.sync="detailInfo"
                   :labelTagsList.sync="labelTagsList"
                   :memberGroupRuleType.sync="memberGroupRuleType"></customer-info>
    <selected-label :detailInfo.sync="detailInfo"
                    :oldSelectedLabelTags.sync="oldSelectedLabelTags"
                    :labelTagsList.sync="labelTagsList"
                    :memberGroupRuleType.sync="memberGroupRuleType"></selected-label>
  </page>
</template>

<script>
import { SelectedLabel, CustomerInfo } from '../components'
export default {
  name: 'EditCustomer',
  methods: {
    getDetailInfo (params) { // 获取列表
      this.$api.getMemberGroup(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        const { memberGroupRuleType, memberGroupLabelGroups } = res.content
        this.detailInfo = res.content
        this.memberGroupRuleType = memberGroupRuleType
        this.oldSelectedLabelTags = memberGroupLabelGroups
      })
    }
  },
  data () {
    return {
      oldSelectedLabelTags: null,
      detailInfo: null,
      labelTagsList: null,
      memberGroupRuleType: '01'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$bus.$emit('listInit')
      // 因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // if (from.name !== 'MemberInformationDetail') {
      if (from.name !== 'Marking') {
        const query = {
          id: vm.$route.query.id
        }
        vm.getDetailInfo(query)
      }
    })
  },
  components: { SelectedLabel, CustomerInfo }
}
</script>

<style lang='scss' scoped>
</style>
