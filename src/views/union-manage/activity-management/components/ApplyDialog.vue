<template>
  <div>
    <el-dialog width="656px"
               title="报名人员"
               :visible.sync="showDialog">
      <div class="apply-list">
        <page-table :data="table.data"
                    :col-configs="table.configs"
                    :emptyText="emptyText()"
                    :isLoading="table.isLoading">
        </page-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import { timeFormat } from '@u/formatter'

export default {
  data () {
    return {
      showDialog: false,
      table: {
        configs: Object.freeze([
          {
            label: '姓名',
            prop: 'name',
            minWidth: '100'
          },
          {
            label: '联系电话',
            prop: 'phone',
            width: '160'
          },
          {
            label: '报名时间',
            prop: 'signUpTime',
            width: '207',
            formatter: timeFormat
          },
          // {
          //   label: '短信发送',
          //   prop: 'sendStatusName',
          //   width: '80'
          // }
        ])
      },
      id: ''
    }
  },
  methods: {
    getApplyData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        id: this.id
      }
      this.$api.getJourneyActivitySignUpList(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content
      })
    }
  },
  mixins: [TableMixins],
  components: { PageTable }
}
</script>
<style lang="scss" scoped>
.apply-list {
  padding: 24px;
  height: 400px;
  overflow: auto;
}
</style>
