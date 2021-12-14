<template>
  <page title="报事管理">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入报事人姓名"
                  class="w240"
                  clearable
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
      <div slot="status">
        <el-select v-model="search.status"
                   class="w240"
                   placeholder="选择状态">
          <el-option v-for="item in selectOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </page-search>

    <page-table v-if="$hasAuth($urls.findJourneyCommunityProblemPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :isShowIndex="true"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('报事')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :width="98"
                class="mt16">

      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="180">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.findJourneyCommunityProblemById)">详情</span>
          <span class="text-btn mr16"
                @click="onHandle(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyCommunityProblemStatus) && (scope.row.status === 0 || scope.row.status === 1)">处理</span>
          <el-popconfirm title="要删除该报事？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(scope.row)">
            <span class="text-btn"
                  v-if="$hasAuth($urls.deleteJourneyCommunityProblem) && scope.row.status === 0"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
    <HandleDialog ref="handle"
                  @success="getTableData"></HandleDialog>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { timeFormat } from '@/utils/formatter.js'
import HandleDialog from './HandleDialog'
export default {
  name: 'index',

  methods: {
    onHandle (row) {
      this.$refs.handle.show(row)
    },
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置
    onReset () {
      this.search = {
        keyword: '',
        filterOrgId: '',
        pageNumber: 1,
        pageSize: 10
      }
    },
    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      this.$api.findJourneyCommunityProblemPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content?.items ?? []
        table.total = res.content?.count ?? 0
      })
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'CommunityMatterDetail', query: { id: row.id } })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.deleteJourneyCommunityProblem(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    }
  },
  data () {
    return {
      btnItems: 'inquire,reset',
      selectOptions: Object.freeze([
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '未受理'
        },
        {
          value: 1,
          label: '受理中'
        },
        {
          value: 2,
          label: '已完结'
        }
      ]),
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'status'
        }
      ],
      table: {
        colConfig: Object.freeze([// 路线管理
          {
            label: '报事人',
            prop: 'memberName',
            minWidth: 300
          },
          {
            label: '所在社区',
            prop: 'communityOrgName',
            width: 320
          },
          {
            label: '提交时间',
            prop: 'createTime',
            formatter: timeFormat,
            width: 360
          },

          {
            label: '状态',
            prop: 'statusName',
            width: 240
          },
          {
            slot: 'operate'
          }
        ])
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  computed: {
    orgs () {
      return this.$store.state.app.orgs
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable, HandleDialog }
}
</script>

<style lang='scss' scoped>
.cascader-company {
  width: 240px;
}
</style>
