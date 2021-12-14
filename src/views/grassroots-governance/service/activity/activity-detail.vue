<template>
  <page title="活动详情"
        needPadding
        v-if="activityDetailData.typeName">
    <div class="activity-details-info">
      <div>
        <div class="flex mt24">
          <div class="w98">活动类型:</div>
          <div class="w674">{{activityDetailData.typeName}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动名称:</div>
          <div>{{activityDetailData.name}}</div>
          <span class="ml8 ft12 tc"
                :class="activityStyle">{{activityStatus}}</span>
        </div>
        <div class="flex mt8"
             v-if="activityDetailData.attachmentList && activityDetailData.attachmentList.length > 0">
          <div class="w98 mt16">图片:</div>
          <div class="flex w855">
            <div v-for="(item,index) in activityDetailData.attachmentList"
                 :key="index"
                 class="relative mt16">
              <img :src="$fileHost + item.url"
                   alt=""
                   class="landmark-img "
                   @click="lookBigPhoto(activityDetailData.attachmentList,index)" />
            </div>
          </div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动简介:</div>
          <div class="w674 line5">{{activityDetailData.introduction}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">组织单位:</div>
          <div>{{activityDetailData.orgName}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">联系电话:</div>
          <div>{{activityDetailData.phone}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动地点:</div>
          <div>{{activityDetailData.address}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">人数限制:</div>
          <div>{{numberLimit}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动时间:</div>
          <div>{{$moment(activityDetailData.startTime).format('YYYY-MM-DD HH:mm')}} 至
            {{$moment(activityDetailData.endTime).format('YYYY-MM-DD HH:mm')}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">报名截止时间:</div>
          <div>
            {{$moment(activityDetailData.startTime).format('YYYY-MM-DD HH:mm')}}
          </div>
        </div>
        <div class="mt24 flex"
             v-if="activityDetailData.styleDescription">
          <div class="w98">活动风采:</div>
          <div>
            <div class="w674">{{activityDetailData.styleDescription}}</div>
            <div class="flex flex-wrap">
              <div v-for="(item,index) in activityDetailData.attachmentList"
                   :key="index">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="affiche-img mt16">
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动链接:</div>
          <div>{{activityDetailData.hrefUrl || '--'}}</div>
        </div>
      </div>
      <big-picture ref="bigPicture"></big-picture>
      <page-handle @onConfirm="onEdit"
                   :config="pageHandleConfig"></page-handle>
    </div>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
const activityName = new Map([
  ['01', '报名中'],
  ['02', '进行中'],
  ['03', '']
])
const activityClass = new Map([
  ['01', 'apply-ing'],
  ['02', 'for-ing'],
  ['03', '']
])
export default {
  data () {
    return {
      activityDetailData: {}
    }
  },
  computed: {
    pageHandleConfig () {
      if (this.activityDetailData.status === '01') { // 活动报名中
        return Object.freeze({
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
        })
      } else {
        return Object.freeze({
          btns: [
            {
              text: '返回',
              event: 'cancel'
            }
          ]
        })
      }
    },
    // 活动状态
    activityStatus () {
      const activityData = this.activityDetailData
      return activityName.get(activityData.status)
    },
    // 活动样式
    activityStyle () {
      const activityData = this.activityDetailData
      return activityClass.get(activityData.status)
    },
    // 人数限制
    numberLimit () {
      const limit = this.activityDetailData.numberLimit
      if (limit > 0) {
        return `限制${limit}人`
      } else {
        return '不限制'
      }
    }
  },
  methods: {
    // 获取详情数据
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyActivityById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        res.content.attachmentList = res.content.activityAttachmentList
        this.activityDetailData = res.content
      })
    },
    // 跳转编辑
    onEdit () {
      this.$router.push({ name: 'EditActivity', query: { id: this.$route.query.id } })
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
.w98 {
  width: 98px;
  color: #999999;
  margin-right: 8px;
}
.w674 {
  width: 674px;
}
.activity-details-info {
  margin-left: 421px !important;
  margin-top: 60px;
}
.apply-ing {
  width: 44px;
  height: 16px;
  line-height: 16px;
  background: #fa6400;
  color: #ffffff;
  border-radius: 2px;
}
.for-ing {
  width: 44px;
  height: 16px;
  line-height: 16px;
  background: #72b230;
  color: #ffffff;
  border-radius: 2px;
}
.flex-wrap {
  width: 700px;
  flex-wrap: wrap;
}
.affiche-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 16px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.landmark-img {
  width: 199px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
}
.line5 {
  line-height: 1.5;
}
</style>
