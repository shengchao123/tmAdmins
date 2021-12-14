<template>
  <page title="点位详情"
        needPadding>
    <div v-if="pointDetailData.name">
      <img src="@/assets/noteManage/deleted.png"
           alt=""
           class="note-status"
           v-if="pointDetailData.status === 3">
      <div class="pb8 divider pl321">
        <div class="info-title ml12 mt60">基本信息</div>
        <div class="ml70 mt24">
          <div class="mb24 center-align">
            <div class="w70 color-999">名称：</div>
            <div>{{pointDetailData.name}}</div>
            <div class="error-color ml16 hidden ft10"
                 v-if="pointDetailData.status === 2">已隐藏</div>
          </div>
          <div class="mb24 flex">
            <div class="w70 color-999">功能分类：</div>
            <div>{{pointDetailData.typeName}}</div>
          </div>
          <div class="flex mb24">
            <div class="flex">
              <div class="w70 color-999">经度：</div>
              <div class="w177">{{pointDetailData.lng}}</div>
            </div>
            <div class="flex">
              <div class="color-999">纬度：</div>
              <div>{{pointDetailData.lat}}</div>
            </div>
          </div>
          <div class="mb24 flex">
            <div class="w70 color-999">行政区域：</div>
            <div>{{pointDetailData.regionsName}}</div>
          </div>
          <div class="mb24 flex">
            <div class="w70 color-999 no-wrap">地址：</div>
            <div>{{pointDetailData.address}}</div>
          </div>
          <div class="mb24 flex"
               v-if="pointDetailData.contactPerson">
            <div class="w70 color-999">联系人：</div>
            <div>{{pointDetailData.contactPerson}}</div>
          </div>
          <div class="mb24 flex"
               v-if="pointDetailData.phone">
            <div class="w70 color-999">电话：</div>
            <div>{{pointDetailData.phone}}</div>
          </div>
          <div class="mb24 flex">
            <div class="w70 color-999">开放时间：</div>
            <div>
              {{openDay}}，{{openTime}}
            </div>
          </div>
          <div class="mb24 flex"
               v-if="pointDetailData.type === '03'">
            <div class="w70 color-999">农产品展示：</div>
            <div>
              <page-table :data="table.data"
                          isShowIndex
                          :col-configs="table.colConfig"
                          class="table-box"
                          v-if="table.data.length > 0">
                <el-table-column slot="production"
                                 label="农产品"
                                 min-width="300">
                  <template slot-scope="scope">
                    <div class="center-align">
                      <img :src="$fileHost + scope.row.journeyProductImage"
                           mode="scaleToFill"
                           class="journey-img" />
                      <div class="text-btn ml16"
                           @click="onDetail(scope.row)">{{scope.row.journeyProductName}}</div>
                    </div>
                  </template>
                </el-table-column>
              </page-table>
            </div>
          </div>
        </div>
      </div>
      <div class="mt32 pl321">
        <div class="info-title ml12">地标详情</div>
        <div class="mt24 ml70">
          <div class="mb24 flex"
               v-if="pointDetailData.journeyScenicSpotAttachmentVideo">
            <div class="w70 color-999">地标视频：</div>
            <div class="w670"
                 v-if="pointDetailData.journeyScenicSpotAttachmentVideo">
              <video :src="$fileHost + pointDetailData.journeyScenicSpotAttachmentVideo.url"
                     class="video-wrap"
                     controls="controls">您的浏览器不支持视频播放</video>
            </div>
          </div>
          <div class="mb8 flex"
               v-if="pointDetailData.journeyScenicSpotAttachmentImagesList">
            <div class="w70 color-999 no-wrap">地标图片：</div>
            <div class="flex w820">
              <div v-for="(item,index) in pointDetailData.journeyScenicSpotAttachmentImagesList"
                   :key="index">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="landmark-img"
                     @click="lookBigPhoto(pointDetailData.journeyScenicSpotAttachmentImagesList,index)" />
              </div>
            </div>
          </div>
          <div class="mb24 flex">
            <div class="w70 color-999 no-wrap">介绍：</div>
            <div class="w670 line5 text-last">
              {{pointDetailData.introduction}}
            </div>
          </div>
          <div class="mb24 flex"
               v-if="pointDetailData.journeyScenicSpotAttachmentVoice">
            <div class="w70 color-999 no-wrap">语音导览：</div>
            <div v-if="pointDetailData.journeyScenicSpotAttachmentVoice.type ==='02'">
              <audio :src="$fileHost + pointDetailData.journeyScenicSpotAttachmentVoice.url"
                     controls
                     class="audio-style"></audio>
            </div>
            <div v-if="pointDetailData.journeyScenicSpotAttachmentVoice.type ==='03'"
                 class="line5 w670 line-break">
              {{pointDetailData.journeyScenicSpotAttachmentVoice.url}}</div>
          </div>
          <div v-if="pointDetailData.journeyScenicSpotAttachmentVR"
               class="flex">
            <div class="w70 color-999 no-wrap">VR链接：</div>
            <div>{{pointDetailData.journeyScenicSpotAttachmentVR.url || '--'}}</div>
          </div>
        </div>
      </div>
    </div>
    <page-handle @onConfirm="onEdit"
                 :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
import { filterContinuousDate } from '@u/date.js'
import PageTable from '@c/PageTable'
import { journeyProduct } from '@u/enum.js'
export default {
  data () {
    return {
      pointDetailData: {},
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
      table: {
        data: [],
        colConfig: journeyProduct
      }
    }
  },
  methods: {
    // 获取点位详情
    getPointDetail () {
      const params = {
        journeyPointId: this.$route.query.journeyPointId
      }
      this.$api.getJourneyPointById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.pointDetailData = res.content
        this.table.data = res.content.journeyProductList
      })
    },
    // 跳转编辑
    onEdit () {
      this.$router.push({ name: 'EditPoint', query: { journeyPointId: this.$route.query.journeyPointId } })
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    },
    // 跳转产品详情
    onDetail (row) {
      this.$router.push({ name: 'ProductDetail', query: { journeyProductId: row.journeyProductId } })
    }
  },
  computed: {
    // 开放时间字段
    openDay () {
      const week = this.pointDetailData.openDay
      return filterContinuousDate(week)
    },
    openTime () {
      const { startTime, endTime } = this.pointDetailData
      if (startTime === '00:00' && endTime === '23:59') {
        return '全天'
      }
      return startTime + '~' + endTime
    }
  },
  created () {
    this.getPointDetail()
  },
  components: { PageHandle, BigPicture, PageTable }
}
</script>
<style lang="scss" scoped>
.mt60 {
  margin-top: 60px;
}
.w70 {
  width: 85px;
}
.w177 {
  width: 177px;
}
.ml70 {
  margin-left: 70px;
}
.landmark-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.w820 {
  width: 820px;
  flex-wrap: wrap;
}
.w670 {
  width: 670px;
}
.pl321 {
  padding-left: 321px;
}
.no-wrap {
  white-space: nowrap;
}
.video-wrap {
  width: 240px;
  height: 135px;
}
.audio-style {
  width: 240px;
  height: 40px;
}
.line5 {
  line-height: 1.5;
}
.line-break {
  line-break: anywhere;
}
.hidden {
  padding: 3px 6px;
  border: 1px solid #e02020;
  border-radius: 2px;
  transform: scale(0.8);
}
.note-status {
  position: absolute;
  top: 140px;
  right: 550px;
  width: 80px;
  height: 80px;
}
.table-box {
  width: 668px;
}
.journey-img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin: 16px 0;
}
.text-last {
  text-align: justify;
  text-align-last: left;
}
.divider {
  border-bottom: 1px solid #eeeeee;
}
</style>
