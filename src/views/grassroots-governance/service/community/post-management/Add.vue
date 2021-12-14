<template>
  <Page title="新增话题"
        needPadding>
    <div class="activity-details-info pb8">
      <el-form class="base-info mt24"
               :rules="rules"
               :model="formData"
               label-width="100px"
               label-position="left"
               ref="formData">
        <el-form-item label="话题标题"
                      prop="title">
          <el-input v-model="formData.title"
                    class="w380 limit"
                    maxlength="30"
                    show-word-limit
                    placeholder="请输入话题标题"></el-input>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content">
          <el-input v-model="formData.content"
                    class="w690"
                    type="textarea"
                    maxlength="200"
                    rows="5"
                    show-word-limit
                    placeholder="输入简介内容，不超过200个字"></el-input>
        </el-form-item>
        <div class="attach-img">
          <el-form-item label="图片"
                        class="form-pl">
            <div class="flex w855">
              <div v-for="(item,index) in formData.attachmentDTOList"
                   :key="index"
                   class="relative">
                <img :src="$fileHost + item.url"
                     class="landmark-img mb16"
                     @click="lookBigPhoto(formData.attachmentDTOList,index)" />
                <div class="flex center upload-again">
                  <el-upload action=""
                             accept=".jpeg,.png,.jpg"
                             :before-upload="e=>beforeHandleUpload(e,1)"
                             :http-request="e => uploadMaterial(e, '2',index)"
                             :show-file-list="false">
                    <div class="pointer">重新上传</div>
                  </el-upload>
                  <div class="ml16 pointer"
                       @click="deleteImg(index)">删除</div>
                </div>
              </div>
              <div class="flex mb16"
                   v-if="formData.attachmentDTOList.length < 3">
                <el-upload action=""
                           multiple
                           :limit="3"
                           accept=".jpeg,.png,.jpg"
                           :before-upload="e=>beforeHandleUpload(e,2)"
                           :http-request="e => uploadMaterial(e,'2')"
                           :on-exceed="handleExceed"
                           :show-file-list="false"
                           :file-list="formData.attachmentDTOList">
                  <div class="upload-img tc pointer">
                    <svg-icon icon="icon_tupian"
                              class="ft30 color-999 mt32" />
                    <div class="primary-color ft12 lineh1">上传图片</div>
                  </div>
                </el-upload>
                <div class="color-999 ft12 ml16">
                  <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                  <div class="mt8 lineh1">尺寸大小：750*750px</div>
                  <div class="mt8 lineh1">宽高比例：1:1</div>
                  <div class="mt8 lineh1">图片大小：不大于2M</div>
                  <div class="mt8 lineh1">不超过3张</div>
                </div>
              </div>
            </div>
          </el-form-item>
        </div>

        <el-form-item label="组织单位:"
                      prop="orgName"
                      class="org-name form-pl">
          <div>{{orgName}}</div>
        </el-form-item>
      </el-form>
      <big-picture ref="bigPicture"></big-picture>
      <page-handle @onConfirm="onSure"
                   :config="pageHandleConfig"></page-handle>
    </div>
  </Page>
</template>

<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'

export default {
  data () {
    return {
      formData: {
        title: '',
        attachmentDTOList: [],
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入话题标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      pageHandleConfig: {
        btns: [
          {
            text: '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      }
    }
  },
  methods: {
    onSure () { // 保存、确定按钮
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    },
    // 重置数据
    resetData () {
      this.formData = {
        title: '',
        attachmentDTOList: [],
        content: ''
      }
    },
    // 保存、确定接口
    save () {
      const params = this.formData

      this.$deleteObjectEmptyAttr(params)
      this.$api.createJourneyResourceSharing(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增成功')
        this.$refs.formData.resetFields()
        this.resetData()
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
    },
    // 上传之前的限制 图片
    beforeHandleUpload (file, count) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传图片只能是 png/jpeg/jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 2MB!')
      }
      if (this.formData.attachmentDTOList.length > 3 && count > 1) {
        this.$message.warning('最多只能上传3张')
        return false
      }
      return isJPG && isLt2M
    },
    // 上传素材(图片)
    uploadMaterial (e, type, index) {
      const config = {
        uploadType: 'm',
        fileType: type,
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dealUploadData(res, index)
      })
    },
    // 处理上传的数据
    dealUploadData (res, index) {
      if (index >= 0) { // 重新上传
        const pointImages = [...this.formData.attachmentDTOList]
        pointImages[index].url = res[0]
        this.formData.attachmentDTOList = pointImages
      } else { // 上传图片
        const img = { type: '01', url: res[0] }
        this.formData.attachmentDTOList.push(img)
      }
    },
    // 删除图片
    deleteImg (index) {
      this.formData.attachmentDTOList.splice(index, 1)
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传3张图片')
    }
  },
  computed: {
    orgName () {
      return localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
    }
  },
  created () {
  },
  components: { PageHandle, BigPicture }
}
</script>

<style lang='scss' scoped>
.mb2 {
  margin-bottom: 2px;
}
.ml-10 {
  margin-left: -12px;
}
.ml10 {
  margin-left: 10px;
}
.w360 {
  width: 360px;
}
.w380 {
  width: 380px;
}
.w690 {
  width: 690px;
}
.org-name {
  /deep/.el-form-item__label {
    color: #999999 !important;
  }
}
.activity-details-info {
  margin-left: 421px !important;
  margin-top: 60px;
  .base-info {
    margin-left: 70px;
    /deep/ .el-form-item__error {
      padding-top: 0px;
    }
    .activity-cover {
      position: relative;
      margin-right: 16px;
      .delete_icon {
        position: absolute;
        color: #fff;
        bottom: 0;
        right: 0;
        width: 75px;
        z-index: 2;
        p {
          line-height: 24px;
          text-align: right;
        }
      }
      .re-upload {
        box-sizing: border-box;
        width: 100%;
        border-radius: 0 0 4px 4px;
        background: rgba($color: #000000, $alpha: 0.5);
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        height: 24px;
        line-height: 24px;
        text-align: left;
        p {
          color: #fff;
        }
      }
      /deep/ .el-upload {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 80px;
        border: 1px solid #dedede;
        border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
.restrict {
  /deep/.el-radio {
    margin-right: 8px !important;
  }
}
.unit {
  align-self: flex-end;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.landmark-img {
  width: 112px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
}
.upload-img {
  width: 112px;
  height: 112px;
  border-radius: 4px;
  border: 1px solid #dedede;
}
.lineh1 {
  line-height: 1;
}
.upload-again {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 112px;
  background: rgba($color: #000000, $alpha: 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.attach-img {
  /deep/.el-form-item {
    margin-bottom: 0px !important;
  }
}
.form-pl {
  /deep/.el-form-item__label {
    padding-left: 10px;
  }
}
</style>
