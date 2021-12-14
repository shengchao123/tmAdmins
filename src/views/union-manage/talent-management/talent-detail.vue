<template>
  <page title="风采详情"
        needPadding>
    <div class="ml183 mt60">
      <div class="flex mt16"
           v-if="showData.title">
        <div class="w70">内容:</div>
        <div class="col333">{{showData.contentTypeName}}</div>
      </div>
      <div class="flex mt16"
           v-if="showData.title">
        <div class="w70">标题:</div>
        <div class="col333">{{showData.title}}</div>
      </div>
      <div class="flex mt24"
           v-if="showData.imageUrl">
        <div class="w70">封面图:</div>
        <img :src="$fileHost + showData.imageUrl"
             alt=""
             class="cover-img">
      </div>
      <div class="flex mt24"
           v-if="showData.videoLinkUrl">
        <div class="w70">视频:</div>
        <div class="col333">
          <video :src="showData.videoLinkUrl"
                 class="video-wrap mt8 b"
                 controls="controls">您的浏览器不支持视频播放</video>
        </div>
      </div>
      <div class="flex mt24"
           v-if="showData.digest">
        <div class="w70">{{showData.contentType ==='04'?'内容介绍':'内容摘要'}}:</div>
        <div class="col333 lh1 mt-4">{{showData.digest}}</div>
      </div>
      <div class="flex mt24"
           v-if="showData.photoWallList">
        <div class="w70">图片:</div>
        <div class="photo-wall-list flex f-wrap">
          <div v-for="(item,index) in showData.photoWallList"
               :key="index"
               class="flex mb16">
            <el-image style="width: 135px; height: 90px"
                      :src="$fileHost + item.imageUrl"
                      class="mr8 block">
            </el-image>
            <div class="phote-list mr24">{{item.description || '暂无图片描述内容'}}</div>
          </div>
        </div>
      </div>
      <div class="flex mt24"
           v-if="showData.hyperlinksUrl">
        <div class="w70">链接地址:</div>
        <div class="col333">{{showData.hyperlinksUrl}}</div>
      </div>
      <div class="flex mt24"
           v-if="showData.content">
        <div class="w70">正文:</div>
        <div class="col333 rich-text"
             v-html="showData.content"></div>
      </div>
    </div>

    <page-handle @onConfirm="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
export default {
  data () {
    return {
      pageHandleConfig: {
        btns: [
          {
            text: '返回',
            event: 'cancel'
          },
          {
            text: '编辑',
            class: 'secondary-btn',
            event: 'onConfirm'
          }
        ]
      },
      showData: {}
    }
  },
  methods: {
    // 获取详情数据
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getGraphicById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.showData = res.content
      })
    },
    // 跳转编辑
    onEdit () {
      this.$router.push({ name: 'EditTalent', query: { id: this.$route.query.id } })
    }
  },
  created () {
    this.getDetailData()
  },
  components: { PageHandle }
}
</script>

<style lang="scss" scoped>
.ml183 {
  margin-left: 183px;
}
.mt60 {
  margin-top: 60px;
}
.w75 {
  width: 70px;
  color: #999999;
}
.w70 {
  width: 70px;
  color: #999999;
  margin-right: 8px;
}
.col333 {
  color: #333333;
  font-size: 14px;
  width: 680px;
}
.photo-wall-list {
  width: 1120px;
  color: #333333;
  font-size: 14px;
}
.rich-text {
  line-height: 1.5;
  /deep/img {
    width: 680px !important;
    // margin-top: 24px;
  }
}
.cover-img {
  width: 240px;
  height: 160px;
  border-radius: 4px;
}
.video-wrap {
  width: 240px;
  height: 135px;
}
/deep/.el-input.is-disabled .el-input__inner {
  background-color: transparent;
  border: none;
}
/deep/.el-input__suffix {
  display: none;
}
.w300 {
  width: 300px;
}
.phote-list {
  width: 368px;
  height: 74px;
  border-radius: 4px;
  background: #f9f9f9;
  border: 1px solid #dedede;
  padding: 8px;
  overflow-y: scroll;
  line-height: 1.5;
}
.lh1 {
  line-height: 1.5;
}
.mt-4 {
  margin-top: -4px;
}
</style>
