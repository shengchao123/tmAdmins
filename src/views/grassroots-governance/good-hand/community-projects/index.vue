<template>
  <page title="社区项目管理">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入项目名称"
                  class="w240"
                  clearable
                  v-model="search.keyword">
        </el-input>
      </div>
      <div slot="communityOrgId"
           class="flex">
        <div class="mr8">街道社区</div>
        <el-cascader v-model="search.communityOrgId"
                     clearable
                     class="w240"
                     ref="refCascader"
                     :options="communityOrgIdTree"
                     :props="cascaderProps"></el-cascader>
      </div>
    </page-search>
    <div>
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyHelperProject)"
                 @click="onProject('formDialog','add')">新增项目</el-button>
      <el-button type="primary"
                 v-if="$hasAuth($urls.batchUpdateJourneyHelperProjectRanking || $urls.getRankingJourneyHelperProjectList)"
                 @click="onRank()">好案例评选</el-button>
    </div>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('项目')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="operate"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyHelperProject)"
                @click="onDetail('CommunityProjectDetail',scope.row.id)">详情</span>
          <span class="text-btn mr16"
                v-if="scope.row.status !== 3 && $hasAuth($urls.modifyJourneyHelperProject)"
                @click="onProject('formDialog','edit',scope.row.id)">编辑</span>
          <el-popconfirm title="要删除该项目？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.id)"
                         v-if="scope.row.status === 1 && $hasAuth($urls.deleteJourneyHelperProject)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>
    <form-dialog ref="formDialog"
                 @getTableData="getTableData"></form-dialog>

    <!-- 个人信息弹窗 -->
    <el-dialog :title="rankConfig.title"
               width="656px"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               :visible.sync="rankConfig.showDialog">

      <div class="rank-wrap between-row">
        <div v-for="(item, index) in rankConfig.list"
             class="mt16"
             :key="index">
          <span class="mr8">{{index + 1}}</span>
          <el-select v-model="item.id"
                     class="w240"
                     clearable
                     placeholder="选择案例">
            <el-option v-for="(line,lineIndex) in rankConfig.finishList"
                       :key="lineIndex"
                       :label="line.name"
                       :disabled="selectedIdsList.includes(line.id)"
                       :value="line.id"></el-option>
          </el-select>
        </div>
      </div>

      <div slot="footer"
           class="mt8">
        <el-button type="primary"
                   @click="onConfirm">确定</el-button>
        <el-button @click="onCancel"
                   class="plain-btn">取消</el-button>
      </div>
    </el-dialog>
  </page>
</template>

<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import PageSearch from '@c/PageSearch'
import { timeFormat } from '@u/formatter.js'
import FormDialog from './components/FormDialog.vue'
export default {
  name: 'index',
  methods: {
    onRank () {
      this.rankConfig.showDialog = true
      this.getRankingJourneyHelperProjectList()
    },
    getRankingJourneyHelperProjectList () {
      this.$api.getRankingJourneyHelperProjectList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temArray = []
        if (!res.content) res.content = []
        for (let i = 0; i < 10; i++) {
          const item = res.content[i] || {}
          temArray.push(item)
        }
        this.rankConfig.list = temArray.sort(function (a, b) { return a.ranking - b.ranking })
      })
    },
    getFinishJourneyHelperProjectList () {
      this.$api.getFinishJourneyHelperProjectList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.rankConfig.finishList = res.content || []
      })
    },
    onConfirm () {
      if (this.$isEmpty(this.rankConfig.list)) {
        this.rankConfig.showDialog = false
        return
      }

      const temArray = this.rankConfig.list.map((item, index) => {
        return {
          id: item.id,
          ranking: index + 1
        }
      })
      const params = {
        journeyHelperProjectRankings: temArray.filter(item => item.id)
      }
      this.$api.batchUpdateJourneyHelperProjectRanking(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('提交成功')
        this.rankConfig.showDialog = false
      })
    },
    onCancel () {
      this.rankConfig.showDialog = false
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.deleteJourneyHelperProject({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除项目成功')
        this.getTableData()
      })
    },
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        keyword: '',
        journeyHelperProjectType: '',
        status: '',
        communityOrgId: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 新增、编辑
    onProject (type, data, id) {
      this.$refs[type].show(data, id)
    },
    // 详情
    onDetail (type, id) {
      const route = {
        name: type,
        query: {
          id
        }
      }
      this.$router.push(route)
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyHelperProjectPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    },
    // 获取街道社区组织树
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    },
    arrayFormat (row, column) {
      if (this.$isEmpty(row[column.property])) return '--'
      return row[column.property].join('、')
    }
  },
  created () {
    this.getFinishJourneyHelperProjectList()
  },
  computed: {
    selectedIdsList () {
      return this.rankConfig.list.map(item => item.id)
    }
  },
  data () {
    const getSearchOption = (val, key) => {
      this.search[key] = val
    }
    return {
      rankConfig: {
        showDialog: false,
        title: '好案例评选',
        list: [],
        finishList: []
      },
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'communityOrgId'
        },
        {
          label: '状态',
          prop: 'status',
          element: 'el-select',
          placeholder: '请选择',
          options: [{ name: '待认领', id: 1 }, { name: '领办中', id: 2 }, { name: '已办结', id: 3 }],
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
          label: '类型',
          prop: 'journeyHelperProjectType',
          element: 'el-select',
          placeholder: '请选择',
          options: [{ name: '接单', id: 1 }, { name: '抢单', id: 2 }],
          value: '',
          clearable: true,
          events: {
            change (val) {
              getSearchOption(val, 'journeyHelperProjectType')
            }
          },
          style: {
            width: '120px'
          }
        }
      ],
      btnItems: 'inquire,reset',
      communityOrgIdTree: [],
      search: {
        keyword: '',
        journeyHelperProjectType: '',
        status: '',
        communityOrgId: ''
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'id',
            label: 'ID',
            width: 196
          },
          {
            prop: 'name',
            label: '项目名称',
            minWidth: 340
          },
          {
            prop: 'communityOrgName',
            label: '发布社区',
            width: 240
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 150
          },
          {
            prop: 'journeyHelperProjectTypeName',
            label: '类型',
            width: 150
          },
          {
            prop: 'journeyCoConstructionUnitNameList',
            label: '领办单位',
            formatter: this.arrayFormat,
            width: 284
          },
          {
            prop: 'createTime',
            label: '发布时间',
            formatter: timeFormat,
            width: 184
          },
          {
            slot: 'operate'
          }
        ])
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
  activated () {
    this.findCommunityOrganizationTree()
    this.getTableData()
  },
  mixins: [TableMixins],
  components: {
    PageTable,
    PageSearch,
    FormDialog
  }
}
</script>
<style lang="scss" scoped>
.rank-wrap {
  padding: 8px 40px 24px 40px;
  flex-wrap: wrap;
}
</style>
