<template>
  <div class='community-wrap'>
    <div class="info-title">党组织</div>
    <div class="content column center-align pt48">
      <div class="table b mb24"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="name center-align between-row">
          <div>{{item.name}}</div>
          <el-button class="secondary-btn"
                     v-if="item.id"
                     @click="$refs.showDialog.show(item)">{{item.partyGraphic ? '查看' : '新增'}}支部风采
          </el-button>
        </div>
        <page-table :data="item.partyContacts"
                    :col-configs="table.colConfig">
        </page-table>
      </div>
    </div>
    <ShowDialog @success="getList"
                ref="showDialog"></ShowDialog>
  </div>
</template>

<script>
import PageTable from '@/components/PageTable'
import ShowDialog from '@/views/grassroots-governance/community/add/components/ShowDialog'

export default {
  name: 'community',
  methods: {
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityPartyList(params).then(res => {
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
  components: { PageTable, ShowDialog },
  data () {
    return {
      dataList: [],
      table: {
        colConfig: Object.freeze([// 路线管理
          {
            label: '职称',
            prop: 'contactTypeName',
            minWidth: 120
          },
          {
            label: '姓名',
            prop: 'name',
            width: 120
          },
          {
            label: '联系电话',
            prop: 'phone',
            width: 200
          },

          {
            label: '分工',
            prop: 'position',
            width: 312
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

  .name {
    padding: 16px 24px;
    color: #fc8d11;
  }
  .table {
    width: 780px;
    border-radius: 6px;
  }
}
</style>
