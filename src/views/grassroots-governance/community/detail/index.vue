<template>
  <Page :title="pageTitle"
        needPadding>
    <div class="mt24 center-align">
      <div class="mr8">街道社区：{{$route.query.communityOrgName}}</div>
    </div>

    <el-tabs v-model="activeTabName"
             class="mt16">
      <el-tab-pane v-for="(item, index) in tabsOptions"
                   :key="index"
                   class="notice-manage-list"
                   :label="item.label"
                   :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <Community v-if="activeTabName === 'community'"
               :ref="activeTabName"
               :communityOrgId="$route.query.communityOrgId"></Community>
    <Alliance v-if="activeTabName === 'alliance'"
              :ref="activeTabName"
              :communityOrgId="$route.query.communityOrgId"></Alliance>
    <Owner v-if="activeTabName === 'owner'"
           :ref="activeTabName"
           :communityOrgId="$route.query.communityOrgId"></Owner>
    <Property v-if="activeTabName === 'property'"
              :ref="activeTabName"
              :communityOrgId="$route.query.communityOrgId"></Property>

    <Building v-if="activeTabName === 'building'"
              :ref="activeTabName"
              :communityOrgId="$route.query.communityOrgId"></Building>

    <Steward v-if="activeTabName === 'steward'"
             :ref="activeTabName"
             :communityOrgId="$route.query.communityOrgId"></Steward>

    <page-handle @onConfirm="onConfirm"
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
    onConfirm () {
      this.$router.push({
        name: 'CommunityAdd',
        query: {
          communityOrgId: this.$route.query.communityOrgId,
          activeTabName: this.activeTabName
        }
      })
    },
    changeCommunity () {
      this.$nextTick(() => {
        this.$refs[this.activeTabName].initRequest()
      })
    }
  },
  components: { Community, PageHandle, Alliance, Owner, Property, Building, Steward },
  data () {
    return {
      pageTitle: '社区单位详情',
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
            text: '返回',
            event: 'cancel'
          },
          {
            text: '编辑',
            class: 'secondary-btn',
            event: 'onConfirm'
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

  }

}
</script>

<style lang='scss' scoped>
.add-wrap {
}
</style>
