<template>
  <div class="img-back"
       v-if="showPicture">
    <div @click="closeBack">
      <svg-icon icon="icon_guanbi"
                class="close pointer icon ft30 color-fff"></svg-icon>
    </div>
    <div class="img-content">
      <div class="flex center">
        <div class="icon-arrow mr88 pointer center"
             @click="switchPhonto('previous')">
          <svg-icon icon="icon_zuojiantou"
                    class="icon ft30 color-fff"></svg-icon>
        </div>
        <el-image class="main-img"
                  fit="scale-down"
                  :src="$fileHost + nowPhoto">
        </el-image>
        <div class="icon-arrow ml88 pointer center"
             @click="switchPhonto('next')">
          <svg-icon icon="icon_xiangyoujiantou"
                    class="icon ft30 color-fff"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowPhoto: '',
      photoIndex: '',
      photoList: [],
      showPicture: false
    }
  },
  methods: {
    closeBack () {
      this.showPicture = false
    },
    // 切换图片
    switchPhonto (type) {
      const imgList = this.photoList
      let indexs = null
      if (this.photoIndex > 0 && type === 'previous') { // 切换上一个
        indexs = this.photoIndex - 1
        this.photoIndex = indexs
        this.nowPhoto = imgList[indexs]
      }
      if (this.photoIndex < imgList.length - 1 && type === 'next') { // 切换下一个
        indexs = this.photoIndex + 1
        this.photoIndex = indexs
        this.nowPhoto = imgList[indexs]
      }
    }
  }
}
</script>
<style scoped>
.img-back {
  background: #2b2b2b;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
}
.close {
  position: absolute;
  top: 35px;
  right: 48px;
  width: 18px;
  height: 18px;
}
.img-content {
  position: relative;
  top: 55%;
  transform: translate(0%, -50%);
  text-align: center;
}
.main-img {
  width: 900px;
  height: 600px;
}
.icon-arrow {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(151, 151, 151, 0.1);
}
.mr88 {
  margin-right: 88px;
}
.ml88 {
  margin-left: 88px;
}
.color-fff {
  color: #ffffff;
}
</style>
