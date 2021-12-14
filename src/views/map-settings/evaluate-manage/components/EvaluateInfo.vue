<template>
  <div>
    <div class="mt60 ml307">
      <img :src="noteStatus(noteDetail)"
           alt=""
           class="note-status"
           v-if="isShowStatus(noteDetail)">
      <div class="ml65">
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">评价ID：</div>
          <div>{{noteDetail.code}}</div>
          <div class="error-color ml16 hidden ft10"
               v-if="noteDetail.status === 2">已隐藏</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">发布人：</div>
          <img :src="$fileHost + noteDetail.avatar"
               alt=""
               class="head-img">
          <div class="ml8 mr8">{{noteDetail.nick}}</div>
          <!-- <div class="designation"
               v-if="noteDetail.communityTitle">{{noteDetail.communityTitle}}</div> -->
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">发布时间：</div>
          <div>{{$moment(noteDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">行程：</div>
          <div>{{noteDetail.journeyItineraryName}}</div>
          <!-- <div v-for="(item,index) in noteDetail.journeyItineraryName"
               :key="index"> #{{item}} </div> -->
        </div>
        <div class="flex mb24">
          <div class="color-999 w70 mr8">图片:</div>
          <div class="w700 f-wrap">
            <div v-for="(item,index) in noteDetail.attachments"
                 :key="index">
              <img :src="$fileHost + item"
                   alt=""
                   class="issue-img mr16 mb24"
                   @click="lookImage(noteDetail.attachments,index)">
            </div>
          </div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">标题：</div>
          <div>{{noteDetail.title}}</div>
        </div>
        <div class="flex mb32">
          <div class="color-999 w70 mr8">内容：</div>
          <div class="w760 lheight">
            {{noteDetail.content || '--'}}
          </div>
        </div>
      </div>
    </div>
    <big-picture ref="bigPicture"></big-picture>
  </div>
</template>
<script>
import BigPicture from '@c/BigPictire'

export default {
  methods: {
    // 查看大图
    lookImage (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index]
      bigPicture.photoList = imgList
      bigPicture.showPicture = true
    }
  },
  props: {
    noteDetail: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    // 展示已删除的图片
    noteStatus () {
      return (val) => {
        if (val.status === 3) return require('@/assets/noteManage/deleted.png')
      }
    },
    // 是否展示图片
    isShowStatus () {
      return (val) => {
        return val.status === 3 || val.isRecommend
      }
    }
  },
  components: { BigPicture }
}
</script>
<style lang="scss" scoped>
.mt60 {
  margin-top: 60px;
}
.ml65 {
  margin-left: 65px;
}
.ml307 {
  margin-left: 307px;
}
.mr60 {
  margin-right: 60px;
}
.w170 {
  width: 170px;
}
.w760 {
  width: 760px;
}
.w70 {
  width: 70px;
}
.head-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
.goods-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
.issue-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}
.designation {
  font-size: 10px;
  transform: scale(0.9);
  background: #fc8d11;
  color: #ffffff;
  padding: 4px;
  border-radius: 2px;
}
.w700 {
  width: 700px;
}
.lheight {
  line-height: 1.5;
}
.note-status {
  position: absolute;
  top: 140px;
  right: 550px;
  width: 60px;
  height: 60px;
}
.hidden {
  padding: 3px 6px;
  border: 1px solid #e02020;
  border-radius: 2px;
  transform: scale(0.8);
}
</style>
