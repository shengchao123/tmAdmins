<template>
  <div class="mt60">
    <el-form ref="form"
             class="form"
             :rules="form.rules"
             :model="form.data"
             label-width="80px"
             label-position="left">
      <el-form-item label="标题"
                    prop="title">
        <el-input class="w360"
                  v-model="form.data.title"
                  type="textarea"
                  :rows="2"
                  maxlength="50"
                  show-word-limit
                  placeholder="输入标题"></el-input>
      </el-form-item>
      <el-form-item label="正文"
                    prop="content"
                    class="ml12">
        <el-input class="w658 ml-12"
                  v-model="form.data.content"
                  type="textarea"
                  :rows="16"
                  maxlength="2000"
                  show-word-limit
                  placeholder="输入正文内容"></el-input>
      </el-form-item>
      <el-form-item label="图片"
                    prop="picList"
                    class="ml12">
        <div class="flex ml-12">
          <div class="flex">
            <div class="f-wrap w720">
              <div v-for="(item,index) in form.data.picList"
                   :key="index"
                   class="relative">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="landmark-img"
                     @click="lookImage(form.data.picList,index)" />
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
                           :file-list="form.data.picList">
                  <div class="upload-img tc pointer">
                    <svg-icon icon="icon_tupian"
                              class="ft30 color-999 mt32" />
                    <div class="primary-color ft12 lineh1">上传图片</div>
                  </div>
                </el-upload>
                <div class="color-999 ft12 ml16">
                  <div class="mt8 lineh1">可上传红头文件等图片作为附件</div>
                  <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                  <div class="mt8 lineh1">图片大小：不大于2M</div>
                  <div class="mt8 lineh1">可上传多张</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="附件"
                    prop="attachmentList"
                    class="ml12">
        <el-upload class="upload-demo ml-12"
                   action=""
                   :before-upload="beforeUpload"
                   :http-request="e => uploadFileList(e)"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   multiple
                   :file-list="form.data.attachmentList">
          <div class="center-align ml-12">
            <el-button class="secondary-btn">点击上传</el-button>
            <div class="tl column color-999 ft12 ml16">
              <p class="lineh1">支持文件格式：word/excel/pdf</p>
              <p class="lineh1 mt8">文件大小：不超过5M</p>
            </div>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布单位"
                    prop="publishingDepartment">
        <el-input class="w240"
                  v-model="form.data.publishingDepartment"
                  maxlength="15"
                  show-word-limit
                  placeholder="输入发布单位"></el-input>
        <span class="ft12 color-999 ml8">项目的实际发布单位，如区农业农村局，区政府，区卫生健康局等</span>
      </el-form-item>
    </el-form>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle :confirmText="$route.query.id ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>
<script>
import PageHandle from '@/components/PageHandle'
import BigPicture from '@c/BigPictire'
import { onShowPreview } from '../../urlPreview.js'
export default {
  name: 'Form',
  methods: {
    onShowPreview,
    handleRemove (file) {
      this.form.data.attachmentList.splice(this.form.data.attachmentList.findIndex(item => item.uid === file.id), 1)
    },
    handlePreview (file) {
      const url = this.form.data.attachmentList.filter(item => item.uid === file.uid)[0].url
      this.onShowPreview(url)
    },
    // 查看大图
    lookImage (imgList, index) {
      const photoList = imgList.map(item => item.url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = photoList[index]
      bigPicture.photoList = photoList
      bigPicture.showPicture = true
    },
    // 删除图片
    deleteImg (index) {
      this.form.data.picList.splice(index, 1)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isTxt = file.type === 'text/plain'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (isJPG) {
        this.$message.warning('上传附件不能是图片格式!')
      }
      if (isTxt) {
        this.$message.warning('上传附件不能是TXT格式!')
      }
      if (!isLt5M) {
        this.$message.warning('上传图片大小不能超过5MB!')
      }
      return !isJPG && !isTxt && isLt5M
    },
    uploadFileList (e) {
      const config = {
        uploadType: 'e',
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const obj = {
          name: e.file.name,
          uid: e.file.uid,
          url: res[0],
          sourceType: '04'
        }
        this.form.data.attachmentList.push(obj)
      })
    },
    // 素材类型（01：图片，02：视频，03：音频）
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
      if (type === '2') { // 图片
        if (index >= 0) { // 重新上传
          const uploadImgs = [...this.form.data.picList]
          uploadImgs[index].url = res[0]
          this.form.data.picList = uploadImgs
        } else { // 上传图片
          const img = { sourceType: '01', url: res[0] }
          this.form.data.picList.push(img)
        }
      }
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
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { apiName, msg } = this.actionMap.get(!!this.$route.query.id)
          const params = {
            id: this.$route.query.id,
            ...this.form.data
          }
          this.$deleteObjectEmptyAttr(params)
          this.$api[apiName](params).then(res => {
            if (res.isError) {
              this.$message.error(res.message)
              return
            }
            this.$message.success(msg + '政策成功')
            this.$router.back()
          })
        }
      })
    },
    // 根据id获取政策详情
    getAgricultureRelatedProjectsById (id) {
      this.$api.getAgricultureRelatedProjectsById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.form.data = res?.content ?? {}
      })
    }
  },
  data () {
    return {
      actionMap: Object.freeze(new Map([
        [true, { apiName: 'modifyAgricultureRelatedProjects', msg: '修改' }],
        [false, { apiName: 'createAgricultureRelatedProjects', msg: '新增' }]
      ])),
      photoData: {
        imgs: '',
        index: 0
      },
      isPircture: false,
      form: {
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          // content: [
          //   { required: true, message: '请输入正文内容', trigger: 'blur' }
          // ],
          publishingDepartment: [
            { required: true, message: '请输入发布单位', trigger: 'blur' }
          ]
        }),
        data: {
          title: '',
          content: '',
          picList: [],
          publishingDepartment: '',
          attachmentList: []
        }
      }
    }
  },
  components: {
    PageHandle,
    BigPicture
  },
  created () {
    this.$route.query.id && this.getAgricultureRelatedProjectsById(this.$route.query.id)
  }
}
</script>
<style lang='scss' scoped>
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none !important;
  -webkit-appearance: none;
  background: transparent;
}
/deep/ .el-upload-list__item {
  display: flex;
  &:hover {
    background-color: transparent;
  }
  .el-upload-list__item-name {
    margin-right: 8px;
    color: $primaryColor;
  }
  .el-upload-list__item-status-label {
    // position: relative;
    display: none;
  }
  .el-icon-circle-check {
    display: none;
  }
  .el-icon-close {
    display: inline-block;
    position: relative;
    opacity: 1;
    color: #999;
    font-size: 16px;
  }
}
/deep/ .el-textarea__inner {
  text-align-last: left;
  text-align: justify;
  padding-bottom: 20px !important;
  /* 去除滚动条 */
  &::-webkit-scrollbar {
    display: none !important;
    -webkit-appearance: none;
    background: transparent;
  }
}
.w360 {
  width: 360px;
}
.w658 {
  width: 658px;
}
.w720 {
  width: 720px;
}
.lineh1 {
  line-height: 1;
}
.ml-12 {
  margin-left: -12px;
}
.form {
  margin-left: 20%;
  .landmark-img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    margin-right: 16px;
    margin-bottom: 16px;
  }
  .upload-img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    border: 1px solid #dedede;
  }
  .upload-again {
    position: absolute;
    bottom: 16px;
    left: 0;
    width: 120px;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 0 0 4px 4px;
    color: #ffffff;
  }
}
</style>
