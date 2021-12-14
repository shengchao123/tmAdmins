<template>
  <el-dialog :title="dialog.title"
             width="456px"
             :close-on-click-modal="false"
             :modal-append-to-body="false"
             :close-on-press-escape="false"
             @close="onCancel"
             :visible.sync="dialog.show">
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="mt24 pb8 center column"
             label-position="left"
             label-width="76px">
      <el-form-item label="处理状态"
                    prop="status">
        <el-select v-model="form.data.status"
                   placeholder="请选择"
                   class="w240">
          <el-option v-for="item in messageHandleStatusOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <div class="mt16"
             v-if="form.data.status === 2"
             style="color:#fc8d11">是否确定完结该报事？</div>
      </el-form-item>
      <el-form-item label="反馈"
                    v-if="form.data.status !== 2"
                    prop="feedback">
        <el-input type="textarea"
                  class="w240 custom-textarea"
                  placeholder="请输入备注"
                  v-model="form.data.feedback"
                  maxlength="50"
                  show-word-limit>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary"
                 @click="onConfirm">确定</el-button>
      <el-button @click="onCancel"
                 class="plain-btn">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>

let MsgInfo = ''
export default {
  name: 'HandleDialog',
  methods: {
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dealMessage()
        }
      })
    },
    // 成功提示信息
    successTip (message) {
      this.$message.success(`${message}成功`)
      this.$emit('success')
    },
    // 取消
    onCancel () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 处理接口
    dealMessage () {
      const params = {
        id: MsgInfo.id,
        ...this.form.data
      }
      this.$api.modifyJourneyCommunityProblemStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.successTip('处理')
        this.onCancel()
      })
    },
    // 打开弹窗
    show (info) {
      MsgInfo = info
      if (MsgInfo.status === 1) {
        this.form.data.status = 2
      }
      this.dialog.show = true
    }
  },
  data () {
    return {
      dialog: {
        title: '处理',
        show: false
      },
      messageHandleStatusOptions: Object.freeze([
        {
          id: 1,
          name: '受理'
        },
        {
          id: 2,
          name: '完结'
        }
      ]),
      form: {
        rules: Object.freeze({
          feedback: [{ required: true, message: '请输入备注', trigger: 'blur' }],
          status: [{ required: true, message: '请选择处理状态', trigger: 'change' }]
        }),
        data: {
          remark: '',
          status: 1
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .custom-textarea {
  .el-textarea__inner {
    min-height: 102px !important;
  }
  .el-input__count {
    line-height: 20px !important;
  }
}
</style>
