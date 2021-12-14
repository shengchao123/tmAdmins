<template>
  <page title="点位管理">
    <page-search :formOptions="formOptions"
                 btnItems="inquire reset"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="pointName">
        <el-input placeholder="输入点位名称"
                  class="w240"
                  clearable
                  @clear="onInquire"
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
      <div slot="regionsCode"
           class="flex">
        <div class="mr8">行政区域</div>
        <el-select v-model="search.regionsCode"
                   clearable
                   @change="onInquire"
                   class="w240">
          <el-option v-for="item in regionsOptions"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code"></el-option>
        </el-select>
      </div>
    </page-search>
    <div>
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyPoint)"
                 @click="onAddPoint">新增点位</el-button>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colconfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('点位')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.getJourneyPointPage)"
                class="mt16">
      <el-table-column slot="data"
                       label="数据"
                       width="248">
        <div slot-scope="scope">
          <span class="mr16">访客 ({{scope.row.visitorsCount}})</span>
          <span>打卡 ({{scope.row.clockInCount}})</span>
        </div>
      </el-table-column>
      <el-table-column slot="statusName"
                       label="状态"
                       width="128">
        <template slot-scope="scope">
          <span :class="scope.row.status === 2?'error-color':''">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="192">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getJourneyPointById)">详情</span>
          <span class="text-btn mr16"
                @click="onEdit(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyPoint) && scope.row.status !== 3">编辑</span>
          <span class="text-btn mr16"
                @click="onHidden(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyLineShowStatusById) && scope.row.status !== 3">{{hiddenStatus(scope.row)}}</span>
          <el-popconfirm title="要删除该点位？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(scope.row)"
                         v-if="$hasAuth($urls.deleteJourneyPointById) && scope.row.status !== 3">
            <span class="text-btn mr12"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { pointColConfig, pointType } from '@u/enum'

export default {
  name: 'index',
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
    }
    return {
      formOptions: [
        {
          slot: 'pointName'
        },
        {
          slot: 'regionsCode'
        },
        {
          label: '功能分类',
          placeholder: '选择分类',
          prop: 'type',
          options: pointType,
          element: 'el-select',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'type')
            }
          }
        },
        {
          label: '状态',
          placeholder: '选择状态',
          prop: 'status',
          options: [{ name: '已显示', id: 1 }, { name: '已隐藏', id: 2 }, { name: '已删除', id: 3 }],
          element: 'el-select',
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
        colconfig: pointColConfig
      },
      search: {
        keyword: '',
        regionsCode: ''
      },
      regionsOptions: []
    }
  },
  methods: {
    // 查询按钮
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        keyword: '',
        regionsCode: '',
        type: '',
        status: '',
        pageSize: 10,
        pageNumber: 1
      }
      this.getTableData()
    },
    // 新增点位
    onAddPoint () {
      this.$router.push({ name: 'AddPoint' })
    },
    // 分页获取点位列表
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      this.$api.getJourneyPointPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 跳转详情页面
    onDetail (row) {
      this.$router.push({ name: 'PointDetail', query: { journeyPointId: row.journeyPointId } })
    },
    // 跳转编辑页面
    onEdit (row) {
      this.$router.push({ name: 'EditPoint', query: { journeyPointId: row.journeyPointId } })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        journeyPointId: row.journeyPointId
      }
      this.$api.deleteJourneyPointById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 获取行政区域列表
    getRegionsList () {
      this.$api.getJourneyRegionsList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.regionsOptions = res.content ?? []
      })
    },
    //  显示、隐藏按钮
    onHidden (row) {
      const hiddenStatus = new Map([
        [1, { hidden: false, msg: '已隐藏' }],
        [2, { hidden: true, msg: '已显示' }]
      ])
      const params = {
        journeyPointId: row.journeyPointId,
        displayOrHidden: hiddenStatus.get(row.status).hidden
      }
      this.$api.modifyJourneyPointShowStatusById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(hiddenStatus.get(row.status).msg)
        this.getTableData()
      })
    }
  },
  computed: {
    hiddenStatus () {
      return ({ status }) => {
        if (status === 1) return '隐藏'
        if (status === 2) return '显示'
      }
    }
  },
  activated () {
    this.getRegionsList()
    this.getTableData()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable }
}
</script>
