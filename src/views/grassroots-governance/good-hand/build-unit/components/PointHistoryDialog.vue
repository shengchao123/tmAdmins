<template>
  <el-dialog :title="dialog.title"
             width="656px"
             :modal-append-to-body="false"
             :visible.sync="dialog.show">
    <div class="pl24 pr24 pt24 pb24">
      <page-table :data="table.data"
                  :col-configs="table.colConfig"
                  max-height="432"
                  tooltip-effect="light"
                  :isLoading="table.isLoading"
                  @getTableData="getTableData">
      </page-table>
    </div>
  </el-dialog>
</template>

<script>
import pageTable from '@/components/PageTable'
import { timeFormat } from '@u/formatter.js'
export default {
  name: 'PointHistoryDialog',
  components: {
    pageTable
  },
  methods: {
    show (journeyCoConstructionUnitId) {
      this.getTableData(journeyCoConstructionUnitId)
      this.dialog.show = true
    },
    // 请求列表数据
    getTableData (journeyCoConstructionUnitId) {
      this.table.isLoading = true
      const params = {
        journeyCoConstructionUnitId,
        pageNumber: 1,
        pageSize: 1000
      }
      this.$api.getClearJourneyCoConstructionUnitByPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.table.data = res?.content?.items ?? []
      })
    },
    numberFormat (row, column) {
      if (row[column.property] === 0) return 0
      if (column.property === 'point') return '+' + row[column.property]
      return column.property === 'rate' ? row[column.property] + '%' : row[column.property]
    }
  },
  data () {
    return {
      dialog: {
        title: '历史数据',
        show: false
      },
      table: {
        isLoading: false,
        data: [],
        colConfig: Object.freeze([
          {
            prop: 'resetTime',
            label: '数据重置时间',
            formatter: timeFormat
          },
          {
            prop: 'ordersNumber',
            label: '已接单',
            width: 80,
            formatter: this.numberFormat
          },
          {
            prop: 'grabOrdersNumber',
            label: '已抢单',
            width: 80,
            formatter: this.numberFormat
          },
          {
            prop: 'finishNumber',
            label: '已办结',
            width: 80,
            formatter: this.numberFormat
          },
          {
            prop: 'rate',
            label: '办结率',
            width: 80,
            formatter: this.numberFormat
          },
          {
            prop: 'point',
            label: '总积分',
            width: 100,
            formatter: this.numberFormat
          }
        ])
      }
    }
  }
}
</script>
