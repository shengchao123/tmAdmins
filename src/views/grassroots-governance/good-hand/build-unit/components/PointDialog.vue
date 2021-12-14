<template>
  <el-dialog :title="dialog.title"
             width="656px"
             :modal-append-to-body="false"
             :visible.sync="dialog.show">
    <div class="pl24 pr24 pt24 pb24">
      <div class="pb16">积分：<span class="bold tip-main-color">{{pointData}}</span></div>
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
  name: 'PointDialog',
  components: {
    pageTable
  },
  methods: {
    show (data) {
      const { point, id } = data
      this.pointData = point
      this.getTableData(id)
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
      this.$api.getJourneyCoConstructionUnitPointRecord(params).then(res => {
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
      return '+' + row[column.property]
    }
  },
  data () {
    return {
      dialog: {
        title: '积分',
        show: false
      },
      pointData: 0,
      table: {
        isLoading: false,
        data: [],
        colConfig: Object.freeze([
          {
            prop: 'createTime',
            label: '时间',
            formatter: timeFormat,
            width: 175
          },
          {
            prop: 'typeName',
            label: '类型名称'
          },
          {
            prop: 'point',
            label: '加分',
            width: 100,
            formatter: this.numberFormat
          }
        ])
      }
    }
  }
}
</script>
