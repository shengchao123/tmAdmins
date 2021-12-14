<template>
  <el-dialog :title="dialog.title"
             width="456px"
             :close-on-click-modal="false"
             :modal-append-to-body="false"
             @close="onCancel"
             :close-on-press-escape="false"
             :visible.sync="dialog.show">
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="pt24 pb8 column center-align"
             label-position="left"
             label-width="76px">
      <el-form-item label="单位名称"
                    prop="unitOrgId">
        <el-select v-model="form.data.unitOrgId"
                   class="w240"
                   :disabled="dialog.formType === 'edit'"
                   placeholder="请选择">
          <el-option v-for="item in unitOrgIdOptions"
                     :key="item.orgId"
                     :label="item.orgName"
                     :value="item.orgId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对应社区"
                    prop="communityOrgId">
        <el-cascader class="w240"
                     v-model="form.data.communityOrgId"
                     ref="refCascader"
                     placeholder="选择社区"
                     :options="communityOrgIdTree"
                     :props="cascaderProps"></el-cascader>
      </el-form-item>
      <el-form-item label="是否牵头"
                    prop="isTakeTheLead">
        <el-select v-model="form.data.isTakeTheLead"
                   class="w240"
                   placeholder="请选择">
          <el-option v-for="item in isTakeTheLeadOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary"
                 @click="onConfirm">{{dialog.confirm}}</el-button>
      <el-button @click="onCancel"
                 class="plain-btn">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FormDialog',
  methods: {
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialog.formType === 'add' ? this.createJourneyCoConstructionUnit() : this.modifyJourneyCoConstructionUnit()
        }
      })
    },
    // 取消
    onCancel () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 打开弹窗
    show (formType, data) {
      this.findUnitOrganizationList()
      this.findCommunityOrganizationTree()
      if (formType === 'edit') {
        const { id, isTakeTheLead, communityOrgId, unitOrgId } = data
        this.form.data = {
          id, isTakeTheLead, communityOrgId, unitOrgId
        }
      }
      this.form.data = JSON.parse(JSON.stringify(this.form.data))
      this.dialog = {
        formType,
        title: formType === 'add' ? '新增单位' : '编辑单位',
        confirm: formType === 'add' ? '确定' : '保存',
        show: true
      }
    },
    // 新增单位
    createJourneyCoConstructionUnit () {
      const params = {
        ...this.form.data
      }
      this.$api.createJourneyCoConstructionUnit(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增单位成功')
        this.onCancel()
        this.$emit('getTableData')
      })
    },
    // 编辑单位
    modifyJourneyCoConstructionUnit () {
      const params = {
        ...this.form.data
      }
      delete params.unitOrgId
      this.$api.modifyJourneyCoConstructionUnit(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑单位成功')
        this.onCancel()
        this.$emit('getTableData')
      })
    },
    // 获取单位名称列表
    findUnitOrganizationList () {
      this.$api.findUnitOrganizationList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.unitOrgIdOptions = res?.content ?? []
      })
    },
    // 获取街道社区列表
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    }
  },
  data () {
    return {
      unitOrgIdOptions: [],
      communityOrgIdTree: [],
      dialog: {
        formType: '',
        title: '',
        confirm: '',
        show: false
      },
      isTakeTheLeadOptions: Object.freeze([
        {
          id: true, name: '是'
        },
        {
          id: false, name: '否'
        }
      ]),
      form: {
        rules: {
          unitOrgId: [
            { required: true, message: '请选择单位名称', trigger: 'change' }
          ],
          communityOrgId: [
            { required: true, message: '请选择对应社区', trigger: 'change' }
          ],
          isTakeTheLead: [
            { required: true, message: '请选择是否牵头', trigger: 'change' }
          ]
        },
        data: {
          unitOrgId: '',
          communityOrgId: '',
          isTakeTheLead: ''
        }
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  }
}
</script>
