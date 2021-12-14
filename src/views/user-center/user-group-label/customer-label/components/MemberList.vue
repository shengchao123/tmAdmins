<template>
  <div class='member-list-wrap'>
    <page-search class="mt16"
                 :formOptions="formOptions" />
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                emptyText="暂无用户信息"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="60">
        <template slot-scope="scope">
          <span class="text-btn"
                @click="onToDetail(scope.row)">详情
          </span>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>
<script>
import TableMixin from '@/mixins/table.js'
import { timeFormat } from '@/utils/formatter.js'
import PageSearch from '@c/PageSearch/index.vue'
import PageTable from '@c/PageTable.vue'

export default {
  name: 'MemberList',
  methods: {
    // 跳转到详情
    onToDetail (row) {
      const route = {
        name: 'UserDetail',
        query: {
          id: row.id
        }
      }
      this.$router.push(route)
    },
    getTableData () { // 获取列表
      if (this.$isEmpty(this.memberLabelList)) return
      this.table.isLoading = true
      const memberLabelIds = this.memberLabelList.map(item => {
        return item.memberLabelId
      })
      const query = {
        memberLabelIds,
        ...this.search
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.getMembersPage(query).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        const { items, count } = res.content
        this.table.data = items
        this.table.total = count
      })
    }
  },
  data () {
    const changeFunction = (val, key) => {
      if (key === 'timeRange') {
        if (!this.$isEmpty(val)) {
          this.search.startDate = val[0]
          this.search.endDate = val[1]
        }
      } else {
        this.search[key] = val
      }
      this.getTableData()
    }
    return {
      memberLabelList: [],
      formOptions: [
        {
          show: true,
          label: '用户信息',
          placeholder: '请输入用户姓名/手机号',
          prop: 'keyword',
          element: 'el-input',
          events: {
            change (val) {
              changeFunction(val, 'keyword')
            }
          }
        },
        {
          show: true,
          label: '注册时间',
          prop: 'timeRange',
          element: 'el-date-picker',
          valueFormat: 'yyyy-MM-dd',
          type: 'daterange',
          clearable: false,
          events: {
            change (val) {
              changeFunction(val, 'timeRange')
            }
          }
        }
      ],
      search: {
        startDate: '',
        endDate: ''
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'id',
            label: '用户ID'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'phone',
            label: '手机号'
          },
          {
            prop: 'redHeartBalance',
            label: '红心值'
          },
          {
            prop: 'createTime',
            label: '注册时间',
            formatter: timeFormat,
            width: 200
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  created () {
    // this.getTableData()
  },
  mixins: [TableMixin],
  components: { PageSearch, PageTable }
}
</script>

<style lang='scss' scoped>
</style>
