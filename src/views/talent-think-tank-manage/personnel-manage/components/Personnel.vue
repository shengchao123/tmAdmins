<template>
  <div>
    <div class="between-row">
      <div class="mt16">
        <el-input placeholder="输入姓名"
                  class="w240"
                  @blur="onSearch"
                  @keyup.enter.native="onSearch"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onSearch"></i>
        </el-input>
        <span class="ml24">状态</span>
        <el-select class="w120 ml8"
                   v-model="status"
                   @change="changeSelect">
          <el-option v-for="item in statusOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="secondary-btn export-btn"
                 @click="onExport">导出</el-button>
    </div>
    <div class="mt16">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyTalents)"
                 @click="onToRoute('AddPersonnel')">新增人才</el-button>
    </div>
    <page-table :data="table.data"
                class="mt16"
                :cellClassName="cellClassName"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('人才')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="status"
                       label="状态"
                       width="180">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '已显示' : scope.row.status === 2 ? '已隐藏' : '已删除'}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="184">
        <template slot-scope="scope">
          <div class="flex">
            <span class="text-btn mr16"
                  v-if="$hasAuth($urls.getJourneyTalentsById)"
                  @click="onToRoute('PersonnelDetail',scope.row.id)">详情</span>
            <div v-if="scope.row.status !== 3">
              <span class="text-btn mr16"
                    v-if="$hasAuth($urls.modifyJourneyTalents)"
                    @click="onToRoute('EditPersonnel',scope.row.id)">编辑</span>
              <span class="text-btn mr16"
                    v-if="$hasAuth($urls.displayJourneyTalents)"
                    @click="onChangeStatus(scope.row)">{{scope.row.status === 1 ? '隐藏' : '显示'}}</span>
              <el-popconfirm title="要删除该人才？"
                             cancelButtonType="取消"
                             confirmButtonText="删除"
                             hideIcon
                             @confirm="onDeleteConfirm(scope.row.id)"
                             v-if="$hasAuth($urls.removeJourneyTalents)">
                <span class="text-btn"
                      slot="reference">删除</span>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>
<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import { serviceTypeFormatter, registerFormatter } from './filter.js'
import { urls } from '@/request/urls'
export default {
  name: 'Personnel',
  methods: {
    // 导出按钮
    onExport () {
      if (this.table.data.length <= 0) return this.$message('暂无数据导出')
      const url = '/cb-api' + urls.exportTalentsList
      const params = {
        ...this.search
      }
      this.$api.exportExcel(params, url)
    },
    changeSelect (status) {
      this.search = {
        ...this.search,
        status
      }
      this.getTableData()
    },
    // 表格中，状态不好的，红色特殊字显示
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === 3) {
        if (columnIndex === 5) {
          return 'nomarl'
        } else {
          return 'color-999'
        }
      }
      if (row.status === 2) {
        if (columnIndex === 5) {
          return 'error-color'
        } else {
          return 'nomarl'
        }
      }
      return ''
    },
    onChangeStatus (row) {
      const { status, id } = row
      const apiName = status === 1 ? 'hideJourneyTalents' : 'displayJourneyTalents'
      const msg = status === 1 ? '隐藏' : '显示'
      const params = {
        id
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.$message.success(msg + '成功')
        this.getTableData()
      })
    },
    // 新增、编辑、详情
    onToRoute (type, id) {
      const route = {
        name: type,
        query: {
          id
        }
      }
      if (type === 'AddPolicy') {
        delete route.query
      }
      this.$router.push(route)
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.removeJourneyTalents({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除人才成功')
        this.getTableData()
      })
    },
    // 搜索
    onSearch () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyTalentsPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    return {
      status: '',
      statusOptions: Object.freeze([
        {
          label: '全部',
          value: ''
        },
        {
          label: '已显示',
          value: 1
        },
        {
          label: '已隐藏',
          value: 2
        },
        {
          label: '已删除',
          value: 3
        }
      ]),
      table: {
        colConfig: Object.freeze([
          {
            prop: 'id',
            label: 'ID',
            width: 224
          },
          {
            prop: 'name',
            label: '姓名',
            width: 258
          },
          {
            prop: 'type',
            label: '类型'
          },
          {
            prop: 'serviceType',
            label: '服务方式',
            formatter: serviceTypeFormatter,
            width: 296
          },
          {
            prop: 'isRegistered',
            label: '是否注册',
            formatter: registerFormatter,
            width: 180
          },
          {
            slot: 'status'
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  activated () {
    this.getTableData()
  },
  mixins: [TableMixins],
  components: {
    PageTable
  }
}
</script>
<style scoped>
.nomarl {
  color: #606266;
}
.export-btn {
  margin-top: 16px;
}
</style>
