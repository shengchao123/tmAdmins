<template>
  <el-dialog :title="dialog.title"
             width="456px"
             :close-on-click-modal="false"
             :modal-append-to-body="false"
             :close-on-press-escape="false"
             @close="onCancel"
             :visible.sync="dialog.show">
    <div style="padding:24px">
      <div v-if="!isEdit">
        <div>
          <span class="color-999">回复时间：</span>
          <span>{{$moment(messageInfo.replyTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </div>
        <div class="row mt16">
          <span class="color-999">回复内容：</span>
          <span class="flex1"
                style="line-height:1.4">{{messageInfo.replyContent}}</span>
        </div>
      </div>

      <el-input v-model="messageInfo.replyContent"
                v-else
                style="width:400px;height:144px"
                type="textarea"
                rows="5"
                maxlength="500"
                show-word-limit
                placeholder="请输入回复内容"></el-input>
    </div>

    <div slot="footer">
      <el-button type="primary"
                 @click="onConfirm">{{messageInfo.replyTime && !isEdit ? '编辑' : '确定'}}</el-button>
      <el-button @click="onCancel"
                 class="plain-btn">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'HandleDialog',
  methods: {
    show (messageInfo) {
      this.messageInfo = messageInfo
      this.isEdit = !this.messageInfo.replyTime
      this.dialog.show = true
    },
    // 确定
    onConfirm () {
      if (!this.isEdit) {
        this.isEdit = !this.isEdit
        return
      }
      const params = {
        replyContent: this.messageInfo.replyContent,
        id: this.messageInfo.id
      }
      this.$api.replyJourneyCommunityMessage(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('回复成功')
        this.$emit('reply')
        this.dialog.show = false
      })
    },
    // 取消
    onCancel () {
      this.dialog.show = false
    }

  },
  data () {
    return {
      isEdit: false,
      messageInfo: {},
      dialog: {
        title: '回复',
        show: false
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
