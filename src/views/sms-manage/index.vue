<template>
  <page title="短信管理">
    <el-button type="primary"
               class="mt16"
               @click="addSms"
               v-if="$hasAuth($urls.createJourneyActivity)">新增短信</el-button>
    <page-table v-if="$hasAuth($urls.getJourneyActivityManagementPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('短信')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :isShowZero="true"
                :width="98"
                class="mt16">
      <el-table-column slot="status"
                       label="状态"
                       width="318">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onApply(scope.row)">{{scope.row.signUpQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="sum"
                       label="发送短信条数"
                       width="240">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onApply(scope.row)">{{scope.row.signUpQuantity }}</span>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>
<script>
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { smsColConfig } from '@u/enum'

export default {
  name: 'index',
  data () {
    return {
      table: {
        colConfig: smsColConfig
      }
    }
  },
  methods: {
    //   新增短信按钮
    addSms () {
      this.$router.push({ name: 'AddSms' })
    },
    // 获取列表数据
    getTableData () {
      //   this.table.isLoading = true
      //   const table = this.table
      //   const params = {
      //     menuType: '01'
      //   }
      //   this.$api.getJourneyActivityManagementPage(params).then(res => {
      //     this.table.isLoading = false
      //     if (res.isError) return this.$message.error(res.message)
      //     table.data = res.content.items
      //     table.total = res.content.count
      //   })
    },
    // 新增短信按钮
    addACtivity () {
      this.$router.push({ name: 'AddActivity' })
    },
  },
  mixins: [TableMinxis],
  components: { PageTable }
}
</script>

<style lang='scss' scoped>
</style>
