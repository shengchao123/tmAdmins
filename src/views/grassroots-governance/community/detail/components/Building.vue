<template>
  <div class='community-wrap'>
    <div class="info-title">党组织</div>
    <div class="content column center-align pt48">
      <div class="table b mb24"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="name">{{item.plotOrgName}}</div>
        <page-table :data="item.buildingContacts"
                    :col-configs="table.colConfig">
        </page-table>
      </div>
    </div>
  </div>
</template>

<script>
import PageTable from '@/components/PageTable'

export default {
  name: 'community',
  methods: {
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityBuildingList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },
    initRequest () {
      this.getList()
    }
  },
  created () {
    this.initRequest()
  },
  components: { PageTable },
  data () {
    return {
      dataList: [],
      table: {
        colConfig: Object.freeze([// 路线管理
          {
            label: '姓名',
            prop: 'name',
            width: 240
          },
          {
            label: '联系电话',
            prop: 'phone',
            width: 270
          },

          {
            label: '楼栋',
            prop: 'buildingNo',
            width: 240
          }
        ])
      }
    }
  },
  props: {
    communityOrgId: String
  }
}
</script>

<style lang='scss' scoped>
.community-wrap {
  padding: 70px 100px;
  .content {
  }
  .name {
    padding: 16px 24px;
    color: #fc8d11;
  }
  .table {
    border-radius: 6px;
  }
}
</style>
