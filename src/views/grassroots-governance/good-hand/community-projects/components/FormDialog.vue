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
      <el-form-item label="项目名称"
                    prop="name">
        <el-input v-model="form.data.name"
                  class="w240 form-input"
                  maxlength="20"
                  show-word-limit
                  placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="背景描述"
                    prop="description">
        <el-input v-model="form.data.description"
                  class="w240"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 20}"
                  maxlength="200"
                  show-word-limit
                  placeholder="输入内容"></el-input>
      </el-form-item>
      <el-form-item label="发布社区"
                    prop="communityOrgId">
        <el-cascader class="w240"
                     v-model="form.data.communityOrgId"
                     placeholder="选择社区"
                     ref="refCascader"
                     :options="communityOrgIdTree"
                     :props="cascaderProps"></el-cascader>
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
          this.dialog.formType === 'edit' ? this.modifyJourneyHelperProject() : this.createJourneyHelperProject()
        }
      })
    },
    // 取消
    onCancel () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 打开弹窗
    show (formType, id) {
      this.findCommunityOrganizationTree()
      if (formType === 'edit') this.getJourneyHelperProject(id)
      this.dialog = {
        formType,
        title: formType === 'add' ? '新增项目' : '编辑项目',
        confirm: formType === 'add' ? '确定' : '保存',
        show: true
      }
    },
    // 新增项目
    createJourneyHelperProject () {
      const params = {
        ...this.form.data
      }
      this.$api.createJourneyHelperProject(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增项目成功')
        this.onCancel()
        this.$emit('getTableData')
      })
    },
    // 编辑项目
    modifyJourneyHelperProject () {
      const params = {
        ...this.form.data
      }
      this.$api.modifyJourneyHelperProject(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑项目成功')
        this.onCancel()
        this.$emit('getTableData')
      })
    },
    // 根据id获取项目信息
    getJourneyHelperProject (id) {
      this.$api.getJourneyHelperProject({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const { name, description, communityOrgId, id } = res.content.getJourneyHelperProjectRespDTO
        this.form.data = {
          name,
          description,
          communityOrgId,
          id
        }
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
      dialog: {
        formType: '',
        title: '',
        confirm: '',
        show: false
      },
      communityOrgIdTree: [],
      form: {
        rules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入背景描述', trigger: 'blur' }
          ],
          communityOrgId: [
            { required: true, message: '请选择发布社区', trigger: 'change' }
          ]
        },
        data: {
          name: '',
          description: '',
          communityOrgId: ''
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

<style lang='scss' scoped>
/deep/.form-input .el-input__inner {
  padding: 0 48px 0 8px !important;
}
</style>
