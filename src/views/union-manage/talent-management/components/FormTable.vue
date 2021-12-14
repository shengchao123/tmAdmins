<template>
  <div>
    <el-form :model="talentForm.data"
             :rules="talentForm.talentRules"
             ref="talentForm"
             label-width="75px"
             class="mt32 mt75">
      <el-form-item prop="contentType"
                    label="内容"
                    class="no-wrap">
        <el-radio-group v-model="talentForm.data.contentType"
                        @change="changeType"
                        :disabled="$route.query.id?true:false">
          <el-radio :label="1">图文</el-radio>
          <el-radio :label="4">视频</el-radio>
          <el-radio :label="2">超链接（如微信公众号文章地址）</el-radio>
          <el-radio :label="3">照片墙</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="title"
                    label="标题"
                    class="no-wrap">
        <el-input type="text"
                  placeholder="请输入内容"
                  v-model="talentForm.data.title"
                  maxlength="28"
                  show-word-limit
                  class="width380 show-limit-input" />
      </el-form-item>
      <el-form-item prop="imageUrl"
                    label="封面图"
                    class="no-wrap"
                    v-if="!contentType('video') && (contentType('imageUrl') || (contentType('photoWallList')))">
        <div class="flex">
          <el-upload class="avatar-uploader"
                     action=""
                     :http-request="uploadImg"
                     :show-file-list="false"
                     :before-upload="beforeAvatarUpload">
            <div v-if="talentForm.data.imageUrl"
                 class="relative">
              <img :src="$fileHost + talentForm.data.imageUrl"
                   class="avatar">
              <div class="upload-again">重新上传</div>
            </div>
            <div v-else>
              <div class="upload-line">
                <svg-icon icon="icon_xingzhuang"
                          style="color:#DEDEDE;"
                          class="icon"></svg-icon>
                <span class="mt-10">上传图片</span>
              </div>
            </div>
          </el-upload>
          <div class="align ml16 ft12 upload-describe mt12">
            <p class="mt36">支持图片格式：JPEG/JPG/PNG</p>
            <p class="mt8">尺寸比例：3:2</p>
            <p class="mt8">图片大小：不大于5M</p>
          </div>
        </div>

      </el-form-item>
      <el-form-item prop="videoLinkUrl"
                    label="视频"
                    class="no-wrap w300"
                    v-if="contentType('video')">
        <div>
          <uploader :videoPath.sync="video.videoPath"
                    :videoName.sync="video.videoName"
                    @getVideoPath="getPath"
                    :videoUploadPercent.sync="video.videoUploadPercent"
                    :videoFlag.sync="video.videoFlag">
            <div slot="tip"
                 class="el-upload__tip no-wrap tip-text ml8 column">
              <span>1. 建议尺寸比例：16:9，不超过500M</span>
              <span>2. MPEG、AVI、ASF、WMV、MOV、3GP、MP4</span>
            </div>
          </uploader>
          <el-progress v-if="video.videoFlag === true"
                       :percentage="Math.floor(video.videoUploadPercent * 100) / 100"
                       class="mt8 w300"></el-progress>
          <video v-if="video.videoPath !='' && !video.videoFlag"
                 :src="video.videoPath"
                 class="video-wrap mt8 b"
                 controls="controls">您的浏览器不支持视频播放</video>
        </div>
      </el-form-item>
      <el-form-item prop="digest"
                    :label="contentType('video')?'内容介绍':'内容摘要'"
                    class="no-wrap">
        <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  show-word-limit
                  maxlength="92"
                  v-model="talentForm.data.digest"
                  class="width658"
                  v-if="!contentType('video')">
        </el-input>
        <el-input type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  show-word-limit
                  maxlength="200"
                  v-model="talentForm.data.digest"
                  class="width658"
                  v-if="contentType('video')">
        </el-input>
      </el-form-item>
      <el-form-item prop="photoWallList"
                    label="图片"
                    class="no-wrap"
                    v-if="contentType('photoWallList')">
        <el-upload class="avatar-uploader"
                   action=""
                   multiple
                   :http-request="uploadWallImg"
                   :show-file-list="false"
                   :before-upload="beforeAvatarUpload">
          <div class="flex">
            <el-button size="small"
                       class="secondary-btn">上传图片</el-button>
            <div class="center align ml16 ft14">
              支持一次上传多张。
              支持图片格式：JPEG/JPG/PNG;
              尺寸比例：3:2;
              图片大小：不大于5M
            </div>
          </div>
        </el-upload>
        <!-- 上传的图片列表 -->
        <div v-if="talentForm.data.photoWallList.length>0"
             class="flex wid1200 f-wrap mt4">
          <div v-for="(item,index) in talentForm.data.photoWallList"
               :key="index"
               class="mt16 flex">
            <div class="relative image-box"
                 @click="getIndex(index)">
              <el-image style="width: 135px; height: 90px"
                        :src="$fileHost + item.imageUrl"
                        @click="lookBigPhoto(talentForm.data.photoWallList,index)">
              </el-image>
              <svg-icon icon="icon-icon_fangda"
                        style="color:#518CFC;font-size:10px;"
                        class="magnify-icon"></svg-icon>
              <div class="flex btns wid100 center">
                <el-upload class="mr16"
                           action=""
                           :http-request="againUploadWallImg"
                           :show-file-list="false"
                           :before-upload="beforeAvatarUpload">
                  <div style="color: #fff">重新上传</div>
                </el-upload>
                <span class="pointer"
                      @click.stop="deletePhoto(index)">删除</span>
              </div>
            </div>
            <el-input type="textarea"
                      placeholder="请输入图片描述内容"
                      :rows="4"
                      maxlength="150"
                      show-word-limit
                      v-model="item.description"
                      class="width380 ml8 mr24" />
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="hyperlinksUrl"
                    label="链接地址"
                    class="no-wrap"
                    v-if="contentType('hyperlinksUrl')">
        <el-input type="text"
                  placeholder="请输入地址"
                  v-model="talentForm.data.hyperlinksUrl"
                  class="width380">
        </el-input>
      </el-form-item>
      <el-form-item label="正文"
                    class="pl10 main-text"
                    prop="content"
                    v-if="contentType('content')">
        <quill-editor v-model="talentForm.data.content"
                      :options="editorOption"
                      ref="quillEditor"
                      class="width658 height362">
        </quill-editor>
        <el-upload v-show="false"
                   action=""
                   accept=".jpeg,.png,.jpg,.bmp"
                   ref="editorUpload"
                   :http-request="editorUploadImg"
                   :show-file-list="false">
          <div id="editorUploadBtn">富文本图片上传</div>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item prop="isShow"
                    label="状态"
                    class="no-wrap">
        <el-radio-group v-model="talentForm.data.isShow">
          <el-radio :label="true">展示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item prop="sequence"
                    label="排序"
                    class="no-wrap sequence-left">
        <el-input type="number"
                  placeholder="请输入数字"
                  v-model="talentForm.data.sequence"
                  class="width240" />
        <span class="sequence ml8">不填则按添加时间进行排序</span>
      </el-form-item> -->
    </el-form>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
    <describe-img v-if="isPircture"
                  @closePhoto='closeBounced'
                  :pictureData="photoData"></describe-img>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import { editorTitleConfig } from './config'
import uploader from './Uploader'
import DescribeImg from './DescribeImg'
import quillEditor from '@/mixins/quillEditor'
function rulesFunction (message, trigger) {
  return { required: true, message, trigger }
}

export default {
  components: { uploader, DescribeImg, PageHandle },
  mixins: [quillEditor],
  data () {
    return {
      talentForm: {
        data: {
          contentType: 1,
          content: '',
          title: '',
          imageUrl: '',
          digest: '',
          isShow: true,
          sequence: '',
          videoLinkUrl: '',
          hyperlinksUrl: '',
          photoWallList: []
        },
        talentRules: {
          contentType: [rulesFunction('请选择内容', 'change')],
          content: [rulesFunction('请输入正文内容', 'change')],
          title: [rulesFunction('请输入内容', 'change')],
          imageUrl: [rulesFunction('请上传封面图', 'change')],
          digest: [rulesFunction('请输入内容', 'blur')],
          isShow: [rulesFunction('请输入内容', 'blur')],
          videoLinkUrl: [rulesFunction('请选择上传视频', 'blur')],
          hyperlinksUrl: [rulesFunction('请输入链接地址', 'blur')],
          photoWallList: [rulesFunction('请选择上传照片墙图片', 'change')]
        }
      },
      video: {
        videoPath: '',
        videoFlag: false, // 是否显示进度条
        videoUploadPercent: 0 // 进度条的进度
      },

      addRange: {},
      imageIndex: -1, // 上传照片墙的索引
      isPircture: false, // 是否查看大图
      photoData: {
        pirctureData: '',
        index: 0
      },
      pageHandleConfig: {
        btns: [
          {
            text: this.$route.query.id ? '保存' : '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ],
        backRouteName: this.$route.query.id ? '' : ''
      }
    }
  },
  methods: {
    beforeAvatarUpload (file) { // 上传图片之前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    uploadImg (e, index, type) { // 上传图片
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return
        this.talentForm.data.imageUrl = res[0]
      })
    },
    uploadWallImg (e, index) { // 上传照片墙图片
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return
        const imgs = this.talentForm.data.photoWallList
        res.forEach((item, i) => {
          imgs.push({ imageUrl: item, description: '' })
        })
      })
    },
    againUploadWallImg (e, index) { // 重新上传照片墙图片
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return
        this.talentForm.data.photoWallList[this.imageIndex].imageUrl = res[0]
        this.imageIndex = -1
      })
    },
    getIndex (index) { // 获取上传图片的索引
      this.imageIndex = index
    },
    lookBigPhoto (data, index) { // 查看大图
      this.isPircture = true
      this.photoData.pictureData = data
      this.photoData.index = index
    },

    autotip () { // 符文编辑框的功能显示提示文字
      document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
      for (const item of editorTitleConfig) {
        const tip = document.querySelector('.quill-editor ' + item.Choice)
        if (!tip) continue
        tip.setAttribute('title', item.title)
      }
    },
    onSure () { // 保存按钮
      const params = this.talentForm.data
      const talentId = this.$route.query.id
      this.$refs.talentForm.validate((valid) => {
        if (valid) {
          params.contentType = '0' + params.contentType
          const apiName = talentId ? 'modifyGraphic' : 'createGraphic'
          params.id = talentId || null
          this.$deleteObjectEmptyAttr(params)
          this.$api[apiName](params).then(res => {
            if (res.isError) return this.$message.error(res.message)
            this.$message.success(talentId ? '编辑成功' : '新增成功')
            this.$router.back()
            this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
          })
        }
      })
    },
    getDetailData () { // 获取详情接口
      const params = {
        id: this.$route.query.id
      }
      const that = this
      this.$api.getGraphicById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const content = res.content
        that.talentForm.data = {
          ...content,
          contentType: Number(content.contentType.substr(1))
        }
        that.talentForm.data.photoWallList = content.photoWallList || []
        that.video.videoPath = content.videoLinkUrl
      })
    },
    closeBounced (status) { // 关闭弹框
      this.isPircture = status
    },
    changeType (val) { // 单选框选择类型
      // 拦截监听 富文本编辑器的  图片 按钮
      if (val === 1) {
        setTimeout(this.autotip, 400)
      }
    },
    getPath (val) { // 获取上传的视频地址
      if (val.remove) {
        this.talentForm.data.videoLinkUrl = ''
      } else {
        this.talentForm.data.videoLinkUrl = val
      }
    },
    deletePhoto (index) { // 删除照片墙的图片列表的某个图片
      this.talentForm.data.photoWallList.splice(index, 1)
    }
  },
  computed: {
    contentType () { // 筛选类型
      return (type) => {
        const contentType = this.talentForm.data.contentType
        switch (type) {
          case 'video':
            return contentType === 4
          case 'imageUrl':
            return contentType === 1 || contentType === 2
          case 'content':
            return contentType === 1
          case 'hyperlinksUrl':
            return contentType === 2
          case 'photoWallList':
            return contentType === 3
          default:
            return false
        }
      }
    }
  },
  created () {
    if (this.$route.query.id) { // 获取编辑接口
      this.getDetailData()
    }
  }
}
</script>
<style scoped lang='scss'>
.upload-line {
  width: 240px;
  height: 160px;
  border: 1px solid #e6e5ea;
  border-radius: 4px;
  span {
    color: #518cfc;
    display: block;
  }
  .icon {
    width: 40px;
    height: 35px;
    margin-top: 50px;
  }
}
.align {
  text-align: left;
  color: #999999;
}
.avatar {
  width: 240px;
  height: 160px;
  border: 1px solid #e6e5ea;
  border-radius: 4px;
}

.height362 {
  height: 362px;
  margin-bottom: 75px;
}
.sequence {
  font-size: 14px;
  color: #999999;
}
/deep/ .el-form-item__label {
  text-align: left;
}
.sequence-left {
  /deep/ .el-form-item__label {
    padding-left: 10px;
  }
}
.mt75 {
  margin-bottom: 75px;
  margin-left: 183px;
}
.video-wrap {
  width: 240px;
  height: 135px;
}
/deep/ .el-upload__tip {
  margin-top: 0;
  text-align: left;
  line-height: 16px;
}
.wid100 {
  width: 100%;
}
.width240 {
  width: 240px;
}
.w300 {
  width: 300px;
}
.width380 {
  width: 380px;
}

.width658 {
  width: 658px;
}
.wid1200 {
  width: 1200px;
}
.photo-wall {
  width: 135px;
  height: 90px;
}
.btns {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: rgba(#000000, 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.upload-wall-photo {
  width: 80px;
  height: 32px;
  border: 1px solid #e6e5ea;
  border-radius: 4px;
}
/deep/ .el-textarea__inner {
  height: 92px;
}
.image-box {
  width: 135px;
  height: 90px;
}
.upload-again {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
/deep/ .el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  line-height: 28px;
}
/deep/.el-textarea .el-input__count {
  background: transparent;
}
.magnify-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.show-limit-input {
  /deep/.el-input__inner {
    padding-right: 50px !important;
  }
}
.upload-describe {
  p {
    line-height: 15px !important;
  }
}
.no-wrap {
  white-space: nowrap;
}
.main-text {
  /deep/.el-form-item__error {
    padding-top: 10px !important;
  }
}
</style>
