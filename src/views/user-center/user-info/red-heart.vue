<template>
  <page title="红心商城管理">
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :width="94"
                class="page_table mt16"
                emptyText="暂无数据"
                :cell-class-name="tableCellClassName"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column width="430"
                       slot='verificationTime'
                       label="核销时间">
        <template slot-scope="scope">
          <span>{{scope.row.verificationTime?$moment(scope.row.verificationTime).format("YYYY-MM-DD HH:mm:ss") : '--'}}</span>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import TableMixin from '@/mixins/table.js'
import PageTable from '@c/PageTable.vue'
import { timeFormat } from '@u/formatter'


export default {
  name: 'RedHeart',
  methods: {
    // 请求列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search,
        journeyRedHeartProductId: this.$route.query.id
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyProductRedeemRecordPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        const { count, items } = res.content
        this.table.total = count
        this.table.data = items
      })
    },
    // 列表单元格根据状态显示不同样式
    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.statusName === '已过期') {
        return 'color-999'
      }
    }
  },
  data () {
    return {
      searchData: {},
      table: {
        colConfig: Object.freeze([
          {
            prop: 'name',
            label: '姓名',
            width: 340
          },
          {
            prop: 'phone',
            label: '联系电话',
            width: 390
          },
          {
            prop: 'redeemTime',
            label: '兑换时间',
            formatter: timeFormat,
            minWidth: 200
          },
          {
            slot: 'verificationTime'
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 66
          }
        ])
      }
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [TableMixin],
  components: { PageTable }
}
</script>
<style lang='scss' scoped>
</style>
