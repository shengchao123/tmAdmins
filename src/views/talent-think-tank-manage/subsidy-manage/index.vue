<template>
  <page title="无感直补管理">
    <div class="mt16">
      <el-input placeholder="输入项目标题"
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
               v-if="$hasAuth($urls.createAgricultureRelatedProjects)"
               @click="onToRoute('AddSubsidy')">新增项目</el-button>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('项目')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="140">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getAgricultureRelatedProjectsById)"
                @click="onToRoute('SubsidyDetail',scope.row.id)">详情</span>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.modifyAgricultureRelatedProjects)"
                @click="onToRoute('EditSubsidy',scope.row.id)">编辑</span>
          <el-popconfirm title="要删除该项目？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.id)"
                         v-if="$hasAuth($urls.removeAgricultureRelatedProjects)">
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
      if (type === 'AddSubsidy') {
        delete route.query
      }
      this.$router.push(route)
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.removeAgricultureRelatedProjects({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除项目成功')
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
      this.$api.getAgricultureRelatedProjectsPage(params).then(res => {
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
            width: 320
          },
          {
            prop: 'publishingDepartment',
            label: '发布单位',
            width: 320
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
