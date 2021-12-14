<template>
  <page title="权限设置"
        needPadding>
    <div class="limit-wrap">
      <div class="mt24">
        当前用户角色
        <el-select v-model="currentRoleId"
                   @change="roleChange"
                   placeholder="请选择">
          <el-option v-for="item in roleList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div v-show="limitTree.length > 0"
           class="mt24">
        <el-tree :data="limitTree"
                 show-checkbox
                 default-expand-all
                 node-key="id"
                 ref="tree"
                 icon-class=''
                 :expand-on-click-node="false">
        </el-tree>
        <page-handle confirmText="保存"
                     :config="{backRouteName: 'Role'}"
                     @onConfirm="onConfirm"></page-handle>
      </div>
      <page-empty v-show="limitTree.length <= 0"
                  icon='icon_zanwushuju'
                  message="暂无数据"></page-empty>
    </div>
  </page>
</template>

<script>
import PageHandle from '@/components/PageHandle'
import PageEmpty from '@/components/PageEmpty.vue'

export default {
  name: 'RoleLimit',
  methods: {
    roleChange (val) {
      this.currentRoleId = val
      this.reqRoleLimitById()
    },
    onConfirm () {
      if (!this.$hasAuth(this.$urls.setRoleDetails)) {
        this.$message.success('暂无修改权限')
        return
      }
      const currentRoleLimitKeys = this.$refs.tree.getCheckedKeys()
      const oldRoleLimitKeys = this.roleLimitKeys
      if (JSON.parse(JSON.stringify(currentRoleLimitKeys)) === JSON.parse(JSON.stringify(oldRoleLimitKeys))) {
        this.$message.success('绑定权限成功')
        this.goBack()
        return
      }
      const params = {
        authenticationIds: this.$refs.tree.getCheckedKeys(),
        id: this.currentRoleId
      }
      this.$api.setRoleLimit(params).then(res => {
        if (res.isError) return
        this.$store.dispatch('user/setUserLimitList')
        this.$message.success('绑定权限成功')
        this.goBack()
      })
    },
    goBack () {
      this.$store.dispatch('tags/delView', this.$route)
      this.$router.push({ name: 'Role' })
    },
    reqRoleLimitTree () {
      this.$api.roleLimitTree().then(res => {
        if (res.isError) return
        this.limitTree = this.handleData(res.content)
        this.reqRoleLimitById()
      })
    },
    reqSetRoleLimit () { },
    reqRoleLimitById () {
      const params = {
        roleId: this.currentRoleId
      }
      this.$api.roleLimitById(params).then(res => {
        if (res.isError) return
        if (!res.content) {
          this.$refs.tree.setCheckedKeys([])
          return
        }
        this.roleLimitKeys = res.content.map(item => item.id)
        this.$refs.tree.setCheckedKeys(this.roleLimitKeys)
      })
    },
    reqRoleList () {
      const params = {
        orgId: this.platformOrg.id
      }
      this.$api.roleListByOrgId(params).then(res => {
        if (res.isError) return
        this.roleList = res.content
      })
    },
    handleData (children) {
      if (this.$isEmpty(children)) return []
      return children.map(item => {
        const subChildren = !this.$isEmpty(item.authGroupDTOList) ? item.authGroupDTOList : item.authPoolDTOList
        item.children = this.handleData(subChildren)
        item.label = item.name
        return item
      })
    }
  },
  data () {
    return {
      handleValue: [],
      limitTree: [],
      currentRoleId: '',
      roleList: [],
      roleLimitKeys: []
    }
  },
  computed: {
    platformOrg () {
      return this.$store.state.platform.platformOrg
    }
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
    next()
  },
  watch: {
    platformOrg: {
      handler: function (o, n) {
        this.reqRoleList()
      },
      immediate: true
    }

  },
  mounted () {
    this.currentRoleId && this.reqRoleLimitById()
  },
  created () {
    // TODO: 暂时还做不到 获取权限跟页面加载同步进行
    // if (!this.$hasAuth(this.$urls.setRoleDetails)) {
    //   this.$router.replace('/404')
    //   return
    // }
    this.reqRoleLimitTree()
    this.currentRoleId = this.$route.query.roleId
  },
  components: { PageHandle, PageEmpty }
}
</script>

<style lang='scss' scoped>
.limit-wrap {
  height: calc(100% - 50px);
  position: relative;
  .btn-save {
    margin-right: 24px;
  }
  /deep/ .el-tree {
    border-top: $color-de solid 1px;
    border-bottom: $color-de solid 1px;
    margin-top: -1px;
  }
  /deep/ .el-tree-node {
    border-top: $color-de solid 1px;
    margin-top: -1px;
  }
  /deep/ .el-tree-node__content {
    width: 140px !important;
    float: left !important;
    margin: 12px 22px;
  }

  /deep/ .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  /deep/ .el-tree-node__expand-icon.expanded {
    display: none;
  }

  /deep/ .el-tree-node.is-current > .el-tree-node__content:hover {
    background: #fff !important;
  }

  /deep/ .el-tree > div {
    height: auto;
    overflow: hidden;
    background: #fff !important;
  }

  /deep/ .el-tree-node__children {
    border-left: $color-de solid 1px;
  }

  /deep/ .el-tree-node:hover {
    background: #fff !important;
  }
}
</style>
