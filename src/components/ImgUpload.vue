<template>
  <div class='img-upload-wrap row'>
    <div v-for="(item,index) in attachments"
         :key="index"
         class="row">
      <div class="relative image-box mr16 mb16">
        <el-image style="width: 120px; height: 120px"
                  :src="$fileHost + item.url"
                  @click="lookBigPhoto(attachments,index)">
        </el-image>
        <div class="flex btns center">
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
               v-if="attachments.length < 3"
               action=""
               multiple
               :limit="3"
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
  </div>

</template>

<script>
export default {
  name: 'ImgUpload',
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
      if (this.attachments && this.attachments.length >= 3) {
        this.$message.warning('最多只能上传3张')
        return false
      }
      return isJPG && isLt5M
    },
    // 超出限制的回调
    handleExceed (files) {
      this.$message.warning('最多只能上传3张')
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
      const attachments = this.attachments || []
      if (index >= 0) {
        attachments[index] ? attachments[index].url = res[0] : attachments[index] = { url: res[0] }
      } else {
        res.forEach((item, i) => {
          attachments.push({ sourceType: '01', url: item })
        })
      }
      this.$emit('update:attachments', attachments)
    },
    deletePhoto (index) { // 删除照片墙的图片列表的某个图片
      const attachments = this.attachments
      attachments.splice(index, 1)
      this.$emit('update:attachments', attachments)
    },
    lookBigPhoto (imgList, index) { // 查看大图
      const photoList = imgList.map(item => item.url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = photoList[index]
      bigPicture.photoList = photoList
      bigPicture.showPicture = true
    }
  },
  props: {
    attachments: Array,
    default: () => []
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.img-upload-wrap {
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
}
</style>
