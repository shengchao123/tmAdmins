<template>
  <page title="优选产品管理">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入产品名称"
                  class="w240"
                  @clear="onInquire"
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
    </page-search>
    <el-button type="primary"
               v-if="$hasAuth($urls.createJourneyProduct)"
               @click="onProduct('AddProduct')">新增产品</el-button>
    <page-table :data="table.data"
                class="mt16"
                :cellClassName="cellClassName"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('产品')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="192">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyProductByIdReq)"
                @click="onProduct('ProductDetail',scope.row.journeyProductId)">详情</span>
          <span class="text-btn mr16"
                v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyProductById)"
                @click="onProduct('EditProduct',scope.row.journeyProductId)">编辑</span>
          <!-- <el-popconfirm :title="`要${statusText(scope.row.status)}该产品？`"
                         cancelButtonType="取消"
                         :confirmButtonText="statusText(scope.row.status)"
                         hideIcon
                         @confirm="onStatusConfirm(scope.row)"
                         v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyProductShowStatusById)">
            <span class="text-btn mr16"
                  slot="reference">{{statusText(scope.row.status)}}</span>
          </el-popconfirm> -->
          <span class="text-btn mr16"
                v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyProductShowStatusById)"
                @click="onStatusConfirm(scope.row)">{{statusText(scope.row.status)}}</span>
          <el-popconfirm title="要删除该产品？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.journeyProductId)"
                         v-if="scope.row.status !==3 && $hasAuth($urls.deleteJourneyProductById)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
export default {
  name: 'index',
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        keyword: '',
        status: 'all',
        classification: 'all',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 新增、编辑、详情
    onProduct (name, journeyProductId) {
      const route = {
        name,
        query: {
          journeyProductId
        }
      }
      if (name === 'AddProduct') {
        delete route.query
      }
      this.$router.push(route)
    },
    // 显示隐藏
    onStatusConfirm (row) {
      const { journeyProductId, status } = row
      const params = {
        journeyProductId,
        displayOrHidden: status === 2
      }
      this.$api.modifyJourneyProductShowStatusById(params).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success(`${this.statusText(status)}产品成功`)
        this.getTableData()
      })
    },
    // 删除
    onDeleteConfirm (journeyProductId) {
      this.$api.deleteJourneyProductById({ journeyProductId }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除产品成功')
        this.getTableData()
      })
    },
    // 表格中，状态不好的，红色特殊字显示
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === 3 && columnIndex !== 5) return 'color-999'
      if (row.status === 2 && columnIndex === 5) return 'error-color'
      return ''
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      if (params.status === 'all') delete params.status
      if (params.classification === 'all') delete params.classification
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyProductPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    },
    // 获取分类列表
    findProductClassification () {
      this.$api.findProductClassification().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.formOptions[1].options = [{ name: '全部', id: 'all' }, ...res.content]
      })
    }
  },
  data () {
    const getSearchOption = (val, key) => {
      this.search[key] = val
    }
    const statusOption = Object.freeze([
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
    ])
    return {
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          label: '分类',
          prop: 'classification',
          element: 'el-select',
          placeholder: '请选择',
          options: [],
          value: 'all',
          events: {
            change (val) {
              getSearchOption(val, 'classification')
            }
          },
          style: {
            width: '120px'
          }
        },
        {
          label: '状态',
          prop: 'status',
          element: 'el-select',
          placeholder: '请选择',
          options: statusOption,
          value: 'all',
          events: {
            change (val) {
              getSearchOption(val, 'status')
            }
          },
          style: {
            width: '120px'
          }
        }

      ],
      btnItems: 'inquire,reset',
      search: {
        keyword: '',
        status: 'all',
        classification: 'all'
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'code',
            label: 'ID',
            width: 120
          },
          {
            prop: 'name',
            label: '产品名称',
            minWidth: 400
          },
          {
            prop: 'classificationName',
            label: '分类',
            width: 160
          },
          {
            prop: 'origin',
            label: '产地',
            width: 270
          },
          {
            prop: 'publishingDepartment',
            label: '选送单位',
            width: 270
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 160
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
    PageSearch, PageTable
  },
  activated () {
    this.findProductClassification()
    this.getTableData()
  },
  mixins: [TableMixins]
}
</script>
