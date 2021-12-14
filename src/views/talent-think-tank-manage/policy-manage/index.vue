<template>
  <page title="政策管理">
    <div class="mt16">
      <el-input placeholder="输入政策标题"
                class="w240"
                @blur="onSearch"
                @keyup.enter.native="onSearch"
                v-model="search.keyword">
        <i slot="suffix"
           class="el-input__icon el-icon-search pointer"
           @click="onSearch"></i>
      </el-input>
    </div>
    <el-button type="primary"
               class="mt16"
               v-if="$hasAuth($urls.createJourneyPolicy)"
               @click="onToRoute('AddPolicy')">新增政策</el-button>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('政策')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="140">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyPolicyById)"
                @click="onToRoute('PolicyDetail',scope.row.id)">详情</span>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.modifyJourneyPolicy)"
                @click="onToRoute('EditPolicy',scope.row.id)">编辑</span>
          <el-popconfirm title="要删除该政策？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.id)"
                         v-if="$hasAuth($urls.removeJourneyPolicy)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>
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
      this.$api.removeJourneyPolicy({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除联盟成功')
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
      this.$api.getJourneyPolicyPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    return {
      table: {
        colConfig: Object.freeze([
          {
            prop: 'id',
            label: 'ID',
            width: 224
          },
          {
            prop: 'title',
            label: '标题'
          },
          {
            prop: 'createTime',
            label: '发布时间',
            formatter: timeFormat,
            width: 280
          },
          {
            prop: 'publishingDepartment',
            label: '发布单位',
            width: 340
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
