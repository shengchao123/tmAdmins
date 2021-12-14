<template>
  <page title="行程单管理">
    <page-search :formOptions="formOptions"
                 btnItems="inquire reset"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="召集人姓名"
                  class="w240"
                  clearable
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
    </page-search>

    <div class="tr">
      <el-button class="secondary-btn"
                 @click="onExport">导出</el-button>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colconfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('行程单')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.findJourneyItineraryPage)"
                class="mt16">
      <el-table-column slot="needLifeDocumentary"
                       label="组织生活记录"
                       width="120">
        <div slot-scope="scope">
          <span>{{scope.row.needLifeDocumentary ? '需要': '不需要'}}</span>
        </div>
      </el-table-column>
      <el-table-column slot="data"
                       label="数据"
                       width="248">
        <div slot-scope="scope">
          <span class="mr16">报名 (<span class="text-btn"
                  @click="viewSignUp(scope.row)">{{scope.row.signUpNum}}</span>)</span>
          <span>打卡 (<span class="text-btn"
                  @click="viewSignIn(scope.row)">{{scope.row.signInNum}}</span>)</span>
        </div>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="80">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.findJourneyItineraryPage)">详情</span>
        </template>
      </el-table-column>
    </page-table>
    <PeopleDialog ref="peopleDialog"></PeopleDialog>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { timeFormat } from '@u/formatter.js'
import PeopleDialog from '@/views/map-settings/travel-bill/PeopleDialog'
import { urls } from '@/request/urls'
import { getGlobalParams } from '@u/login'
export default {
  name: 'index',
  methods: {
    viewSignUp (row) {
      if (row.signUpNum === 0) return
      this.$refs.peopleDialog.show(row, 'up')
    },
    viewSignIn (row) {
      if (row.signUpNum === 0) return
      this.$refs.peopleDialog.show(row, 'in')
    },
    onExport () {
      if (this.table.data.length <= 0) return this.$message('暂无数据导出')
      const url = '/cb-api' + urls.exportJourneyItineraryList
      const params = {
        ...this.search
      }
      params.orgId = getGlobalParams('orgId')
      this.$api.exportExcel(params, url)
    },
    // 查询按钮
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        pageSize: 10,
        pageNumber: 1
      }
      this.getTableData()
    },

    // 分页获取点位列表
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      this.$api.findJourneyItineraryPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 跳转详情页面
    onDetail (row) {
      this.$router.push({ name: 'TravelDetail', params: row })
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
          slot: 'keyword'
        },
        {
          label: '活动类型',
          prop: 'activityType',
          element: 'el-select',
          placeholder: '全部',
          options: [{ name: '党组活动', id: '01' }, { name: '学习教育', id: '02' }, { name: '观光游览', id: '03' }, { name: '其他', id: '04' }],
          value: '',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'activityType')
            }
          }
        },
        {
          label: '组织生活记录表',
          placeholder: '全部',
          prop: 'needLifeDocumentary',
          options: [{ name: '需要', id: true }, { name: '不需要', id: false }],
          element: 'el-select',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'needLifeDocumentary')
            }
          }
        }
      ],
      table: {
        colconfig: Object.freeze([// 点位管理
          {
            label: 'ID',
            prop: 'id',
            width: 180
          },
          {
            label: '行程名称',
            prop: 'name'
          },
          {
            label: '活动类型',
            prop: 'activityTypeName',
            width: 120
          },
          {
            slot: 'needLifeDocumentary'
          },
          {
            label: '召集人',
            prop: 'organizer',
            width: 120
          },
          {
            label: '联系电话',
            prop: 'typeName',
            width: 120
          },
          {
            slot: 'data'
          },
          {
            label: '出发时间',
            prop: 'setOutTime',
            width: 185,
            formatter: timeFormat
          },
          {
            label: '创建时间',
            prop: 'createTime',
            width: 185,
            formatter: timeFormat
          },

          {
            slot: 'operate'
          }
        ])
      },
      search: {
        keyword: ''
      }
    }
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable, PeopleDialog }
}

</script>
