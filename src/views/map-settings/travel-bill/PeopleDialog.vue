
<template>
  <el-dialog width="656px"
             :title="dialog.title"
             :visible.sync="dialog.show">
    <div style="padding:32px">
      <page-table :data="dialog.table.data"
                  :col-configs="dialog.table.configs"
                  :pageNumber.sync="dialog.table.pageNumber"
                  :pageSize.sync="dialog.table.pageSize"
                  :total="dialog.table.total"
                  :isLoading="dialog.table.isLoading"
                  @getTableData="getTableData">
        <!-- <el-table-column width="80"
                         slot='status'
                         label="报名状态"
                         v-if="dialogType === 'up'">
          <template slot-scope="scope">
            <span>{{scope.row.sendStatusName || '--'}}</span>
          </template>
        </el-table-column> -->
      </page-table>
    </div>
  </el-dialog>
</template>

<script>
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { timeFormat } from '@u/formatter.js'
export default {
  name: 'peopleDialog',
  mixins: [TableMinxis],
  components: {
    PageTable
  },
  methods: {
    show (row, type) {
      this.dialogData = row
      this.dialogType = type
      this.getDialogData(row, type)
    },
    // 分页获取点位列表
    getDialogData (row, type) {
      const apiName = type === 'up' ? 'findJourneyItinerarySignUpPage' : 'findJourneyItinerarySignInPage'
      const title = type === 'up' ? '报名人员' : '打卡人员'
      const configs = type === 'up' ? dTableConfig1 : dTableConfig2
      const { pageSize, pageNumber } = this.dialog.table

      const params = {
        pageSize,
        journeyItineraryId: row.id,
        pageNumber
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const { items, count } = res.content
        this.dialog = {
          title: title + `（${row.signUpNum}）`,
          show: true,
          table: {
            total: count,
            data: items,
            configs
          }
        }
      })
    },
    getTableData () {
      const apiName = this.dialogType === 'up' ? 'findJourneyItinerarySignUpPage' : 'findJourneyItinerarySignInPage'
      const title = this.dialogType === 'up' ? '报名人员' : '打卡人员'
      const configs = this.dialogType === 'up' ? dTableConfig1 : dTableConfig2
      const { pageSize, pageNumber } = this.dialog.table
      const { id, signUpNum } = this.dialogData
      const params = {
        pageSize,
        journeyItineraryId: id,
        pageNumber
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const { items, count } = res.content
        this.dialog = {
          title: title + `（${signUpNum}）`,
          show: true,
          table: {
            pageNumber,
            pageSize: 10,
            total: count,
            data: items,
            configs
          }
        }
      })
    }
  },
  data () {
    return {
      dialog: {
        title: '',
        show: false,
        table: {
          pageNumber: 1,
          pageSize: 10,
          colconfig: []
        }
      },
      dialogData: {},
      dialogType: ''
    }
  }
}
const dTableConfig1 = Object.freeze([// 点位管理
  {
    label: '姓名',
    prop: 'name',
    minWidth: 100
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: 160
  },
  {
    label: '报名时间',
    prop: 'createTime',
    width: 208,
    formatter: timeFormat
  },
  {
    slot: 'status'
  }
])
const dTableConfig2 = Object.freeze([// 点位管理
  {
    label: '姓名',
    prop: 'name',
    width: 160
  },
  {
    label: '打卡地点',
    prop: 'pointName',
    width: 210
  },
  {
    label: '打卡时间',
    prop: 'createTime',
    width: 210,
    formatter: timeFormat
  }
])
</script>

<style lang='scss' scoped>
.dialog-wrap {
}
</style>
