<template>
  <page title="商家展位管理">
    <table-search :tableSearchData="tableSearchData"
                  :search.sync="search"
                  @getTableData="onInquire"></table-search>
    <page-table :data="table.data"
                class="mt16"
                :cellClassName="cellClassName"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="192">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyMerchantBoothById)"
                @click="onBooth('BoothDetail',scope.row.journeyMerchantBoothId)">详情</span>
          <span class="text-btn mr16"
                v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyMerchantBoothById)"
                @click="onBooth('EditBooth',scope.row.journeyMerchantBoothId)">编辑</span>
          <!-- <el-popconfirm :title="`要${statusText(scope.row.status)}该展位？`"
                         cancelButtonType="取消"
                         :confirmButtonText="statusText(scope.row.status)"
                         hideIcon
                         @confirm="onStatusConfirm(scope.row)"
                         v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyProductShowStatusById)">
            <span class="text-btn mr16"
                  slot="reference">{{statusText(scope.row.status)}}</span>
          </el-popconfirm> -->
          <span class="text-btn mr16"
                v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyMerchantBoothShowStatusById)"
                @click="onStatusConfirm(scope.row)">{{statusText(scope.row.status)}}</span>
          <el-popconfirm title="要删除该展位？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.journeyMerchantBoothId)"
                         v-if="scope.row.status !==3 && $hasAuth($urls.deleteJourneyMerchantBoothById)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import TableSearch from '../components/TableSearch.vue'
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
export default {
  name: 'index',
  methods: {
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 详情
    onBooth (name, journeyMerchantBoothId) {
      const route = {
        name,
        query: {
          journeyMerchantBoothId
        }
      }
      this.$router.push(route)
    },
    // 显示隐藏
    onStatusConfirm (row) {
      const { journeyMerchantBoothId, status } = row
      const params = {
        journeyMerchantBoothId,
        displayOrHidden: status === 2
      }
      this.$api.modifyJourneyMerchantBoothShowStatusById(params).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success(`${this.statusText(status)}展位成功`)
        this.getTableData()
      })
    },
    // 删除
    onDeleteConfirm (journeyMerchantBoothId) {
      this.$api.deleteJourneyMerchantBoothById({ journeyMerchantBoothId }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除展位成功')
        this.getTableData()
      })
    },
    // 表格中，状态不好的，红色特殊字显示
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === 3 && columnIndex !== 4) return 'color-999'
      if (row.status === 2 && columnIndex === 4) return 'error-color'
      return ''
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      if (params.status === 'all') delete params.status
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyMerchantBoothPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    return {
      tableSearchData: Object.freeze({
        placeholder: '输入展位名称',
        statusOptions: [
          { id: 'all', name: '全部' },
          {
            id: 1,
            name: '已显示'
          },
          {
            id: 2,
            name: '已隐藏'
          },
          {
            id: 3,
            name: '已删除'
          }
        ]
      }),
      search: {
        status: 'all'
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'code',
            label: 'ID',
            width: 200
          },
          {
            prop: 'title',
            label: '展位名称',
            minWidth: 300
          },
          {
            prop: 'address',
            label: '地址',
            width: 390
          },
          {
            prop: 'contactPhone',
            label: '联系电话',
            width: 270
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 226
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  computed: {
    statusText () {
      return (val) => {
        return val === 1 ? '隐藏' : '显示'
      }
    }
  },
  components: {
    TableSearch, PageTable
  },
  activated () {
    this.getTableData()
  },
  mixins: [TableMixins]
}
</script>
