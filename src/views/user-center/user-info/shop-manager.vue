<template>
  <page title="红心商城管理">
    <page-search class="mt16"
                 :formOptions="formOptions">
    </page-search>
    <div class="mb16">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyRedHeartProduct)"
                 @click="addProduction">新增产品</el-button>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :width="94"
                class="page_table"
                emptyText="暂无数据"
                :cell-class-name="tableCellClassName"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column width="160"
                       slot='status'
                       label="状态">
        <template slot-scope="scope">
          <span :class="statusName(scope.row.status)">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="264"
                       slot='sum'
                       label="核销/兑换/过期">
        <template slot-scope="scope">
          <span :class="[scope.row.status !==3 ?'primary-color pointer':'']"
                @click="toExchange(scope.row)">{{scope.row.verificationNum}}/{{scope.row.redeemNum}}/{{scope.row.expirationNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       slot='operate'
                       width="190">
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="$hasAuth($urls.getJourneyProductById)"
                     @click="onDetail(scope.row)">详情</el-button>
          <el-button type="text"
                     v-if="$hasAuth($urls.modifyJourneyRedHeartProductById) && scope.row.status !== 3"
                     @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="text"
                     v-if="$hasAuth($urls.modifyJourneyRedHeartProductShowStatusById) && scope.row.status !== 3"
                     @click="onHidden(scope.row)">{{hiddenStatus(scope.row.status)}}</el-button>
          <el-popconfirm :title="`要删除该产品?`"
                         cancelButtonType=""
                         hideIcon
                         v-if="$hasAuth($urls.deleteJourneyRedHeartProductById) && scope.row.status !== 3"
                         @confirm="onDelete(scope.row)">
            <el-button type="text"
                       class="ml16"
                       slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import TableMixin from '@/mixins/table.js'
import PageTable from '@c/PageTable.vue'
import PageSearch from '@c/PageSearch/index.vue'

export default {
  name: 'shopManager',
  methods: {
    // 跳转兑换记录
    toExchange ({ journeyRedHeartProductId, status }) {
      if (status === 3) return
      this.$router.push({ name: 'RedHeart', query: { id: journeyRedHeartProductId } })
    },
    // 新增产品
    addProduction () {
      this.$router.push({ name: 'ShopProductAdd' })
    },
    // 详情按钮
    onDetail ({ journeyRedHeartProductId }) {
      this.$router.push({ name: 'ShopProductDetail', query: { id: journeyRedHeartProductId } })
    },
    // 编辑
    onEdit ({ journeyRedHeartProductId }) {
      this.$router.push({ name: 'ShopProductEdit', query: { id: journeyRedHeartProductId } })
    },
    // 删除按钮 TODO: 删除了,接口成功，状态还是没变
    onDelete ({ journeyRedHeartProductId }) {
      const params = {
        journeyRedHeartProductId
      }
      this.$api.modifyJourneyRedHeartProductShowStatusById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('已删除')
        this.getTableData()
      })
    },
    // 显示、隐藏按钮
    onHidden ({ journeyRedHeartProductId, status }) {
      const params = {
        journeyRedHeartProductId,
        displayOrHidden: status === 2
      }
      this.$api.modifyJourneyRedHeartProductShowStatusById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(status === 2 ? '已显示' : '已隐藏')
        this.getTableData()
      })
    },
    // 请求列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search,
        ...this.searchData
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyRedHeartProductPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        const { count, items } = res.content
        this.table.total = count
        this.table.data = items
      })
    },
    // 列表单元格根据状态显示不同样式
    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === 3) {
        return 'color-999'
      }
    }
  },
  data () {
    const changeFunction = (val, key) => {
      this.searchData[key] = val
      this.getTableData()
    }
    return {
      searchData: {},
      formOptions: [
        {
          label: '',
          placeholder: '输入产品名称',
          prop: 'keyword',
          value: '',
          element: 'el-input',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'keyword')
            }
          }
        },
        {
          label: '状态',
          placeholder: '全部',
          prop: 'status',
          element: 'el-select',
          value: '',
          options: [{ name: '显示', id: 1 }, { name: '隐藏', id: 2 }, { name: '删除', id: 3 }],
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
        colConfig: Object.freeze([
          {
            prop: 'journeyRedHeartProductId',
            label: 'ID',
            width: 184
          },
          {
            prop: 'name',
            label: '产品名称',
            minWidth: 200
          },
          {
            prop: 'merchantName',
            label: '商家名称',
            width: 270
          },
          {
            prop: 'redHeart',
            label: '红心值',
            width: 160
          },
          {
            slot: 'sum'
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
  computed: {
    // 状态的颜色
    statusName () {
      return (status) => {
        if (status === 2) return 'error-color'
      }
    },
    // 显示、隐藏按钮状态
    hiddenStatus () {
      return (status) => {
        return status === 1 ? '隐藏' : status === 2 ? '显示' : ''
      }
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [TableMixin],
  components: { PageTable, PageSearch }
}
</script>
<style lang='scss' scoped>
.page_table {
  /deep/ .el-button {
    min-width: 30px !important;
    padding: 0 !important;
  }
}
</style>
