<template>
  <page title="共建单位管理">
    <page-search :formOptions="formOptions"
                 class="mt16">
      <div slot="communityOrgId"
           class="flex">
        <div class="mr8">街道社区</div>
        <el-cascader v-model="search.communityOrgId"
                     @change="onInquire"
                     class="w240"
                     clearable
                     ref="refCascader"
                     :options="communityOrgIdTree"
                     :props="cascaderProps"></el-cascader>
      </div>
    </page-search>
    <div class="center-align">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createJourneyCoConstructionUnit)"
                 @click="onUnit('formDialog','add')">新增单位</el-button>
      <el-button class="ml16"
                 v-if='$hasAuth($urls.modifyClearJourneyCoConstructionUnit)'
                 @click="onZero">批量数据清零</el-button>
    </div>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('单位')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="point"
                       label="积分"
                       width="147">
        <template slot-scope="scope">
          <span :class="scope.row.point>0 && 'text-btn'"
                v-if="$hasAuth($urls.getJourneyCoConstructionUnitPointRecord)"
                @click="onUnit('pointDialog',scope.row)">{{scope.row.point}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="132">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.modifyJourneyCoConstructionUnit)"
                @click="onUnit('formDialog','edit',scope.row)">编辑</span>
          <span class="text-btn"
                v-if="$hasAuth($urls.getClearJourneyCoConstructionUnitByPage)"
                @click="onUnit('pointHistoryDialog',scope.row.id)">历史数据</span>
        </template>
      </el-table-column>
    </page-table>
    <form-dialog ref="formDialog"
                 @getTableData="getTableData"></form-dialog>
    <point-dialog ref="pointDialog"></point-dialog>
    <point-history-dialog ref="pointHistoryDialog"></point-history-dialog>
  </page>
</template>

<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import PageSearch from '@c/PageSearch'
import pointDialog from './components/PointDialog'
import pointHistoryDialog from './components/PointHistoryDialog'
import FormDialog from './components/FormDialog.vue'

export default {
  name: 'index',
  methods: {
    // 批量数据清零
    onZero () {
      this.$confirm('清零后，领办和积分数据将全部为0', '要批量数据清零？', {
        confirmButtonText: '清零',
        customClass: 'custom-msg-box msg-box-double',
        cancelButtonClass: 'msg-box-cancel',
        confirmButtonClass: 'msg-box-confirm',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true,
        showClose: false
      }).then(() => {
        this.modifyClearJourneyCoConstructionUnit()
      }).catch(() => { })
    },
    // 批量数据清空接口
    modifyClearJourneyCoConstructionUnit () {
      this.$api.modifyClearJourneyCoConstructionUnit().then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('批量数据清零成功')
        this.getTableData()
      })
    },
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 新增、编辑单位、积分、历史数据
    onUnit (type, data, row) {
      if (type === 'pointDialog' && data.point === 0) return
      this.$refs[type].show(data, row)
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyCoConstructionUnitPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    },
    // 获取共建单位列表
    findUnitOrganizationList () {
      this.$api.findUnitOrganizationList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.formOptions[0].options = JSON.parse(JSON.stringify(res.content).replace(/orgId/g, 'id').replace(/orgName/g, 'name'))
      })
    },
    // 获取街道社区组织树
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    },
    numberFormat (row, column) {
      if (column.property === 'isTakeTheLead') return row[column.property] ? '是' : '否'
      if (column.property === 'communityOrgName') return row.parentCommunityOrgName + ' ' + row.communityOrgName
      if (row[column.property] === 0) return 0
      return column.property === 'rate' ? row[column.property] + '%' : row[column.property]
    }
  },
  data () {
    const getSearchOption = (val, key) => {
      this.search[key] = val
      this.search.pageNumber = 1
      this.getTableData()
    }
    return {
      formOptions: [
        {
          label: '共建单位',
          prop: 'unitOrgId',
          element: 'el-select',
          placeholder: '请选择',
          options: [],
          value: '',
          clearable: true,
          events: {
            change (val) {
              getSearchOption(val, 'unitOrgId')
            }
          },
          style: {
            width: '240px'
          }
        },
        { slot: 'communityOrgId' }
      ],
      btnItems: 'inquire,reset',
      communityOrgIdTree: [],
      search: {
        communityOrgId: '',
        unitOrgId: ''
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'id',
            label: 'ID',
            width: 196
          },
          {
            prop: 'unitOrgName',
            label: '共建单位',
            minWidth: 284
          },
          {
            prop: 'communityOrgName',
            label: '街道社区',
            width: 200,
            formatter: this.numberFormat
          },
          {
            prop: 'isTakeTheLead',
            label: '是否牵头',
            width: 150,
            formatter: this.numberFormat
          },
          {
            prop: 'ordersNumber',
            label: '已接单',
            width: 150,
            formatter: this.numberFormat
          },
          {
            prop: 'grabOrdersNumber',
            label: '已抢单',
            width: 120,
            formatter: this.numberFormat
          },
          {
            prop: 'finishNumber',
            label: '已办结',
            width: 120,
            formatter: this.numberFormat
          },
          {
            prop: 'rate',
            label: '办结率',
            width: 140,
            formatter: this.numberFormat
          },
          {
            slot: 'point'
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
    this.findUnitOrganizationList()
    this.findCommunityOrganizationTree()
    this.getTableData()
  },
  mixins: [TableMixins],
  components: {
    PageTable,
    PageSearch,
    pointDialog,
    pointHistoryDialog,
    FormDialog
  }
}
</script>
