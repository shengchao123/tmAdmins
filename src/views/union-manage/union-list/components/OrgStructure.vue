<template>
  <div class='org-wrap center-align pb32'>
    <div class="flex">
      <svg-icon icon="icon_hongmengbiaoji"
                class="ft14 mr8 mt1"></svg-icon>
      <div class="mr8 w154">{{orgTree.name}}</div>
    </div>

    <div v-if="orgTree.child"
         class='center-align'>
      <org-child :list="orgTree.child"></org-child>
    </div>
  </div>
</template>

<script>
import OrgChild from './OrgChild'
export default {
  name: 'OrgStructure',
  methods: {
    // 根据组织id获取组织树
    findOrganizationTreeByOrgId (orgId) {
      this.$api.findOrganizationTreeByOrgId({ orgId }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.orgTree = res.content
      })

    }
  },
  data () {
    return {
      orgTree: {}
    }
  },
  created () {
    // this.findOrganizationTreeByOrgId()
  },
  components: {
    OrgChild
  }
}
</script>
<style lang='scss' scoped>
.w154 {
  max-width: 154px;
}
.mt1 {
  margin-top: 1px;
}
</style>
