<template>
  <page title="联盟纳贤">
    <div class="mt16">
      <el-input placeholder="输入职位名称"
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
    <div class="mt16">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyPost)"
                 @click="onToRoute('AddPosition')">新增职位</el-button>
    </div>
    <page-table :data="table.data"
                class="mt16"
                :cellClassName="cellClassName"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('职位')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="status"
                       label="状态"
                       width="200">
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
                  v-if="$hasAuth($urls.getJourneyPostById)"
                  @click="onToRoute('PositionDetail',scope.row.id)">详情</span>
            <div v-if="scope.row.status !== 3">
              <span class="text-btn mr16"
                    v-if="$hasAuth($urls.modifyJourneyPost)"
                    @click="onToRoute('EditPosition',scope.row.id)">编辑</span>
              <span class="text-btn mr16"
                    v-if="$hasAuth($urls.modifyJourneyPostShowStatus)"
                    @click="onChangeStatus(scope.row)">{{scope.row.status === 1 ? '隐藏' : '显示'}}</span>
              <el-popconfirm title="要删除该职位？"
                             cancelButtonType="取消"
                             confirmButtonText="删除"
                             hideIcon
                             @confirm="onDeleteConfirm(scope.row.id)"
                             v-if="$hasAuth($urls.removeJourneyPost)">
                <span class="text-btn"
                      slot="reference">删除</span>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>
<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import { timeFormat } from '@u/formatter.js'
export default {
  name: 'index',
  methods: {
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
      const msg = status === 1 ? '隐藏' : '显示'
      const params = {
        id,
        isShow: status !== 1
      }
      this.$api.modifyJourneyPostShowStatus(params).then(res => {
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
      this.$api.removeJourneyPost({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除职位成功')
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
      this.$api.getJourneyPostPage(params).then(res => {
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
            label: '职位名称',
            width: 280
          },
          {
            prop: 'companyName',
            label: '单位名称'
          },
          {
            prop: 'publishingDepartment',
            label: '发布单位',
            width: 254
          },
          {
            prop: 'createTime',
            label: '发布时间',
            formatter: timeFormat,
            width: 240
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
</style>
