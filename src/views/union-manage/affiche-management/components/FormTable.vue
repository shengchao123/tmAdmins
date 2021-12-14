<template>
  <div class="activity-details-info pb8">
    <el-form class="base-info mt24"
             :rules="rules"
             :model="formData"
             label-width="100px"
             label-position="left"
             ref="formData">
      <el-form-item label="公告标题"
                    prop="title">
        <el-input v-model="formData.title"
                  class="w380"
                  maxlength="20"
                  show-word-limit
                  placeholder="请输入公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容"
                    prop="content">
        <el-input v-model="formData.content"
                  class="w690"
                  type="textarea"
                  rows="5"
                  maxlength="500"
                  show-word-limit
                  placeholder="输入简介内容，不超过500个字"></el-input>
      </el-form-item>
      <el-form-item label="图片"
                    prop="attachmentList"
                    class="form-pl">
        <div class="mb8 flex">
          <div class="flex">
            <div class="flex w855">
              <div v-for="(item,index) in formData.attachmentList"
                   :key="index"
                   class="relative">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="landmark-img"
                     @click="lookBigPhoto(formData.attachmentList,index)" />
                <div class="flex center upload-again">
                  <el-upload action=""
                             accept=".jpeg,.png,.jpg"
                             :before-upload="beforeHandleUpload"
                             :http-request="e => uploadMaterial(e, '2',index)"
                             :show-file-list="false">
                    <div class="pointer">重新上传</div>
                  </el-upload>
                  <div class="ml16 pointer"
                       @click="deleteImg(index)">删除</div>
                </div>
              </div>
              <div class="flex">
                <el-upload action=""
                           multiple
                           accept=".jpeg,.png,.jpg"
                           :before-upload="beforeHandleUpload"
                           :http-request="e => uploadMaterial(e,'2')"
                           :show-file-list="false"
                           :file-list="formData.attachmentList">
                  <div class="upload-img tc pointer">
                    <svg-icon icon="icon_tupian"
                              class="ft30 color-999 mt32" />
                    <div class="primary-color ft12 lineh1">上传图片</div>
                  </div>
                </el-upload>
                <div class="color-999 ft12 ml16 column center-justify">
                  <div class="lineh1">支持图片格式：JPEG/JPG/PNG</div>
                  <div class="mt8 lineh1">图片大小：不大于2M</div>
                  <div class="mt8 lineh1">可上传多张</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="组织单位"
                    prop="name"
                    class="org-name form-pl">
        <div>{{orgName}}</div>
      </el-form-item>
      <el-form-item label="送达对象"
                    prop="isAllMember">
        <el-radio-group v-model="formData.isAllMember">
          <div class="mt12">
            <el-radio :label="true">全部用户</el-radio>
          </div>
          <div class="center-align mt12 restrict">
            <el-radio :label="false">特定用户</el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div v-if="!formData.isAllMember"
         class="w690 ml176 check-label">
      <el-checkbox-group v-model="formData.labelIds">
        <el-checkbox-button v-for="(item,index) in labelOptions"
                            :label="item.id"
                            :key="index"
                            class="label-item">{{item.name}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'

export default {
  data () {
    const labelRules = (rule, value, callback) => {
      if (!this.formData.isAllMember && this.formData.labelIds.length === 0) return callback(new Error('请至少选择一个标签'))
      callback()
    }
    return {
      formData: {
        title: '',
        content: '',
        attachmentList: [],
        orgName: '',
        isAllMember: true,
        labelIds: []
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        isAllMember: [
          { required: true, validator: labelRules, trigger: 'blur' }
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
        backRouteName: this.$route.query.id ? '' : ''
      },
      deliveryOptions: [{ name: '所有用户', id: '01' }, { name: '特定用户', id: '02' }],
      labelOptions: [],
      photoData: {
        imgs: '',
        index: 0
      },
      isPircture: false
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
    // 保存、确定接口
    save () {
      const params = this.formData
      this.$deleteObjectEmptyAttr(params)
      this.$api.createJourneyAnnouncement(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增成功')
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
    },
    // 获取标签列表
    getLabels () {
      this.$api.getSystemGroupMemberLabelList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.labelOptions = res.content
      })
    },
    // 上传素材(图片和音频、视频)
    uploadMaterial (e, type, index) {
      const config = {
        uploadType: 'm',
        fileType: type,
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dealUploadData(type, res, index)
      })
    },
    // 处理上传的数据
    dealUploadData (type, res, index) {
      if (index >= 0) { // 重新上传
        const pointImages = [...this.formData.attachmentList]
        pointImages[index].url = res[0]
        this.formData.attachmentList = pointImages
      } else { // 上传图片
        const img = { sourceType: '01', url: res[0] }
        this.formData.attachmentList.push(img)
      }
    },
    // 删除图片
    deleteImg (index) {
      this.formData.attachmentList.splice(index, 1)
    },
    // 上传之前的限制 图片
    beforeHandleUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传图片只能是 png/jpeg/jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    }
  },
  computed: {
    orgName () {
      return localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
    }
  },
  created () {
    this.getLabels()
  },
  components: { PageHandle, BigPicture }
}
</script>
<style lang='scss' scoped>
.mb2 {
  margin-bottom: 2px;
}
.w380 {
  width: 380px;
}
.w690 {
  width: 690px;
}
.ml176 {
  margin-left: 176px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.landmark-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.lineh1 {
  line-height: 1;
}
.upload-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  border: 1px solid #dedede;
}
.upload-again {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 150px;
  background: rgba($color: #000000, $alpha: 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.activity-details-info {
  margin-left: 411px !important;
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
.label-item {
  margin-left: 16px;
  /deep/.el-checkbox-button__inner {
    background: #f9f9f9;
    border: 1px solid #dedede;
    border-radius: 4px !important;
    padding: 7px 8px;
  }
}
.check-label {
  /deep/.el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #666666;
    background: rgba(83, 139, 253, 0.08);
  }
}
.org-name {
  /deep/.el-form-item__label {
    color: #999999 !important;
  }
}
.form-pl {
  /deep/.el-form-item__label {
    padding-left: 10px;
  }
}
</style>
