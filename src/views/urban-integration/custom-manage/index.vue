<template>
  <page title="定制管理">
    <page-search class="mt16"
                 :btnItems="btnItems"
                 :formOptions="formOptions"
                 @onInquire="onInquire"
                 @onReset="onReset">
    </page-search>
    <page-table :data="table.data"
                :cellClassName="cellClassName"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="nick"
                       label="昵称"
                       minWidth="200">
        <template slot-scope="scope">
          <span class="text-btn pointer"
                @click="onMember(scope.row)">{{scope.row.nick}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="ordersQuantity"
                       label="已接单"
                       width="270">
        <template slot-scope="scope">
          <span :class="scope.row.ordersQuantity !==0 && 'text-btn pointer'"
                v-if="$hasAuth($urls.getJourneyPlayCustomizationOrdersPage)"
                @click="onOrder(scope.row)">{{scope.row.ordersQuantity}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyPlayCustomizationById)"
                @click="onDetail('CustomDetail',scope.row.journeyPlayCustomizationId)">详情</span>
          <!-- <el-popconfirm :title="`要${statusText(scope.row.status)}该条定制信息？`"
                         cancelButtonType="取消"
                         :confirmButtonText="statusText(scope.row.status)"
                         hideIcon
                         v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyPlayCustomizationShowStatusById)"
                         @confirm="onStatusConfirm(scope.row)">
            <span class="text-btn mr16"
                  slot="reference">{{statusText(scope.row.status)}}</span>
          </el-popconfirm> -->
          <span class="text-btn mr16"
                v-if="scope.row.status !==3 && $hasAuth($urls.modifyJourneyPlayCustomizationShowStatusById)"
                @click="onStatusConfirm(scope.row)">{{statusText(scope.row.status)}}</span>
          <el-popconfirm title="要删除该条定制信息？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         v-if="scope.row.status !==3 && $hasAuth($urls.deleteJourneyPlayCustomizationById)"
                         @confirm="onDeleteConfirm(scope.row.journeyPlayCustomizationId)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>
    <order-dialog ref="orderDialog"></order-dialog>
  </page>
</template>

<script>
import pageTable from '@/components/PageTable'
import tableMixin from '@/mixins/table.js'
import pageSearch from '@c/PageSearch/index'
import { timeFormat } from '@u/formatter.js'
import OrderDialog from './OrderDialog.vue'
export default {
  name: 'index',
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置
    onReset () {
      this.search = {
        status: '',
        pageNumber: 1,
        keyword: ''
      }
      this.formOptions[2].value = ''
      this.initData()
      this.getTableData()
    },
    // 跳转会员信息
    onMember (row) {
      this.$router.push({ name: 'UserDetail', query: { id: row.memberId, backRouteName: 'CustomManage' } })
    },
    // 已接单
    onOrder (row) {
      if (row.ordersQuantity === 0) return
      this.$refs.orderDialog.show(row.journeyPlayCustomizationId)
    },
    // 详情
    onDetail (name, journeyPlayCustomizationId) {
      const route = {
        name,
        query: {
          journeyPlayCustomizationId
        }
      }
      this.$router.push(route)
    },
    // 显示隐藏
    onStatusConfirm (row) {
      const { journeyPlayCustomizationId, status } = row
      const params = {
        journeyPlayCustomizationId,
        displayOrHidden: status === 2
      }
      this.$api.modifyJourneyPlayCustomizationShowStatusById(params).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success(`${this.statusText(status)}该条定制信息成功`)
        this.getTableData()
      })
    },
    // 删除
    onDeleteConfirm (journeyPlayCustomizationId) {
      this.$api.deleteJourneyPlayCustomizationById({ journeyPlayCustomizationId }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除该条定制信息成功')
        this.getTableData()
      })
    },
    // 表格中，状态不好的，红色特殊字显示
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === 3 && columnIndex !== 4) return 'color-999'
      if (row.status === 2 && columnIndex === 4) return 'error-color'
      return ''
    },
    // 请求列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      const temDate = params.date
      if (temDate) {
        params.startTime = temDate[0]
        params.endTime = temDate[1]
        delete params.date
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyPlayCustomizationPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    },
    initData () {
      const temDate = new Date()
      const temStartTime = temDate.setHours(0, 0, 0, 0)
      const temEndTime = temDate.setHours(23, 59, 59, 0)
      // 默认显示当天日期
      this.search.date = [temStartTime, temEndTime]
      this.formOptions[1].value = [temStartTime, temEndTime]
    }
  },
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
    }
    const statusOption = Object.freeze([
      {
        name: '全部',
        id: ''
      },
      {
        name: '已显示',
        id: 1
      },
      {
        name: '已隐藏',
        id: 2
      },
      {
        name: '已删除',
        id: 3
      }
    ])
    return {
      formOptions: [
        {
          placeholder: '输入用户昵称/手机号',
          prop: 'keyword',
          value: '',
          element: 'el-input',
          events: {
            change (val) {
              changeFunction(val, 'keyword')
            }
          },
          style: {
            width: '240px'
          }
        },
        {
          label: '发布时间',
          prop: 'date',
          element: 'el-date-picker',
          valueFormat: 'timestamp',
          type: 'daterange',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'date')
            }
          },
          style: {
            width: '240px'
          }
        },
        {
          label: '状态',
          prop: 'status',
          element: 'el-select',
          value: '',
          options: statusOption,
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
      btnItems: 'inquire,reset',
      table: {
        colConfig: Object.freeze([
          {
            prop: 'code',
            label: 'ID',
            width: 224
          },
          { slot: 'nick' },
          {
            prop: 'createTime',
            label: '发布时间',
            width: 390,
            formatter: timeFormat
          },
          {
            slot: 'ordersQuantity'
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
      return (status) => {
        return status === 1 ? '隐藏' : '显示'
      }
    }
  },
  created () {
    this.initData()
    this.getTableData()
  },
  components: {
    pageTable, pageSearch, OrderDialog
  },
  mixins: [tableMixin]
}
</script>
