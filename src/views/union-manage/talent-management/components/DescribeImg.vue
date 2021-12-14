<template>
  <div class="img-back">
    <!-- <el-image class="close pointer"
              src="https://hzslzx.oss-cn-hangzhou.aliyuncs.com/material/image/2020111614291126237207852559360.png"> -->
    <div @click="closeBack">
      <svg-icon icon="icon_guanbi"
                class="close pointer icon ft30 color-fff"></svg-icon>
    </div>
    <!-- </el-image> -->
    <div class="img-content">
      <div class="flex center">
        <div class="icon-arrow mr88 pointer center"
             @click="switchPhonto('previous')">
          <svg-icon icon="icon_zuojiantou"
                    class="icon ft30 color-fff"></svg-icon>
        </div>
        <el-image class="main-img"
                  fit="scale-down"
                  :src="$fileHost+photoDetail">
        </el-image>
        <div class="icon-arrow ml88 pointer center"
             @click="switchPhonto('next')">
          <svg-icon icon="icon_xiangyoujiantou"
                    class="icon ft30 color-fff"></svg-icon>
        </div>

      </div>
      <el-input type="text"
                placeholder="请输入图片描述内容"
                v-model="inptCont"
                class="wid900 ml8 mr24" />
      <div class="index mt40">{{photoIndex+1}}/{{pictureData.pictureData.length}}</div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    pictureData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      photoDetail: '',
      photoIndex: '',
      inptCont: ''
    }
  },
  methods: {
    closeBack () {
      this.$emit('closePhoto', false)
    },
    // 切换图片
    switchPhonto (type) {
      const params = this.pictureData.pictureData
      let indexs = null
      if (this.photoIndex > 0 && type === 'previous') { // 切换上一个
        indexs = this.photoIndex - 1
        this.photoIndex = indexs
        this.photoDetail = params[indexs].imageUrl
        this.inptCont = params[indexs].description
      }
      if (this.photoIndex < params.length - 1 && type === 'next') { // 切换下一个
        indexs = this.photoIndex + 1
        this.photoIndex = indexs
        this.photoDetail = params[indexs].imageUrl
        this.inptCont = params[indexs].description
      }
    }
  },
  created () {
    this.photoDetail = this.pictureData.pictureData[this.pictureData.index].imageUrl
    this.inptCont = this.pictureData.pictureData[this.pictureData.index].description
    this.photoIndex = this.pictureData.index
  }
}
</script>
<style scoped lang="scss">
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
.index {
  font-size: 20px;
  opacity: 0.5;
  color: #ffffff;
}
.mr88 {
  margin-right: 88px;
}
.ml88 {
  margin-left: 88px;
}
.wid900 {
  width: 900px;
  background: transparent;
}

/deep/ .el-input__inner {
  background: transparent;
  border: none;
  color: #999999 !important;
}
.color-fff {
  color: #ffffff;
}
</style>
