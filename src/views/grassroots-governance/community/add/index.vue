<template>
  <Page :title="pageTitle"
        needPadding>
    <div class="mt24 center-align">
      <div class="mr8">街道社区</div>
      <el-cascader v-model="communityOrgId"
                   clearable
                   @change="changeCommunity"
                   class="w240"
                   ref="refCascader"
                   :options="communityOrgIdTree"
                   :props="cascaderProps"></el-cascader>
    </div>

    <el-tabs v-model="activeTabName"
             class="mt16"
             @tab-click="handleChangeTab">
      <el-tab-pane v-for="(item, index) in tabsOptions"
                   :key="index"
                   class="notice-manage-list"
                   :label="item.label"
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <Community v-if="activeTabName === 'community'"
               :ref="activeTabName"
               :communityOrgId="communityOrgId"></Community>
    <Alliance v-if="activeTabName === 'alliance'"
              :orgOptions="orgOptions"
              :plotOptions="plotOptions"
              :ref="activeTabName"
              :communityOrgId="communityOrgId"></Alliance>
    <Owner v-if="activeTabName === 'owner'"
           :plotOptions="plotOptions"
           :ref="activeTabName"
           :communityOrgId="communityOrgId"></Owner>
    <Property v-if="activeTabName === 'property'"
              :plotOptions="plotOptions"
              :ref="activeTabName"
              :communityOrgId="communityOrgId"></Property>

    <Building v-if="activeTabName === 'building'"
              :plotOptions="plotOptions"
              :ref="activeTabName"
              :communityOrgId="communityOrgId"></Building>

    <Steward v-if="activeTabName === 'steward'"
             :plotOptions="plotOptions"
             :ref="activeTabName"
             :communityOrgId="communityOrgId"></Steward>

    <page-handle @onConfirm="onConfirm"
                 @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </Page>
</template>

<script>
import Community from './components/Community'
import PageHandle from '@/components/PageHandle'
import Alliance from './components/Alliance'
import Owner from './components/Owner'
import Property from './components/Property'
import Building from './components/Building'
import Steward from './components/Steward'
export default {
  name: 'index',
  methods: {
    handleChangeTab () {
      // this.changeCommunity()
    },
    onConfirm () {
      if (!this.communityOrgId) return this.$message.warning('请选择街道社区')
      this.$refs[this.activeTabName].onConfirm()
    },
    onEdit () { },
    changeCommunity () {
      this.findUnitOrganizationList()
      this.findPlotOrganizationList()
      this.$nextTick(() => {
        this.$refs[this.activeTabName].initRequest()
      })
    },
    findUnitOrganizationList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findUnitOrganizationList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.orgOptions = res.content
      })
    },
    findPlotOrganizationList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findPlotOrganizationList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.plotOptions = res.content
      })
    },
    // 获取街道社区组织树
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    }
  },
  components: { Community, PageHandle, Alliance, Owner, Property, Building, Steward },
  data () {
    return {
      plotOptions: [],
      orgOptions: [],
      pageTitle: '新增社区单位',
      activeTabName: 'community',
      communityOrgId: '',
      communityOrgIdTree: [],
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        emitPath: false
      },
      pageHandleConfig: {
        btns: [
          {
            text: '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '返回',
            event: 'cancel'
          }
        ]
      },
      tabsOptions: Object.freeze([
        {
          label: '党组织',
          name: 'community'
        },
        {
          label: '党建联盟',
          name: 'alliance'
        },
        {
          label: '物业',
          name: 'property'
        },
        {
          label: '业委会',
          name: 'owner'
        },
        {
          label: '楼栋长',
          name: 'building'
        },
        {
          label: '管家',
          name: 'steward'
        }
      ])
    }
  },
  created () {
    const { activeTabName, communityOrgId } = this.$route.query
    if (communityOrgId) {
      this.communityOrgId = this.$route.query.communityOrgId
      this.findUnitOrganizationList()
      this.findPlotOrganizationList()
      this.$route.meta.title = '编辑社区单位'
      this.pageTitle = '编辑社区单位'
    }
    if (activeTabName) {
      this.activeTabName = activeTabName
    }
    this.findCommunityOrganizationTree()
  }

}
</script>

<style lang='scss' scoped>
.add-wrap {
}
</style>
