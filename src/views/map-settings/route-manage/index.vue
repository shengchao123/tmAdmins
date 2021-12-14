<template>
  <page title="路线管理">
    <page-search :formOptions="formOptions"
                 class="mt16">
      <div slot="routeName">
        <el-input placeholder="输入路线名称"
                  class="w240"
                  clearable
                  @clear="onInquire"
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="getTableData"></i>
        </el-input>
      </div>
    </page-search>
    <div>
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyLine)"
                 @click="onAddPoint">新增路线</el-button>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colconfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('路线')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.getJourneyLinePage)"
                class="mt16">
      <el-table-column slot="statusName"
                       label="状态"
                       width="167">
        <template slot-scope="scope">
          <span :class="scope.row.status === 2?'error-color':''">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="192">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getJourneyLineById)">详情</span>
          <span class="text-btn mr16"
                @click="onEdit(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyLine) && scope.row.status !== 3">编辑</span>
          <span class="text-btn mr16"
                @click="onHidden(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyLineShowStatusById)">{{hiddenStatus(scope.row)}}</span>
          <el-popconfirm title="要删除该路线？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(scope.row)"
                         v-if="$hasAuth($urls.deleteJourneyLineById) && scope.row.status !== 3">
            <span class="text-btn mr12"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { routeColConfig } from '@u/enum'

export default {
  name: 'index',
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
      this.search.pageNumber = 1
      this.getTableData()
    }
    return {
      formOptions: [
        {
          slot: 'routeName'
        },
        {
          label: '状态',
          placeholder: '选择状态',
          prop: 'status',
          options: [{ name: '已显示', id: 1 }, { name: '已隐藏', id: 2 }, { name: '已删除', id: 3 }],
          element: 'el-select',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'status')
            }
          },
          style: {
            width: '120px'
          }
        }
      ],
      table: {
        colconfig: routeColConfig
      },
      search: {
        keyword: ''
      }
    }
  },
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 新增路线
    onAddPoint () {
      this.$router.push({ name: 'AddRoute' })
    },
    // 分页获取路线列表
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      this.$api.getJourneyLinePage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 跳转详情页面
    onDetail (row) {
      this.$router.push({ name: 'RouteDetail', query: { journeyLineId: row.journeyLineId } })
    },
    // 跳转编辑页面
    onEdit (row) {
      this.$router.push({ name: 'EditRoute', query: { journeyLineId: row.journeyLineId } })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        journeyLineId: row.journeyLineId
      }
      this.$api.deleteJourneyLineById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 显示、隐藏按钮
    onHidden (row) {
      const hiddenStatus = new Map([
        [1, { hidden: false, msg: '已隐藏' }],
        [2, { hidden: true, msg: '已显示' }]
      ])
      const params = {
        journeyLineId: row.journeyLineId,
        displayOrHidden: hiddenStatus.get(row.status).hidden
      }
      this.$api.modifyJourneyLineShowStatusById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(hiddenStatus.get(row.status).msg)
        this.getTableData()
      })
    }
  },
  computed: {
    hiddenStatus () {
      return ({ status }) => {
        if (status === 1) return '隐藏'
        if (status === 2) return '显示'
      }
    }
  },
  activated () {
    this.getTableData()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable }
}
</script>

<style lang='scss' scoped>
</style>
