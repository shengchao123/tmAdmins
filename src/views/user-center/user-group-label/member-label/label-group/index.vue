<template>
  <page title="标签组管理">
    <div class="mt16"
         v-if="isMasterOrg">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createMemberLabelGroup)"
                 @click="onNewLabelGroup">新增标签组</el-button>
      <el-button class="secondary-btn"
                 v-if="$hasAuth($urls.switchMemberLabelGroupSequence)"
                 @click="showSortDialog">标签组排序</el-button>
      <svg-icon class="ft12 color-999 ml16"
                icon="icon_wenhao"></svg-icon>
      <span class="ml8 ft12 color-999">标签组统一管理，建立后将自动同步给下属组织使用</span>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                isShowIndex
                :width="164"
                class="mt16 page_table"
                emptyText="暂无数据"
                :cell-class-name="tableCellClassName"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column label="操作"
                       slot="operate"
                       v-if="haveModifyAndEditPermissions && isMasterOrg"
                       width="100">
        <template slot-scope="scope">
          <el-popconfirm :title="`要${textForHandle(scope.row.status)}该标签组?`"
                         cancelButtonType=""
                         hideIcon
                         :confirmButtonText="textForHandle(scope.row.status)"
                         v-if="scope.row.effectiveStatus !== 3 && $hasAuth($urls.modifyMemberLabelGroupStatus)"
                         @confirm="onConfirmDisable(scope)">
            <el-button type="text"
                       :disabled="scope.row.isSystem"
                       class="mr16"
                       slot="reference">
              {{textForHandle(scope.row.status)}}
            </el-button>
          </el-popconfirm>
          <el-button type="text"
                     :disabled="scope.row.isSystem"
                     v-if="$hasAuth($urls.modifyMemberLabelGroup)"
                     @click="onEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </page-table>
    <el-dialog :title="dialog.title"
               width="456px"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               :visible.sync="dialog.show">
      <el-form ref="form"
               :model="form.data"
               :rules="form.rules"
               label-position="left"
               label-width="90px"
               class="tc mt16">
        <el-form-item label="标签组名称"
                      style="display: inline-block"
                      prop="name">
          <el-input v-model="form.data.name"
                    show-word-limit
                    placeholder="请输入名称，不超过10个字"
                    maxlength="10"
                    class="w240"></el-input>
        </el-form-item>
      </el-form>
      <span class="mt8"
            slot="footer">
        <el-button type="primary"
                   v-if="$hasAuth($urls.modifyMemberLabelGroup)"
                   @click="onConfirm">确定</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
      </span>
    </el-dialog>
    <sort-dialog ref="sortDialog"
                 @getTableData="getTableData">
    </sort-dialog>
  </page>
</template>

<script>
import TableMixin from '@/mixins/table.js'
import { getGlobalParams } from '@/utils/login'
import { labelQuantityFormatter, statusFormatter } from './expand/formatter'
import { timeFormat } from '@/utils/formatter.js'
import { textForStatus, textForHandle } from '@/utils/enum'
import pageTable from '@c/PageTable.vue'
import SortDialog from './components/SortDialog.vue'

export default {
  name: 'LabelGroup',
  methods: {
    // 确定禁用
    onConfirmDisable (scope) {
      const status = scope.row.status === 1 ? -1 : 1
      const params = {
        id: scope.row.id,
        status: status
      }
      this.$api.modifyMemberLabelGroupStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(textForStatus(scope.row.status) + '成功')
        const temTableData = JSON.parse(JSON.stringify(this.table.data))
        temTableData[scope.$index].status = status
        this.table.data = temTableData
      })
    },
    // 新建
    onNewLabelGroup () {
      this.dialog = {
        show: true,
        title: '新增标签组'
      }
    },
    // 编辑
    onEdit (data) {
      this.dialog = {
        show: true,
        title: '编辑标签组',
        id: data.id,
        isEdit: true
      }
      this.form.data.name = data.name
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        let reqApi = null
        const params = {
          name: this.form.data.name
        }
        const { isEdit, id } = this.dialog
        if (isEdit) {
          reqApi = 'modifyMemberLabelGroup'
          params.id = id
        } else {
          reqApi = 'createMemberLabelGroup'
        }
        this.$api[reqApi](params).then(res => {
          if (res.isError) return this.$message.error(res.message)
          this.$message.success(isEdit ? '编辑标签组成功' : '新增标签组成功')
          this.dialog.show = false
          this.getTableData()
        })
      })
    },
    showSortDialog () {
      this.$refs.sortDialog.visible = true
    },
    // 请求列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$api.getMemberLabelGroupPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return
        this.table.total = res.content.count
        this.table.data = res.content.items
      })
    },
    // 列表单元格根据状态显示不同样式
    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === -1 && columnIndex === 5) {
        return 'table-cell-red'
      } else {
        if (row.status === -1) {
          return 'table-cell-gray'
        } else {
          return 'table-cell-normal'
        }
      }
    }
  },
  data () {
    return {
      dialog: {},
      textForStatus,
      textForHandle,
      form: {
        data: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'name',
            label: '标签组名称',
            showText: true,
            minWidth: 170
          },
          {
            prop: 'labelQuantity',
            label: '标签个数',
            formatter: labelQuantityFormatter,
            width: 220
          },
          {
            prop: 'modifierName',
            label: '修改人',
            width: 220
          },
          {
            prop: 'modifyTime',
            label: '修改时间',
            formatter: timeFormat,
            width: 220
          },
          {
            prop: 'status',
            label: '状态',
            formatter: statusFormatter,
            width: 220
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  watch: {
    'dialog.show': {
      deep: true,
      handler: function (val) {
        if (!val) {
          this.$refs.form.resetFields()
          this.form.data.name = ''
        }
      }
    }
  },
  mixins: [TableMixin],
  computed: {
    isMasterOrg () {
      return getGlobalParams('orgId') === getGlobalParams('masterOrgId')
    },
    haveModifyAndEditPermissions () {
      return this.$hasAuth(this.$urls.modifyMemberLabelGroupStatus) || this.$hasAuth(this.$urls.modifyMemberLabelGroup)
    }
  },
  created () {
    this.getTableData()
  },
  components: {
    pageTable, SortDialog
  }
}
</script>

<style lang='scss' scoped>
.page_table {
  /deep/ .el-button {
    min-width: 30px !important;
    padding: 0 !important;
  }
}
</style>
