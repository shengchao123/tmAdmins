<template>
  <div class='member-list-wrap'>
    <page-search class="mt16"
                 :formOptions="formOptions"
                 :btnItems="btnItems"
                 :btnInline="true"
                 @onInquire="onInquire"
                 @onReset="onReset" />
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                isShowIndex
                emptyText="暂无营销记录"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="payRate"
                       label="支付转化率">
        <template slot-scope="scope">
          <span>{{ scope.row.payRate ?  `${scope.row.payRate}%`  : '--'}}</span>
        </template>
      </el-table-column>
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
import { dateFormat } from '@/utils/formatter.js'
import TableMixin from '@/mixins/table.js'
import PageTable from '@/components/PageTable.vue'
import PageSearch from '@c/PageSearch/index.vue'
import { jumpOtherApp } from '@/utils/login'

export default {
  name: 'MarketRecord',
  methods: {
    // 跳转到详情
    onToDetail (row) {
      jumpOtherApp('activity', `marketing/activity/activity-market-details?id=${row.id}`)
    },
    getTableData () { // 获取列表
      this.table.isLoading = true
      const guestGroupId = this.detailInfo.memberLabels[0].memberGroupId
      const query = {
        guestGroupId,
        ...this.searchObj,
        ...this.search
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.findGuestGroupActivityStatisticsByPage(query).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.table.data = res.content.items
        this.table.total = res.content.count
      })
    },
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    onReset () {
      this.searchObj = null
      this.search.pageNumber = 1
      this.getTableData()
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    const changeKeywordSearch = (val) => {
      this.searchObj.keyword = val
    }
    const changeSendOrgSearch = (val) => {
      if (!this.$isEmpty(val)) {
        this.searchObj.sendOrgId = val[val.length - 1]
      }
    }
    const cascaderProps = {
      value: 'id',
      children: 'child',
      label: 'name',
      checkStrictly: true
    }
    return {
      formOptions: [
        {
          show: true,
          label: '活动名称',
          placeholder: '输入活动名称',
          prop: 'keyword',
          element: 'el-input',
          events: {
            change (val) {
              changeKeywordSearch(val)
            }
          }
        },
        {
          show: true,
          label: '创建组织',
          placeholder: '请选择',
          prop: 'sendOrgId',
          element: 'el-cascader',
          showAllLevels: false,
          options: this.organizationTree,
          props: cascaderProps,
          events: {
            change (val) {
              changeSendOrgSearch(val)
            }
          }
        }
      ],
      btnItems: 'inquire,reset',
      searchObj: {
        keyword: null,
        sendOrgId: null
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'name',
            label: '营销活动名称'
          },
          {
            prop: 'orgName',
            label: '所属机构'
          },
          {
            prop: 'validityStartTime',
            label: '开始时间',
            formatter: dateFormat
          },
          {
            prop: 'continuousDay',
            label: '持续天数'
          },
          {
            prop: 'receivePeopleNum',
            label: '触达人数'
          },
          {
            prop: 'newMemberNum',
            label: '拉新人数'
          },
          {
            prop: 'payNum',
            label: '支付人数'
          },
          {
            prop: 'orderTotalAmount',
            label: '销售额'
          },
          { slot: 'payRate' },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  computed: {
    organizationTree () {
      return this.$store.state.app.orgs
    }
  },
  created () {
    this.getTableData()
  },
  components: { PageTable, PageSearch },
  mixins: [TableMixin]

}
</script>

<style lang='scss' scoped>
</style>
