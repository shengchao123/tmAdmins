<template>
  <page title="公告详情">
    <div class="activity-details-info"
         v-if="afficheDetailData.title">
      <div class="flex mt16">
        <div class="w90">公告标题:</div>
        <div>{{afficheDetailData.title}}</div>
      </div>
      <div class="flex mt24">
        <div class="w90 no-wrap">公告内容:</div>
        <div class="w674 line5">{{afficheDetailData.content}}</div>
      </div>
      <div class="flex mt24"
           v-if="afficheDetailData.attachmentList.length">
        <div class="w90">图片:</div>
        <div class="flex w855">
          <div v-for="(item,index) in afficheDetailData.attachmentList"
               :key="index">
            <img :src="$fileHost + item.url"
                 alt=""
                 class="landmark-img"
                 @click="lookBigPhoto(afficheDetailData.attachmentList,index)" />
          </div>
        </div>
      </div>
      <div class="flex mt24">
        <div class="w90">组织单位:</div>
        <div>{{afficheDetailData.orgName}}</div>
      </div>
      <div class="flex mt24">
        <div class="w90">送达对象:</div>
        <div>{{afficheDetailData.isAllMember?'所有用户':'特定用户'}}</div>
        <div v-if="!afficheDetailData.isAllMember">
          <span v-for="(item,index) in afficheDetailData.labelNames"
                :key="index"
                class="label-list">{{item}}{{afficheDetailData.labelNames.length > (index + 1)?',':''}}</span>
        </div>
      </div>
    </div>
    <page-handle :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'

export default {
  data () {
    return {
      pageHandleConfig: {
        btns: [
          {
            text: '返回',
            event: 'cancel'
          }
        ]
      },
      afficheDetailData: {}
    }
  },
  methods: {
    // 获取详情数据
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyAnnouncementById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.afficheDetailData = res.content
      })
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
  created () {
    this.getDetailData()
  },
  components: { PageHandle, BigPicture }
}
</script>

<style lang="scss" scoped>
.w90 {
  width: 90px;
  color: #999999;
}
.w674 {
  width: 674px;
}
.activity-details-info {
  margin-left: 411px !important;
  margin-top: 60px;
}
.label-list {
  padding: 7px 8px;
  color: #fc8d11;
  background: #fff8f0;
  border-radius: 4px;
}
.no-wrap {
  white-space: nowrap;
}
.line5 {
  line-height: 1.5;
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
</style>
