<template>
  <page title="微心愿详情"
        needPadding>
    <div class="activity-details-info">
      <div>
        <div class="flex mt24">
          <div class="w98">微心愿名称：</div>
          <div>{{wishDetail.name}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">微心愿简介：</div>
          <div class="w674 line5">{{wishDetail.introduction}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">组织单位:</div>
          <div>{{wishDetail.communityOrgName || '--'}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">联系电话:</div>
          <div>{{wishDetail.phone}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">活动地点:</div>
          <div>{{wishDetail.address}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">截止时间:</div>
          <div>
            {{$moment(wishDetail.endTime).format('YYYY-MM-DD HH:mm')}}
          </div>
        </div>
        <page-handle @onConfirm="onEdit"
                     :config="pageHandleConfig"></page-handle>
      </div>
    </div>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'

export default {
  data () {
    return {
      wishDetail: {}
    }
  },
  computed: {
    pageHandleConfig () {
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
    }
  },
  methods: {
    // 获取详情数据
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyCommunityWish(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.wishDetail = res.content
      })
    },
    // 跳转编辑
    onEdit () {
      this.$router.push({ name: 'CommunityAddEditWish', query: { id: this.$route.query.id } })
    }
  },
  created () {
    this.getDetailData()
  },
  components: { PageHandle }
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
