<template>
  <div class='community-wrap'>
    <div class="info-title">管家</div>
    <div class="content">
      <div class="center-align mb16"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="community-item-wrap">
          <div class="center-align">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>姓名</span>
            </div>
            <el-input v-model="item.name"
                      placeholder="输入姓名"
                      maxlength="5"
                      show-word-limit></el-input>
            <div class="label1 ml48">
              <span style="color:#ff0000">*</span>
              <span>标题</span>
            </div>
            <el-input v-model="item.title"
                      placeholder="输入标题"
                      maxlength="30"
                      class="limit"
                      show-word-limit></el-input>
          </div>

          <div class="mt16 row">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>人物介绍</span>
            </div>
            <el-input v-model="item.introduce"
                      class="w690"
                      type="textarea"
                      maxlength="500"
                      rows="5"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
          <div class="mt16 row">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>主要贡献</span>
            </div>
            <el-input v-model="item.contribution"
                      class="w690"
                      type="textarea"
                      maxlength="500"
                      rows="5"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
          <div class="mt16 row">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>主要评价</span>
            </div>
            <el-input v-model="item.evaluate"
                      class="w690"
                      type="textarea"
                      maxlength="500"
                      rows="5"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
          <div class="mt16 row">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>图片</span>
            </div>
            <div v-for="(item1,index1) in item.attachments"
                 :key="index1"
                 class="flex">
              <div class="relative image-box mr16 mb16">
                <el-image style="width: 120px; height: 120px"
                          :src="$fileHost + item1.url"
                          @click="lookBigPhoto(item.attachments,index1)">
                </el-image>
                <div class="flex btns wid100 center">
                  <el-upload class="mr16"
                             action=""
                             :http-request="e => uploadWallImg(e, index, index1)"
                             :show-file-list="false"
                             :before-upload="e => beforeAvatarUpload(e, index)">
                    <div style="color: #fff">重新上传</div>
                  </el-upload>
                  <span class="pointer"
                        @click.stop="deletePhoto(index, index1)">删除</span>
                </div>
              </div>
            </div>
            <el-upload class="avatar-uploader"
                       action=""
                       multiple
                       :limit="9"
                       :http-request="e => uploadWallImg(e, index, index1)"
                       :on-exceed="handleExceed"
                       :show-file-list="false"
                       :before-upload="e => beforeAvatarUpload(e, index)">
              <div class="flex">
                <div class="upload-line">
                  <svg-icon icon="icon_xingzhuang"
                            class="icon ft28"></svg-icon>
                  <span class="mt-10">上传图片</span>
                </div>
              </div>
            </el-upload>
            <div class="ft12 color-999 line1 column center-justify ml16">
              <div> 支持图片格式：JPEG/JPG/PNG</div>
              <div class="mt8"> 尺寸大小：690*690px</div>
              <div class="mt8"> 宽高比例：1:1</div>
              <div class="mt8"> 图片大小：不大于2M</div>
              <div class="mt8"> 不超过3张</div>
            </div>
          </div>
        </div>
        <div>
          <span @click="onAddCommunity(index)">
            <SvgIcon icon="icon_tianjia"
                     v-show="index === dataList.length - 1"
                     class="text-btn ml16 mr8"></SvgIcon>
          </span>
          <span @click="onSubCommunity(index)">
            <SvgIcon icon="icon_jianshao"
                     class="text-btn ml16"
                     v-show="dataList.length >= 2"></SvgIcon>
          </span>
        </div>
      </div>

    </div>
    <BigPictire ref="bigPicture"></BigPictire>
  </div>
</template>

<script>
import BigPictire from '@/components/BigPictire'
import { checkInput } from '@/utils/validate.js'

export default {
  name: 'community',
  methods: {
    beforeAvatarUpload (file, index) { // 上传图片之前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt5M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、JPEG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      if (this.dataList[index].attachments && this.dataList[index].attachments.length >= 3) {
        this.$message.warning('最多只能上传3张')
        return false
      }
      return isJPG && isLt5M
    },
    // 超出限制的回调
    handleExceed (files) {
      this.$message.warning('最多只能上传3张')
    },
    uploadWallImg (e, index, index1) { // 上传照片墙图片
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return
        this.dealUploadImg(res, index, index1)
      })
    },
    // 处理上传的图片
    dealUploadImg (res, index, index1) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      const attachments = temArr[index].attachments || []
      if (index1 >= 0) {
        attachments[index1] ? attachments[index1].url = res[0] : attachments[index1] = { url: res[0] }
      } else {
        res.forEach((item, i) => {
          attachments.push({ sourceType: '01', url: item })
        })
      }
      temArr[index].attachments = attachments
      this.dataList = temArr
    },
    deletePhoto (index, index1) { // 删除照片墙的图片列表的某个图片
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      const attachments = temArr[index].attachments
      attachments.splice(index1, 1)
      temArr[index].attachments = attachments
      this.dataList = temArr
    },
    lookBigPhoto (imgList, index) { // 查看大图
      const photoList = imgList.map(item => item.url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = photoList[index]
      bigPicture.photoList = photoList
      bigPicture.showPicture = true
    },
    onConfirm () {
      for (const i in this.dataList) {
        const item = this.dataList[i]
        if (!item.name) {
          return this.showMessage('请填写姓名')
        }
        if (!item.title) {
          return this.showMessage('请填写标题')
        }

        if (!item.contribution) {
          return this.showMessage('请填写贡献')
        }

        if (!item.evaluate) {
          return this.showMessage('请填写评价')
        }

        if (!item.introduce) {
          return this.showMessage('请填写介绍')
        }
      }
      this.updateInfo()
    },
    showMessage (msg) {
      this.$message.warning(msg)
    },
    updateInfo () {
      const params = {
        communityOrgId: this.communityOrgId,
        communityStewards: this.dataList
      }
      this.$api.updateJourneyCommunitySteward(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
      })
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityStewardList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },
    initDataList () {
      this.dataList = [
        {
          introduce: '',
          contribution: '',
          name: '',
          attachments: '',
          title: '',
          evaluate: ''
        }
      ]
    },
    onAddCommunity () {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.push({
        introduce: '',
        contribution: '',
        name: '',
        attachments: '',
        title: '',
        evaluate: ''
      })
      this.dataList = temArr
    },
    onSubCommunity (index) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.splice(index, 1)
      this.dataList = temArr
    },
    initRequest () {
      this.getList()
    }
  },
  components: { BigPictire },
  data () {
    return {
      isPircture: false, // 是否查看大图
      dataList: []
    }
  },
  props: {
    communityOrgId: String,
    plotOptions: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.initRequest()
    this.initDataList()
  }
}
</script>

<style lang='scss' scoped>
.w690 {
  width: 690px;
}
.label1 {
  width: 54px;
}
.label2 {
  width: 70px;
}
.label3 {
  width: 40px;
}

.community-wrap {
  padding: 70px 100px;
  .content {
    padding: 32px 100px;
  }
  .el-input {
    width: 240px;
  }

  .community-item-wrap {
    min-width: 700px;
    padding: 24px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
  }
  .image-box {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
  .btns {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(#000000, 0.5);
    border-radius: 0 0 4px 4px;
    color: #ffffff;
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
}
</style>
