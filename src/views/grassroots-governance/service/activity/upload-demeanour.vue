<template>
  <page title="上传风采">
    <div class="demeanour-style">
      <el-form :rules="rules"
               :model="formData"
               label-width="100px"
               label-position="left"
               ref="formData">
        <el-form-item label="风采内容"
                      prop="styleDescription">
          <el-input v-model="formData.styleDescription"
                    class="w690"
                    type="textarea"
                    maxlength="200"
                    rows="5"
                    show-word-limit
                    placeholder="输入简介内容，不超过200个字"></el-input>
        </el-form-item>
        <el-form-item prop="attachmentList"
                      label="风采图片"
                      class="no-wrap">
          <!-- 上传的图片列表 -->
          <div class="flex w700 f-wrap mt4">
            <div v-for="(item,index) in formData.attachmentList"
                 :key="index"
                 class="flex">
              <div class="relative image-box mr16 mb16">
                <el-image style="width: 120px; height: 120px"
                          :src="$fileHost + item.url"
                          @click="lookBigPhoto(formData.attachmentList,index)">
                </el-image>
                <div class="flex btns wid100 center">
                  <el-upload class="mr16"
                             action=""
                             :http-request="e => uploadWallImg(e,index)"
                             :show-file-list="false"
                             :before-upload="beforeAvatarUpload">
                    <div style="color: #fff">重新上传</div>
                  </el-upload>
                  <span class="pointer"
                        @click.stop="deletePhoto(index)">删除</span>
                </div>
              </div>
            </div>
            <el-upload class="avatar-uploader"
                       action=""
                       multiple
                       :limit="9"
                       :http-request="e => uploadWallImg(e)"
                       :on-exceed="handleExceed"
                       :show-file-list="false"
                       :before-upload="beforeAvatarUpload">
              <div class="flex">
                <div class="upload-line">
                  <svg-icon icon="icon_xingzhuang"
                            class="icon ft28"></svg-icon>
                  <span class="mt-10">上传图片</span>
                </div>
              </div>
            </el-upload>
            <div class="ft12 color-999 line1 column center-justify ml16">
              <div>可一次上传多张</div>
              <div class="mt8"> 支持图片格式：JPEG/JPG/PNG</div>
              <div class="mt8"> 图片大小：单张不大于2M</div>
              <div class="mt8"> 不超过9张</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <big-picture ref="bigPicture"></big-picture>
    </div>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
export default {
  data () {
    const attachmentListRules = (rule, value, callback) => {
      if (this.$isEmpty(this.formData.attachmentList)) {
        return callback(new Error('请上传图片'))
      }
      callback()
    }
    return {
      isPircture: false, // 是否查看大图
      formData: {
        styleDescription: '',
        attachmentList: []
      },
      rules: {
        styleDescription: [
          { required: true, message: '请输入风采内容', trigger: 'blur' }
        ],
        attachmentList: [
          { required: true, validator: attachmentListRules, trigger: 'change' }
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
        ],
        backRouteName: 'ActivityManagement'
      }
    }
  },
  methods: {
    beforeAvatarUpload (file) { // 上传图片之前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt5M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、JPEG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      console.log(this.formData)
      if (this.formData.attachmentList && this.formData.attachmentList.length >= 9) {
        this.$message.warning('最多只能上传9张')
        return false
      }
      return isJPG && isLt5M
    },
    // 超出限制的回调
    handleExceed (files) {
      this.$message.warning('最多只能上传9张')
      // const imgs = Array.from(files).slice(0, 9)
      // imgs.forEach(item => {
      //   this.uploadImg(item)
      // })
    },
    uploadWallImg (e, index) { // 上传照片墙图片
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return
        this.dealUploadImg(res, index)
      })
    },
    // 处理上传的图片
    dealUploadImg (res, index) {
      if (index >= 0) {
        this.formData.attachmentList[index].url = res[0]
      } else {
        const imgs = this.formData.attachmentList || []
        res.forEach((item, i) => {
          imgs.push({ sourceType: '01', url: item })
        })
      }
    },
    deletePhoto (index) { // 删除照片墙的图片列表的某个图片
      this.formData.attachmentList.splice(index, 1)
    },
    lookBigPhoto (imgList, index) { // 查看大图
      const photoList = imgList.map(item => item.url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = photoList[index]
      bigPicture.photoList = photoList
      bigPicture.showPicture = true
    },
    getDetailData () { // 获取详情接口
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyActivityById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        res.content.attachmentList = res.content.styleAttachmentList
        const { styleDescription, attachmentList } = res.content
        const formData = this.formData
        formData.styleDescription = styleDescription
        formData.attachmentList = this.$isEmpty(attachmentList) ? [] : attachmentList
      })
    },
    onSure () { // 确定按钮
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.uploadActivityStyle()
        }
      })
    },
    // 上传风采内容
    uploadActivityStyle () {
      const params = {
        ...this.formData,
        id: this.$route.query.id
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.modifyJourneyActivityStyle(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增成功')
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getDetailData()
    }
  },
  components: { BigPicture, PageHandle }
}
</script>
<style lang="scss" scoped>
.demeanour-style {
  margin-left: 421px !important;
  margin-top: 60px;
}
.no-wrap {
  white-space: nowrap;
}
.w700 {
  width: 700px;
}
.w690 {
  width: 690px;
}
.wid100 {
  width: 100%;
}
.line1 {
  line-height: 1;
}
.btns {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(#000000, 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.image-box {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}
.upload-line {
  width: 120px;
  height: 120px;
  border: 1px solid #e6e5ea;
  border-radius: 4px;
  span {
    color: #518cfc;
    display: block;
  }
  .icon {
    margin-top: 36px;
    color: #999999;
  }
}
</style>
