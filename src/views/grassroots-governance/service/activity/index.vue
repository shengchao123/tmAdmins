<template>
  <page title="活动管理">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入活动名称"
                  class="w240"
                  clearable
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
      <div slot="orgId"
           class="flex">
        <div class="mr8">组织单位</div>
        <el-cascader class="cascader-company"
                     v-model="search.filterOrgId"
                     :show-all-levels='false'
                     clearable
                     ref="refCascader"
                     :options="orgs"
                     :props="cascaderProps"></el-cascader>
      </div>
    </page-search>
    <el-button type="primary"
               @click="addACtivity"
               v-if="$hasAuth($urls.createJourneyActivity)">新增活动</el-button>
    <page-table v-if="$hasAuth($urls.getJourneyActivityManagementPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('活动')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :isShowZero="true"
                :width="98"
                class="mt16">
      <el-table-column slot="time"
                       label="活动时间"
                       width="196">
        <template slot-scope="scope">
          <div>
            {{$moment(scope.row.startTime).format('YYYY-MM-DD HH:mm')}} 至
          </div>
          <div>{{$moment(scope.row.endTime).format('YYYY-MM-DD HH:mm')}}</div>
        </template>
      </el-table-column>
      <el-table-column slot="apply"
                       label="报名人员(人)"
                       width="120">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onApply(scope.row)">{{scope.row.signUpQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="150">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getJourneyActivityById)">详情</span>
          <span class="text-btn mr16"
                @click="onEdit(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyActivity) && scope.row.status ==='01'">编辑</span>
          <!-- <span class="text-btn mr16"
                @click="onDemeanour(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyActivityStyle) && scope.row.status ==='03'">{{scope.row.styleDescription?'编辑风采':'上传风采'}}</span> -->
          <el-popconfirm title="要删除该活动?"
                         cancelButtonType=""
                         confirmButtonText="删除"
                         hideIcon
                         v-if="$hasAuth($urls.removeJourneyActivity)"
                         @confirm="onDelete(scope.row)">
            <span class="text-btn mr12"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
    <apply-dialog ref="applyDialog"></apply-dialog>
  </page>
</template>
<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import ApplyDialog from './components/ApplyDialog'
import { activityColConfig } from '@u/enum'

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
        filterOrgId: '',
        status: '',
        pageNumber: 1,
        pageSize: 10,
        type: ''
      }
      this.getTableData()
    },
    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        menuType: '02',
        ...this.search
      }
      this.$api.getJourneyActivityManagementPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'CommunityActivityDetail', query: { id: row.id } })
    },
    // 编辑按钮
    onEdit (row) {
      this.$router.push({ name: 'CommunityEditActivity', query: { id: row.id } })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.removeJourneyActivity(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 新增活动按钮
    addACtivity () {
      this.$router.push({ name: 'CommunityAddActivity' })
    },
    // 报名单弹窗
    onApply (row) {
      const applyDialog = this.$refs.applyDialog
      applyDialog.showDialog = true
      applyDialog.id = row.id
      applyDialog.getApplyData()
    },
    // 跳转风采编辑页面
    onDemeanour (row) {
      this.$router.push({ name: 'UploadDemeanour', query: { id: row.styleDescription ? row.id : '' } })
    }
  },
  data () {
    const getSearchOption = (val, key) => {
      this.search[key] = val
    }
    return {
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'orgId'
        },
        {
          label: '活动状态',
          prop: 'status',
          element: 'el-select',
          placeholder: '全部',
          options: [{ name: '报名中', id: '01' }, { name: '进行中', id: '02' }, { name: '已结束', id: '03' }],
          value: '',
          clearable: true,
          events: {
            change (val) {
              getSearchOption(val, 'status')
            }
          },
          style: {
            width: '120px'
          }
        },
        {
          label: '活动类型',
          prop: 'type',
          element: 'el-select',
          placeholder: '全部',
          options: [{ name: '社区活动', id: '03' }, { name: '志愿活动', id: '04' }],
          value: '',
          clearable: true,
          events: {
            change (val) {
              getSearchOption(val, 'type')
            }
          },
          style: {
            width: '120px'
          }
        }
      ],
      btnItems: 'inquire,reset',
      table: {
        colConfig: activityColConfig
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  },

  computed: {
    orgs () {
      return this.$store.state.app.orgs
    }
  },
  activated () {
    this.getTableData()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable, ApplyDialog }
}
</script>

<style lang='scss' scoped>
</style>
