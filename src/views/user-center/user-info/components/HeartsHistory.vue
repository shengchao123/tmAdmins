<template>
  <div class='point-wrap mt16'>
    <div class="info-title ml16 mb16 ft16">红心记录</div>
    <page-search :formOptions="formOptions">
    </page-search>
    <div class="mb16">
      <span class="color-999">累积汇总：</span>
      <span :class="sumColor(increaseSum)">{{increaseSum || '0'}}</span>
      <span class="color-999 ml40">消耗汇总：</span>
      <span :class="sumColor(deductionSum)">{{deductionSum || '0'}}</span>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText()"
                :isLoading="table.isLoading"
                @getTableData="requestTableData">
      <el-table-column slot="point"
                       label="红心值"
                       width="540">
        <template slot-scope="scope">
          <span :class="sumColor(scope.row.value)">{{scope.row.value}}</span>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table.js'
import { timeFormat } from '@/utils/formatter.js'
import PageTable from '@/components/PageTable'
import pageSearch from '@c/PageSearch/index'

export default {
  name: 'PointRecord',
  methods: {
    // 请求列表数据
    requestTableData () {
      this.table.isLoading = true
      const params = this.dealParams()
      this.$deleteObjectEmptyAttr(params)
      this.$api.getRedHeartRecordPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return
        const { page, increaseSummary, deductionSummary } = res.content
        this.increaseSum = increaseSummary
        this.deductionSum = deductionSummary
        this.table.total = page?.count ?? 0
        this.table.data = page?.items ?? []
      })
    },
    // 处理接口数据
    dealParams () {
      const params = {
        memberId: this.$route.query.id,
        ...this.search
      }
      if (params.date) {
        params.startDate = params.date[0]
        params.endDate = params.date[1]
        delete params.date
      }
      return params
    }
  },
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
      this.requestTableData()
    }
    return {
      increaseSum: null,
      deductionSum: null,
      frozenStatisticsData: {},
      formOptions: [
        {
          label: '发生时间',
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
        }
      ],
      btnItems: 'inquire,reset',
      table: {
        colConfig: Object.freeze([
          {
            prop: 'createTime',
            label: '发生时间',
            formatter: timeFormat,
            width: '518'
          },
          {
            prop: 'description',
            label: '变更类型',
            minWidth: '300'
          },
          {
            slot: 'point'
          }
        ])
      }
    }
  },
  created () {
    this.requestTableData()
  },
  computed: {
    sumColor () {
      return (val) => {
        return Number(val) === 0 ? 'color-333' : Number(val) < 0 ? 'error-color' : ''
      }
    }
  },
  components: { PageTable, pageSearch },
  mixins: [tableMixin]
}
</script>

<style lang='scss' scoped>
.point-wrap {
  background: #fff;
  padding: 16px 16px 16px 0;
  .point-search {
    flex-wrap: wrap;
  }
  .frozen-point {
    height: 56px;
    background: $primaryColor;
    border: 1px solid #d0e0ff;
    border-radius: 6px;
  }
}
</style>
