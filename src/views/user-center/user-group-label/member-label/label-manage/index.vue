<template>
  <page title="标签管理">
    <page-search class="mt16"
                 :btnItems="btnItems"
                 :formOptions="formOptions"
                 @onInquire="onInquire"
                 @onReset="onReset">
    </page-search>
    <div class="mb16">
      <el-button type="primary"
                 v-if="$hasAuth($urls.createMemberLabel)"
                 @click="onNewLabel">新增标签</el-button>
    </div>
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                isShowIndex
                :width="94"
                class="page_table"
                emptyText="暂无数据"
                :cell-class-name="tableCellClassName"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column width="156"
                       slot='status'
                       label="状态">
        <template slot-scope="scope">
          <span>{{textForStatus(scope.row.status === 1 ? -1 : 1)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       slot='operate'
                       width="100">
        <template slot-scope="scope">
          <el-popconfirm :title="`要${textForHandle(scope.row.status)}该标签?`"
                         cancelButtonType=""
                         hideIcon
                         :confirmButtonText="textForHandle(scope.row.status)"
                         v-if="scope.row.effectiveStatus !== 3 && $hasAuth($urls.modifyMemberLabelStatus)"
                         @confirm="onConfirmDisable(scope)">
            <el-button type="text"
                       class="mr16"
                       slot="reference">
              {{textForHandle(scope.row.status)}}
            </el-button>
          </el-popconfirm>
          <el-button type="text"
                     v-if="$hasAuth($urls.modifyMemberLabel)"
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
      <div style="width: 316px;margin: 0 auto">
        <el-form ref="form"
                 :model="form.data"
                 :rules="form.rules"
                 label-position="left"
                 label-width="76px"
                 class="mt24">
          <el-form-item label="标签名称"
                        style="display: inline-block"
                        prop="name">
            <el-input v-model="form.data.name"
                      show-word-limit
                      placeholder="请输入名称，不超过10个字"
                      maxlength="10"
                      class="w240"></el-input>
          </el-form-item>
          <el-form-item label="标签组"
                        style="display: inline-block"
                        prop="memberLabelGroupId">
            <el-select placeholder="选择标签组"
                       :disabled="memberLabelGroup.length === 0"
                       v-model="form.data.memberLabelGroupId"
                       class="w240 mr8">
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in memberLabelGroup"
                         :key="item.id"></el-option>
            </el-select>
            <span v-if="memberLabelGroup.length === 0 && isMasterOrg"
                  class="color-666">
              暂无标签组，请前往标签组管理进行
              <span class="primary-color pointer"
                    @click="goLabelGroupManage">新增</span></span>
            <span v-if="memberLabelGroup.length === 0 && !isMasterOrg"
                  class="color-666">暂无标签组，请联系上级组织进行新增</span>
          </el-form-item>
        </el-form>
      </div>

      <span class="mt8"
            slot="footer">
        <el-button type="primary"
                   v-if="$hasAuth($urls.modifyMemberLabelGroup)"
                   @click="onConfirm">确定</el-button>
        <el-button @click="dialog.show = false">取消</el-button>
      </span>
    </el-dialog>
  </page>
</template>

<script>
import TableMixin from '@/mixins/table.js'
import { textForStatus, textForHandle } from '@/utils/enum.js'
import { timeFormat } from '@/utils/formatter.js'
// import { isPublicFormatter, isAutomaticFormatter } from './expand/formatter.js'
import PageTable from '@c/PageTable.vue'
import PageSearch from '@c/PageSearch/index.vue'
import { getGlobalParams } from '@/utils/login'
export default {
  name: 'index',
  methods: {
    goLabelGroupManage () {
      if (!this.isMasterOrg) return
      this.$router.push({ name: 'labelGroupManage' })
    },
    // 获取标签组列表
    getLabelGroupList () {
      this.$api.getMemberLabelGroupListByOrgId().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.memberLabelGroup = res.content
        this.formOptions[1].options = res.content
      })
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        let reqApi = null
        const params = {
          name: this.form.data.name,
          memberLabelGroupId: this.form.data.memberLabelGroupId

        }
        const { isEdit, id } = this.dialog
        if (isEdit) {
          reqApi = 'modifyMemberLabel'
          params.id = id
        } else {
          reqApi = 'createMemberLabel'
        }
        this.$api[reqApi](params).then(res => {
          if (res.isError) return this.$message.error(res.message)
          this.$message.success(isEdit ? '编辑标签组成功' : '新增标签组成功')
          this.dialog.show = false
          this.getTableData()
        })
      })
    },
    // 查询
    onInquire (searchData) {
      this.search.pageNumber = 1
      this.searchData = searchData
      this.getTableData()
    },
    // 重置
    onReset () {
      this.search.pageNumber = 1
      this.searchData = {}
      this.getTableData()
    },
    // 新建
    onNewLabel () {
      this.dialog = {
        show: true,
        title: '新增标签'
      }
      // this.$router.push({
      //   name: 'LabelNew'
      // })
    },
    // 编辑
    onEdit (data) {
      this.dialog = {
        show: true,
        title: '编辑标签',
        id: data.id,
        isEdit: true
      }
      this.form.data.name = data.name
      this.form.data.memberLabelGroupId = data.memberLabelGroupId
      // this.$router.push({
      //   name: 'LabelEdit',
      //   query: {
      //     id: data.id
      //   }
      // })
    },
    // 确定禁用
    onConfirmDisable (scope) {
      const status = scope.row.status === 1 ? -1 : 1
      const params = {
        id: scope.row.id,
        status
      }
      this.$api.modifyMemberLabelStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(textForStatus(scope.row.status) + '成功')
        const temTableData = JSON.parse(JSON.stringify(this.table.data))
        temTableData[scope.$index].status = status
        this.table.data = temTableData
      })
    },
    // 请求列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search,
        ...this.searchData
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getMemberLabelPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        const { count, items } = res.content
        this.table.total = count
        this.table.data = items
      })
    },
    // 列表单元格根据状态显示不同样式
    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (row.status === -1 && columnIndex === 6) {
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
      memberLabelGroup: [],
      dialog: {},
      form: {
        data: {
          name: '',
          memberLabelGroupId: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          memberLabelGroupId: [
            { required: true, message: '请选择标签组', trigger: 'blur' }
          ]
        }
      },
      textForStatus,
      textForHandle,
      searchData: {},
      btnItems: 'inquire,reset',
      formOptions: [
        {
          label: '标签名称',
          placeholder: '输入标签名称',
          prop: 'keyword',
          value: '',
          element: 'el-input',
          clearable: true
          // style: {
          //   width: '160px'
          // }
        },
        {
          label: '标签组',
          placeholder: '选择标签组 ',
          prop: 'memberLabelGroupId',
          element: 'el-select',
          value: '',
          options: [],
          clearable: true
          // style: {
          //   width: '160px'
          // }
        },
        // {
        //   label: '是否公开',
        //   placeholder: '请选择',
        //   prop: 'isPublic',
        //   element: 'el-select',
        //   value: '',
        //   options: [
        //     {
        //       id: '',
        //       name: '全部'
        //     },
        //     {
        //       id: true,
        //       name: '公开'
        //     },
        //     {
        //       id: false,
        //       name: '不公开'
        //     }
        //   ],
        //   clearable: true,
        //   style: {
        //     width: '160px'
        //   }
        // },
        // {
        //   label: '打标签方式',
        //   placeholder: '请选择',
        //   prop: 'isAutomatic',
        //   element: 'el-select',
        //   value: '',
        //   options: [
        //     {
        //       id: '',
        //       name: '全部'
        //     },
        //     {
        //       id: true,
        //       name: '自动'
        //     },
        //     {
        //       id: false,
        //       name: '手动'
        //     }
        //   ],
        //   clearable: true,
        //   style: {
        //     width: '160px'
        //   }
        // },
        {
          label: '状态',
          placeholder: '请选择',
          prop: 'status',
          element: 'el-select',
          value: '',
          options: [
            {
              id: '',
              name: '全部'
            },
            {
              id: 1,
              name: '已启用'
            },
            {
              id: -1,
              name: '已停用'
            }
          ],
          clearable: true,
          style: {
            width: '120px'
          }
        }

      ],
      table: {
        colConfig: Object.freeze([
          {
            prop: 'name',
            label: '标签名称',
            showText: true,
            minWidth: 170
          },
          {
            prop: 'memberLabelGroupName',
            label: '标签组',
            width: 276
          },
          // {
          //   prop: 'isPublic',
          //   label: '是否公开',
          //   formatter: isPublicFormatter,
          //   width: 130
          // },
          // {
          //   prop: 'isAutomatic',
          //   label: '打标签方式',
          //   formatter: isAutomaticFormatter,
          //   width: 130
          // },
          {
            prop: 'memberQuantity',
            label: '用户数',
            width: 186
          },
          {
            prop: 'modifierName',
            label: '修改人',
            width: 186
          },
          {
            prop: 'modifyTime',
            label: '修改时间',
            formatter: timeFormat,
            width: 255
          },
          {
            slot: 'status'
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  computed: {
    isMasterOrg () {
      return getGlobalParams('masterOrgId') === getGlobalParams('orgId')
    }
  },
  created () {
    this.getTableData()
    // this.getMemberLabelGroup()
    this.getLabelGroupList()
  },
  mixins: [TableMixin],
  components: { PageTable, PageSearch }
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
