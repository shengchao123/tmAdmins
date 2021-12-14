<template>
  <div class='community-wrap'>
    <div class="info-title">党组织</div>
    <div class="content pt48">
      <page-table :data="dataList"
                  :col-configs="table.colConfig">
        <el-table-column slot="units"
                         label="共建单位"
                         width="240">
          <template slot-scope="scope">
            <div>{{units(scope.row.units)}}</div>
          </template>
        </el-table-column>
        <el-table-column slot="plots"
                         label="覆盖小区"
                         width="300">
          <template slot-scope="scope">
            <div>{{plots(scope.row.plots)}}</div>
          </template>
        </el-table-column>
      </page-table>
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
      this.$api.findJourneyCommunityAllianceList(params).then(res => {
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
            label: '党建联盟',
            prop: 'name'
          },
          {
            label: '联盟主任',
            prop: 'headName',
            width: 120
          },
          {
            label: '联系电话',
            prop: 'phone',
            width: 200
          },
          {
            slot: 'units'
          },
          {
            slot: 'plots'
          }
        ])
      }
    }
  },
  computed: {
    plots () {
      return function (plots) {
        if (!plots[0]) return '--'
        return plots.map(item => item.plotOrgName).join('、')
      }
    },
    units () {
      return function (units) {
        if (!units[0]) return '--'
        return units.map(item => item.unitOrgName).join('、')
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
    width: 780px;
    border-radius: 6px;
  }
}
</style>
