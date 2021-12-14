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
  name: 'OrderDialog',
  components: {
    pageTable
  },
  methods: {
    show (journeyPlayCustomizationId) {
      this.getTableData(journeyPlayCustomizationId)
      this.dialog.show = true
    },
    // 请求列表数据
    getTableData (journeyPlayCustomizationId) {
      this.table.isLoading = true
      const params = {
        journeyPlayCustomizationId,
        pageNumber: 1,
        pageSize: 1000
      }
      this.$api.getJourneyPlayCustomizationOrdersPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    return {
      dialog: {
        title: '已接单人员',
        show: false
      },
      table: {
        isLoading: false,
        isShowIndex: true,
        data: [],
        colConfig: Object.freeze([
          {
            prop: 'nick',
            label: '姓名'
          },
          {
            prop: 'phone',
            label: '联系电话',
            width: 210
          },
          {
            prop: 'createTime',
            label: '接单时间',
            formatter: timeFormat,
            width: 208
          }
        ])
      }
    }
  }
}
</script>
