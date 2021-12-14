<template>
  <page title="新增客群"
        needPadding>
    <customer-info ref="customerInfo"
                   :detailInfo.sync="detailInfo"
                   :labelTagsList.sync="labelTagsList"
                   :memberGroupRuleType.sync="memberGroupRuleType"
                   @getValid="getValid">
    </customer-info>
    <selected-label ref="selectedLabel"
                    :oldSelectedLabelTags.sync="oldSelectedLabelTags"
                    :labelTagsList.sync="labelTagsList"
                    :memberGroupRuleType.sync="memberGroupRuleType">
    </selected-label>
  </page>
</template>

<script>
import { SelectedLabel, CustomerInfo } from '../components'
export default {
  name: 'AddCustomer',
  methods: {
    getValid () {
      const p1 = new Promise((resolve, reject) => {
        this.$refs.selectedLabel.$refs.formData.validate(valid => {
          if (valid) resolve()
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs.customerInfo.$refs.formData.validate((valid) => {
          if (valid) resolve()
        })
      })
      // 多个form表单验证
      Promise.all([p1, p2]).then(() => {
        this.$refs.customerInfo.onAction()
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
        vm.$refs.customerInfo.initFormData()
      }
    })
  },
  components: { SelectedLabel, CustomerInfo }

}
</script>

<style lang='scss' scoped>
</style>
