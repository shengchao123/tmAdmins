<template>
  <el-dialog :title="dialog.title"
             width="656px"
             :close-on-click-modal="false"
             :modal-append-to-body="false"
             :close-on-press-escape="false"
             @close="onCancel"
             :visible.sync="dialog.show">
    <el-form ref="form"
             v-if="isEdit"
             :model="form.data"
             :rules="form.rules"
             class="mt24 pb8 center column"
             label-position="left"
             label-width="76px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="form.data.title"
                  style="width:400px"
                  class="limit "
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="事迹介绍"
                    prop="introduce">
        <el-input type="textarea"
                  style="width:400px"
                  class="custom-textarea"
                  placeholder="请输入备注"
                  v-model="form.data.introduce"
                  maxlength="500"
                  show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="图片"
                    class="form-pl">
        <div style="width:400px">
          <div class="ft12 color-999 mb16"
               style="line-height:18px">支持一次上传多张。1. 仅支持jpg/png等格式图片；2. 图片大小建议大于2M；3. 尺寸宽高比为1:1</div>
          <ImgUpload :attachments.sync="form.data.attachments"></ImgUpload>
        </div>
      </el-form-item>
    </el-form>

    <div v-else
         class="ml48 mt24 pb8 column pb32">
      <div class="row">
        <div class="color-999 ft14"
             style="width:70px">标题：</div>
        <div>{{form.data.title}}</div>
      </div>
      <div class="row mt24">
        <div class="color-999 ft14 mt4"
             style="width:70px">事迹介绍：</div>
        <div class="flex1 mr32"
             style="line-height: 23px">{{form.data.introduce}}</div>
      </div>
      <div class="row mt24">
        <div class="color-999 ft14 "
             style="width:70px">图片：</div>
        <div>
          <img :src="$fileHost + item.url"
               style="border-radius: 8px "
               class="mr24"
               width="120px"
               height="120px"
               v-for="(item, index) in form.data.attachments"
               :key="index">
        </div>
      </div>

    </div>

    <div slot="footer"
         v-if="isEdit">
      <el-button type="primary"
                 @click="onConfirm">确定</el-button>
      <el-button @click="onCancel"
                 class="plain-btn">取消</el-button>
    </div>
    <div slot="footer"
         v-else>
      <el-button class="secondary-btn"
                 @click="isEdit = true">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script>

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
        communityOrgId: this.otherInfo.communityOrgId,
        communityPartyId: this.otherInfo.id,

        ...this.form.data
      }
      const apiName = this.form.data.communityPartyGraphicId ? 'updateJourneyCommunityPartyGraphic' : 'insertJourneyCommunityPartyGraphic'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.successTip('保存成功')
        this.onCancel()
      })
    },
    // 打开弹窗
    show (item) {
      this.otherInfo = item
      this.form.data = {
        attachments: [],
        title: '',
        introduce: ''
      }
      if (item.partyGraphic) {
        this.isEdit = !item.partyGraphic.communityPartyGraphicId
        this.form.data = item.partyGraphic
        this.dialog = {
          title: this.isEdit ? '编辑党支部风采' : '查看支部风采',
          show: true
        }
      } else {
        this.dialog.show = true
      }
    }
  },
  data () {
    return {
      isEdit: true,
      dialog: {
        title: '新增支部风采',
        show: false
      },
      form: {
        rules: Object.freeze({
          title: [{ required: true, message: '请输入备注', trigger: 'blur' }],
          introduce: [{ required: true, message: '请输入事迹介绍', trigger: 'blur' }]
        }),
        data: {
          attachments: [],
          title: '',
          introduce: ''
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
