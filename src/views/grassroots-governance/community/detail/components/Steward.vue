<template>
  <div class='community-wrap'>
    <div class="info-title">管家</div>
    <div class="content column center-align pt48">
      <div class="table b mb24"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="center-align">
          <div class="color-999 label1">姓名：</div>
          <div style="color: #fc8d11;width:290px">{{item.name}}</div>
          <span class="color-999">标题</span>
          <div class="label2">{{item.title}}</div>
        </div>
        <div class="row mt16">
          <div class="color-999 label1">人物介绍：</div>
          <div class="flex1"
               style="line-height:1.3">
            {{item.introduce}}
          </div>
        </div>
        <div class="row mt16">
          <div class="color-999 label1">主要贡献：</div>
          <div class="flex1"
               style="line-height:1.3">{{item.contribution}}</div>
        </div>
        <div class="row mt16">
          <div class="color-999 label1">主要评价：</div>
          <div class="flex1"
               style="line-height:1.3">{{item.evaluate}}</div>
        </div>
        <div class="row mt16">
          <div class="color-999 label1">图片：</div>
          <div class="flex1 row">
            <div v-for="(item1,index1) in item.attachments"
                 :key="index1">
              <img :src="$fileHost + item1.url"
                   class="mr16 pointer"
                   style="width:120px;height:120px;"
                   @click="lookBigPhoto(item.attachments,index1)" />
            </div>
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
  name: 'community',
  methods: {
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
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    },
    initRequest () {
      this.getList()
    }
  },
  created () {
    this.initRequest()
  },
  data () {
    return {
      dataList: []
    }
  },
  components: {
    BigPicture
  },
  props: {
    communityOrgId: String
  }
}
</script>

<style lang='scss' scoped>
.community-wrap {
  padding: 70px 100px;
  .label1 {
    width: 80px;
  }
  .label2 {
    width: 120px;
  }
  .label2 {
    width: 670px;
  }
  .table {
    padding: 24px 32px;
    background: #f9f9f9;
    border-radius: 6px;
  }
}
</style>
