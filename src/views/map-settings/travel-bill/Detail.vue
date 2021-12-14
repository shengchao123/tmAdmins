<template>
  <page title="行程单详情"
        needPadding
        class="page">
    <div class="activity-details-info">
      <div>
        <div class="flex mt24">
          <div class="w98">ID：</div>
          <div class="w674">{{detail.id|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">行程名称：</div>
          <div>{{detail.name|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">创建时间：</div>
          <div class="w674 line5">{{$moment(detail.createTime).format('YYYY-MM-DD HH:mm')}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">行程选择：</div>
          <div>{{detail.typeName|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">路线名称：</div>
          <div>{{detail.journeyLineName|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">游玩时间：</div>
          <div>{{detail.playTimeName|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动类型：</div>
          <div>{{detail.activityTypeName|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">组织生活记录：</div>
          <div>{{detail.needLifeDocumentary ? '需要': '不需要'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">召集人：</div>
          <div>{{detail.organizer|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">联系电话：</div>
          <div>{{detail.contactDetails|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">集合地点：</div>
          <div>{{detail.meetingPlace|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">出发时间：</div>
          <div class="w674 line5">{{$moment(detail.setOutTime).format('YYYY-MM-DD HH:mm')}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">交通方式：</div>
          <div>{{detail.transportationName|| '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">注意事项：</div>
          <div style="max-width:600px">{{detail.precautions || '-'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">报名人数：</div>
          <div class="text-btn"
               @click="viewSignUp">{{detail.signUpNum || 0}}人</div>
        </div>
        <div class="flex mt24">
          <div class="w98">打卡人数：</div>
          <div class="text-btn"
               @click="viewSignIn">{{detail.signInNum || 0}}人</div>
        </div>
      </div>
      <page-handle :config="pageHandleConfig"></page-handle>
    </div>
    <PeopleDialog ref="peopleDialog"></PeopleDialog>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import PeopleDialog from '@/views/map-settings/travel-bill/PeopleDialog'

export default {
  methods: {
    viewSignUp () {
      if (this.detail.signUpNum === 0) return
      this.$refs.peopleDialog.show(this.detail, 'up')
    },
    viewSignIn () {
      if (this.detail.signUpNum === 0) return
      this.$refs.peopleDialog.show(this.detail, 'in')
    }
  },
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    pageHandleConfig () {
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
  created () {
    this.detail = this.$route.params
  },
  components: { PageHandle, PeopleDialog }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
}
.w98 {
  width: 98px;
  color: #999999;
  margin-right: 8px;
}
.w674 {
  width: 674px;
}
.activity-details-info {
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
