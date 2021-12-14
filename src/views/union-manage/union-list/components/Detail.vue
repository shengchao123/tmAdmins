<template>
  <page title="联盟详情"
        needPadding>
    <div class="pl40 pr40">
      <div class="pt28">
        <div class="w900">
          <div class="info-title ml24 mb24">基本信息</div>
          <div class="pb8 ml80">
            <template v-for="item in basicProp">
              <div v-if="detailData[item.prop]"
                   :key="item.prop"
                   class="row mb20">
                <span class="color-999 w108 line-h20">{{item.name}}：</span>
                <span class="w670 line-h20 line5">{{detailData[item.prop]}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="t-border">
        <div class="w900">
          <div class="info-title ml24 mb24">组织架构</div>
          <org-structure class="ml80"
                         ref="orgStructure"></org-structure>
        </div>
      </div>
      <div class="t-border"
           v-if="isShowContact">
        <div class="w900">
          <div class="info-title ml24 mb24">联盟联络人</div>
          <div class="ml80">
            <page-table :data="detailData.addressBookList"
                        class="mt16"
                        isShowIndex
                        :col-configs="table.colConfig">
            </page-table>
          </div>
        </div>
      </div>
    </div>
    <page-handle :config="{btns: [{ text: '返回', event: 'cancel' }]}"></page-handle>
  </page>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import OrgStructure from './OrgStructure.vue'
import { unionContactDetail } from '@u/enum.js'
import PageTable from '@c/PageTable'
export default {
  name: 'Detail',
  methods: {
    // 根据id获取联盟信息
    getJourneyAllianceById () {
      this.$api.getJourneyAllianceById({ id: this.$route.query.id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.detailData = res?.content ?? {}
        this.$refs.orgStructure.findOrganizationTreeByOrgId(res.content.orgId)
      })
    }
  },
  data () {
    return {
      detailData: {},
      basicProp: Object.freeze([
        {
          prop: 'name',
          name: '名称'
        },
        {
          prop: 'abbreviation',
          name: '联盟简称'
        },
        {
          prop: 'introduction',
          name: '介绍(组织框架)'
        },
        {
          prop: 'regionsName',
          name: '行政区域'
        },
        {
          prop: 'journeyLineName',
          name: '对应示范线'
        }
      ]),
      table: {
        colConfig: unionContactDetail
      }
    }
  },
  created () {
    this.getJourneyAllianceById()
  },
  components: {
    pageHandle,
    OrgStructure,
    PageTable
  },
  computed: {
    isShowContact () {
      const { addressBookList } = this.detailData
      const temLength = addressBookList ? addressBookList.length : 0
      for (var i = 0; i < temLength; i++) {
        const { orgName, contactPerson, tel } = addressBookList[i]
        if (this.$isEmpty(orgName) && this.$isEmpty(contactPerson) && this.$isEmpty(tel)) {
          return false
        }
        return true
      }
      return true
    }
  }
}
</script>

<style lang='scss' scoped>
.w900 {
  width: 900px;
  margin: 32px auto 0;
}
.t-border {
  border-top: 1px solid #eee;
}
.w108 {
  width: 108px;
}
.w670 {
  width: 670px;
}
.ml80 {
  margin-left: 80px;
}
.line-h20 {
  display: inline-block;
  line-height: 20px;
}
.line5 {
  line-height: 1.5;
}
</style>
