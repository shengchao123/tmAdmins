<template>
  <page title="城市党建日统计表">
    <div class="search center-align mt16">
      <div class="center-align mr24">
        <span class="mr8">月份</span>
        <el-select v-model="search.date"
                   class="w240"
                   clearable
                   @change="changeDate"
                   placeholder="选择共建单位">
          <el-option v-for="item in dates"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div v-if="!currentOrgInfo.isUnitOrganization">
        <span class="mr8">单位</span>
        <el-select v-model="search.journeyCoConstructionUnitId"
                   class="w240"
                   clearable
                   placeholder="全部"
                   @change="getTableData">
          <el-option v-for="org in unitOrgIds"
                     :key="org.orgId"
                     :label="org.orgName"
                     :value="org.orgId">
          </el-option>
        </el-select>
      </div>
      <span class="mr8"
            v-else>单位：{{currentOrgInfo.name}}</span>

      <div class="flex1 tr">
        <el-button class="secondary-btn"
                   @click="onExport">导出</el-button>
      </div>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colconfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('行程单')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.findJourneyCoConstructionUnitPartyStatisticsPage)"
                class="mt16">
      <el-table-column slot="month"
                       label="月份">
        <div slot-scope="scope">
          <span>{{scope.row.month}}月</span>
        </div>
      </el-table-column>

      <el-table-column slot="operate"
                       label="操作"
                       :width="160">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onAdd(scope.row)"
                v-if="$hasAuth($urls.insertJourneyCoConstructionUnitPartyStatistics) && scope.row.status === 0 &&  currentOrgInfo.isUnitOrganization">录入</span>
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.findJourneyCoConstructionUnitPartyStatisticsPage)  && scope.row.status === 1">详情</span>
          <span class="mr16"
                v-if="scope.row.status !== 1  && !currentOrgInfo.isUnitOrganization">--</span>
          <span class="text-btn mr16"
                @click="onAdd(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyCoConstructionUnitPartyStatistics) && scope.row.status === 1 && currentOrgInfo.isUnitOrganization">编辑</span>
        </template>
      </el-table-column>
    </page-table>
    <PeopleDialog ref="peopleDialog"></PeopleDialog>
  </page>
</template>

<script>
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { timeFormat } from '@u/formatter.js'
import PeopleDialog from '@/views/map-settings/travel-bill/PeopleDialog'
import { urls } from '@/request/urls'
import { getGlobalParams } from '@u/login'

const years = ['2021', '2022']

export default {
  name: 'index',
  methods: {
    changeDate (val) {
      if (this.$isEmpty(val)) this.initDate()
      this.getTableData()
    },
    onExport () {
      if (this.table.data.length <= 0) return this.$message('暂无数据导出')
      const url = '/cb-api' + urls.exportJourneyCoConstructionUnitPartyStatistics
      const params = {
        ...this.search
      }
      if (params.date) {
        params.year = +params.date.split(',')[0]
        params.month = +params.date.split(',')[1]
        delete params.date
      }
      params.orgId = getGlobalParams('orgId')
      this.$api.exportExcel(params, url)
    },
    findUnitOrganizationList () {
      this.$api.findUnitOrganizationList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.unitOrgIds = res.content
      })
    },

    // 分页获取点位列表
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      if (params.date) {
        params.year = +params.date.split(',')[0]
        params.month = +params.date.split(',')[1]
        delete params.date
      }
      this.$api.findJourneyCoConstructionUnitPartyStatisticsPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 跳转详情页面
    onDetail (row) {
      this.$router.push({ name: 'StatisticsDetail', params: row })
    },
    // 跳转详情页面
    onAdd (row) {
      this.$router.push({ name: 'StatisticsModify', params: row })
    },
    initDate () {
      const temArr = []
      years.forEach(year => {
        for (let index = 1; index < 13; index++) {
          temArr.push({
            id: `${year},${index}`,
            name: `${year}年${index}月`
          })
        }
      })
      this.dates = temArr

      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1

      this.search.date = year + ',' + month
    }
  },
  activated () {
    this.getTableData()
  },
  created () {
    this.findUnitOrganizationList()
    this.initDate()
    this.getTableData()
  },

  computed: {
    currentOrgInfo () {
      return this.$store.state.app.currentOrgInfo
    }
  },
  data () {
    return {
      dates: [],
      unitOrgIds: [],
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'org'
        }
      ],
      table: {
        colconfig: Object.freeze([// 点位管理
          {
            label: '单位',
            prop: 'unitOrgName'
          },
          {
            slot: 'month'
          },
          {
            label: '状态',
            prop: 'statusName'
          },
          {
            label: '录入时间',
            prop: 'inputTime',
            formatter: timeFormat
          },

          {
            slot: 'operate'
          }
        ])
      },
      search: {
        journeyCoConstructionUnitId: '',
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  mixins: [TableMinxis],
  components: { PageTable, PeopleDialog }
}

</script>
