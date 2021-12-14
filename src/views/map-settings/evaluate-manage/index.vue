<template>
  <page title="评价管理"
        needPadding>
    <page-search class="mt16"
                 :btnItems="btnItems"
                 :formOptions="formOptions"
                 @onInquire="onInquire"
                 @onReset="onReset">
    </page-search>
    <page-table :data="table.data"
                :col-configs="table.configs"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText()"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.getItineraryEvaluationPage)">
      <el-table-column slot="nick"
                       width="212"
                       label="发布人">
        <template slot-scope="scope">
          <span class="primary-color pointer"
                @click="onMember(scope.row)">{{scope.row.nick}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="heat"
                       width="170"
                       label="热度">
        <div slot="header"
             class="center-align">
          <span>热度</span>
          <el-popover placement="top"
                      width="200"
                      trigger="hover">
            <svg-icon slot="reference"
                      icon="icon_wenhao"
                      class="color-999 ft16 ml4 mt4"></svg-icon>
            <div class="color-333 pb8">
              <p class="bold mb12">热度</p>
              <span>各维度指标综合计算的值，以此衡量是否值得推荐，并用于后期的自动推荐算法</span>
            </div>
          </el-popover>
        </div>
        <template slot-scope="scope">
          <span class="primary-color pointer"
                @click="onHeat(scope.row)">{{scope.row.heat}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="statusName"
                       width="170"
                       label="状态">
        <template slot-scope="scope">
          <span :class="statusName(scope.row.status)">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="148">
        <template slot-scope="scope"
                  class="primary-color">
          <span class="text-btn mr16"
                @click="onDetail(scope.row.id)"
                v-if="$hasAuth($urls.getItineraryEvaluationInfoById)">详情</span>
          <span class="text-btn mr16"
                @click="onModifyNote(scope.row,2)"
                v-if="$hasAuth($urls.modifyItineraryEvaluationStatus) && operateStatus(scope.row.status)">{{hiddenStatus(scope.row.status)}}</span>
          <el-popconfirm title="要删除该评价？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onModifyNote(scope.row,3)"
                         v-if="$hasAuth($urls.modifyItineraryEvaluationStatus)">
            <span class="text-btn mr12"
                  slot="reference">{{deleteStatus(scope.row.status)}}</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
    <heat-detail ref="heatDetail"></heat-detail>
  </page>
</template>
<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { evaluateManage } from '@u/enum'
import HeatDetail from './components/HeatDetail'
export default {
  name: 'NoteManage',
  methods: {
    // 查询按钮
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        date: [],
        status: '',
        keyword: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 详情按钮
    onDetail (id) {
      this.$router.push({ name: 'EvaluateDetail', query: { id } })
    },
    // 查看热度明细
    onHeat (row) {
      if (!this.$hasAuth(this.$urls.getItineraryEvaluationStatisticsInfoById)) {
        return this.$message.warning('无权限查看')
      }
      const heatDetail = this.$refs.heatDetail
      heatDetail.id = row.id
      heatDetail.heatNum = row.heat
      heatDetail.heatStatus = true
      heatDetail.getOperates()
    },
    // 隐藏/显示/删除按钮
    onModifyNote (row, type) {
      let status = null
      let msg = ''
      if (type === 2) { // 显示、隐藏接口
        row.status === 1 ? status = 2 : status = 1
        row.status === 1 ? msg = '已隐藏' : msg = '已显示'
      } else if (type === 3) { // 删除接口
        status = 3
        msg = '已删除'
      }
      const params = {
        id: row.id,
        status: status
      }
      this.$api.modifyItineraryEvaluationStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(msg)
        this.getTableData()
      })
    },
    // 获取帖子列表数据
    getTableData () {
      const table = this.table
      table.isLoading = true
      const params = this.dealParams()
      this.$api.getItineraryEvaluationPage(params).then(res => {
        table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content?.items ?? []
        table.total = res.content?.count ?? 0
      })
    },
    // 处理接口数据
    dealParams () {
      const params = {
        ...this.search
      }
      if (params.date) {
        params.startDate = params.date[0]
        params.endDate = params.date[1]
        delete params.date
      }
      return params
    },
    // 跳转会员信息
    onMember (row) {
      this.$router.push({ name: 'UserDetail', query: { id: row.memberId, backRouteName: 'EvaluateManage' } })
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
    },
    // 删除按钮状态
    deleteStatus () {
      return (status) => {
        return status !== 3 ? '删除' : ''
      }
    },
    // 按钮状态
    operateStatus () {
      return (status) => {
        return status !== 3
      }
    }
  },
  created () {
    this.getTableData()
  },
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
    }
    return {
      formOptions: [
        {
          label: '',
          prop: 'keyword',
          element: 'el-input',
          show: true,
          placeholder: '请输入标题',
          events: {
            change (val) {
              changeFunction(val, 'keyword')
            }
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
          }
        },
        {
          label: '状态',
          prop: 'status',
          element: 'el-select',
          placeholder: '全部',
          value: '',
          options: [{ name: '已发布', id: 1 }, { name: '已隐藏', id: 2 }, { name: '已删除', id: 3 }],
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
      search: {
        status: ''
      },
      table: {
        configs: evaluateManage
      },
      btnItems: 'inquire,reset'
    }
  },
  components: { PageSearch, PageTable, HeatDetail },
  mixins: [TableMinxis]
}
</script>
<style lang='scss' scoped>
.disable {
  color: #999999 !important;
  cursor: unset;
}
</style>
