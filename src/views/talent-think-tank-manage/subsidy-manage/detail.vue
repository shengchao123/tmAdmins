<template>
  <page title='项目详情'
        class="detail-wrap"
        needPadding>
    <div class="container pb28">
      <template v-for="(item,index) in dataList">
        <div :key="index"
             class="ft14 flex list-item"
             v-if="!$isEmpty(detailInfo[item.keyName])">
          <span class="color-999 title i-block">{{item.title}}</span>
          <div class="content">
            <div v-if="item.keyName === 'picList'"
                 class="flex">
              <div v-for="(imgItem,imgIndex) in detailInfo.picList"
                   :key="imgIndex"
                   class="img-item">
                <el-image class="img"
                          :src="$fileHost + imgItem.url"
                          fit="fit"
                          @click="lookImage(detailInfo.picList,imgIndex)"></el-image>
              </div>
            </div>
            <div class="file-list"
                 v-else-if="item.keyName==='attachmentList'">
              <p v-for="(fileItem,fileIndex) in detailInfo.attachmentList"
                 :key="fileIndex"
                 class="pointer lineh1-5 file-content"
                 @click="onShowPreview(fileItem.url)">{{fileItem.name}}</p>
            </div>
            <span v-else
                  class="text i-block"
                  :style="{lineHeight: item.keyName === 'content' ? 1.5 : ''}">{{detailInfo[item.keyName]}}</span>
          </div>
        </div>
      </template>
    </div>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@/components/PageHandle'
import BigPicture from '@c/BigPictire'
import { onShowPreview } from '../urlPreview.js'
export default {
  name: 'Detail',
  methods: {
    onShowPreview,
    // 查看大图
    lookImage (imgList, index) {
      const imgs = imgList.map(item => item.url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgs[index]
      bigPicture.photoList = imgs
      bigPicture.showPicture = true
    },
    onEdit () {
      this.$router.push({ name: 'EditSubsidy', query: { id: this.$route.query.id } })
    },
    getAgricultureRelatedProjectsById () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getAgricultureRelatedProjectsById(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.detailInfo = res.content
      })
    }
  },
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
            event: 'onEdit'
          }
        ]
      },
      detailInfo: {},
      dataList: Object.freeze([
        { title: '标题：', keyName: 'title' },
        { title: '正文：', keyName: 'content' },
        { title: '图片：', keyName: 'picList' },
        { title: '附件', keyName: 'attachmentList' },
        { title: '发布单位：', keyName: 'publishingDepartment' }
      ])
    }
  },
  created () {
    this.getAgricultureRelatedProjectsById()
  },
  components: {
    PageHandle,
    BigPicture
  }
}
</script>
<style lang='scss' scoped>
.lineh1-5 {
  line-height: 1.5;
}
.detail-wrap {
  .container {
    width: 752px;
    margin: 0 auto;
    padding-top: 60px;
    .list-item + .list-item {
      margin-top: 16px;
    }
    .title {
      min-width: 70px;
    }
    .content {
      width: 674px;
      .img-item + .img-item {
        margin-left: 16px;
      }
      .img-item {
        width: 120px;
        height: 120px;
        .img {
          width: 120px;
          height: 120px;
        }
      }
      .file-list {
        color: $primaryColor;
        .file-content + .file-content {
          margin-top: 8px;
        }
      }
      .text {
        text-align: justify;
        text-align-last: left;
      }
    }
  }
}
</style>
