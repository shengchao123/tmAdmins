<template>
  <page title="重点工作管理">
    <page-search class="mt16"
                 :formOptions="formOptions"></page-search>
    <el-button type="primary"
               v-if="$hasAuth($urls.createJourneyKeyWork)"
               @click="onWork('AddKeyWork')">新增工作</el-button>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('工作')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="content"
                       label="工作内容"
                       width="666">
        <template slot-scope="scope">
          <div class="w528">
            <el-popover placement="top-start"
                        width="478"
                        trigger="hover"
                        v-if="scope.row.content.length>73"
                        :content="scope.row.content">
              <div slot="reference"
                   class="mt12 mb12">{{scope.row.content.substring(0,73)+'...'}}</div>
            </el-popover>
            <div v-else
                 class="mt12 mb12">{{scope.row.content}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="220">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="scope.row.status!==3 && $hasAuth($urls.modifyJourneyKeyWorkStatus)"
                @click="onDialog('updateStatus',scope.row.id)">更新状态</span>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyKeyWorkById)"
                @click="onDialog('detailDialog',scope.row.id)">详情</span>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.modifyJourneyKeyWork)"
                @click="onWork('EditKeyWork',scope.row.id)">编辑</span>
          <el-popconfirm title="要删除该工作？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.id)"
                         v-if="$hasAuth($urls.removeJourneyKeyWork)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>
    <detail-dialog ref="detailDialog"></detail-dialog>
    <update-status ref="updateStatus"
                   @getTableData="getTableData"></update-status>
    <page-handle v-if="$route.query.workStatus"
                 :config="{btns: [{ text: '返回', event: 'cancel' }]}"></page-handle>
  </page>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import pageSearch from '@c/PageSearch/index'
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import DetailDialog from './components/DetailDialog.vue'
import UpdateStatus from './components/UpdateStatus.vue'
export default {
  name: 'index',
  methods: {
    // 新增、编辑
    onWork (type, id) {
      const route = {
        name: type,
        query: {
          id
        }
      }
      if (type === 'AddKeyWork') {
        delete route.query
      }
      this.$router.push(route)
    },
    // 详情、更新状态
    onDialog (type, id) {
      this.$refs[type].show(id)
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.removeJourneyKeyWork({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除工作成功')
        this.getTableData()
      })
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyKeyWorkPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? 0
      })
    },
    // 获取联盟列表
    getJourneyAllianceList () {
      this.$api.getJourneyAllianceList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.formOptions[0].options = res?.content ?? []
      })
    },
    initData () {
      const { workStatus, journeyAllianceId } = this.$route.query
      if (+workStatus) {
        this.formOptions[1].value = +workStatus
        this.search.status = +workStatus
      }
      if (journeyAllianceId) {
        this.formOptions[0].value = journeyAllianceId
        this.search.journeyAllianceId = journeyAllianceId
      }
    }
  },
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
      this.search.pageNumber = 1
      this.getTableData()
    }
    const statusOptions = Object.freeze([
      {
        id: '',
        name: '全部'
      },
      {
        id: 1,
        name: '未开始'
      },
      {
        id: 2,
        name: '进行中'
      },
      {
        id: 3,
        name: '已完成'
      }
    ])
    return {
      formOptions: [
        {
          label: '党建联盟',
          prop: 'journeyAllianceId',
          element: 'el-select',
          value: '',
          options: [],
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'journeyAllianceId')
            }
          }
        },
        {
          label: '工作状态',
          prop: 'status',
          element: 'el-select',
          value: '',
          options: statusOptions,
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
            slot: 'content'
          },
          {
            prop: 'allianceName',
            label: '党建联盟',
            minWidth: 238
          },
          {
            prop: 'year',
            label: '年度',
            width: 268
          },
          {
            prop: 'statusName',
            label: '工作状态',
            width: 150
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  activated () {
    this.getJourneyAllianceList()
    this.initData()
    this.getTableData()
  },
  mixins: [TableMixins],
  components: { pageSearch, PageTable, DetailDialog, UpdateStatus, pageHandle }
}
</script>

<style lang='scss' scoped>
.w528 {
  width: 528px;
}
</style>
