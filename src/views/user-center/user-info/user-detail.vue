<template>
  <page title="用户详情"
        needPadding>
    <div class='info-wrap row mt16'>
      <!-- 左侧头像部分 -->
      <div class="info-left column center">
        <div class="w250">
          <img alt="头像"
               v-if="memberDetail.avatar"
               :src="$fileHost + memberDetail.avatar"
               class="info-avatar" />
          <img v-else
               alt="头像"
               :src="defaultAvatar"
               class="info-avatar" />
        </div>
        <div class="tc bold mt8">{{memberDetail.name || '--'}}</div>
      </div>
      <div class="info-line"></div>
      <!-- 右侧基本信息及绑卡 -->
      <div class="info-right column center-justify">
        <!-- 基本信息详情 -->
        <div class="label">ID:</div>
        <div class="value">{{memberDetail.id || '--'}}</div>
      </div>
      <div class="info">
        <div class="label">姓名:</div>
        <div class="value">{{memberDetail.name || '--'}}</div>
      </div>
      <div class="info">
        <div class="label">手机号:</div>
        <div class="value">{{memberDetail.phone || '--'}}</div>
      </div>
      <div class="info">
        <div class="label">身份证号:</div>
        <div class="value">{{memberDetail.idCardNo || '--'}}</div>
      </div>
    </div>

    <div class="row">
      <div class="info">
        <div class="label">所属组织:</div>
        <div class="value">{{memberDetail.orgName || '--'}}</div>
      </div>
      <div class="info">
        <div class="label">社区认证:</div>
        <div class="value">
          {{(memberDetail.communityOrgName || '--')}}
        </div>
      </div>
      <div class="info">
        <div class="label">小区地址:</div>
        <div class="value">
          {{(memberDetail.plotName || '') +'，' + (memberDetail.address || '')}}
        </div>
      </div>

    </div>

    <div class="info">
      <div class="label">红心值:</div>
      <div class="value bold ft16">{{memberDetail.redHeartBalance || '--'}}</div>
    </div>
    </div>
    </div>
    <member-portrait></member-portrait>
    <hearts-history></hearts-history>
    <page-handle :config="{ btns: [{ text: '返回', event: 'cancel' }]}"></page-handle>
  </page>
</template>
<script>
import MemberPortrait from './components/MemberPortrait'
import HeartsHistory from './components/HeartsHistory'
import avatar from '@/assets/sidebar/img_avatar.png'
import PageHandle from '@c/PageHandle'

export default {
  data () {
    return {
      memberDetail: {},
      defaultAvatar: avatar
      // backRouteName: this.$route.query.backRouteName ? this.$route.query.backRouteName : 'UserInfo'
    }
  },
  methods: {
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getMemberDetailById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.memberDetail = res.content
      })
    }
  },
  created () {
    this.getDetailData()
  },
  components: { MemberPortrait, HeartsHistory, PageHandle }
}
</script>
<style lang="scss" scoped>
.info {
  margin-bottom: 20px;
  .label {
    display: inline-block;
    margin-right: 8px;
    color: #999;
  }
  .value {
    display: inline-block;
    margin-right: 40px;
  }
}
.info-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.info-wrap {
  height: 169px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dedede;
  .info-left {
    padding: 27px 60px 0px 52px;
    position: relative;
  }
}
.info-right {
  flex: 1;
  width: calc(100% - 315px);
  padding: 16px 0 16px 60px;
}
.info-line {
  width: 1px;
  margin: 28px 0;
  height: 110px;
  background-image: linear-gradient(
    180deg,
    rgba(81, 140, 252, 0.1) 0%,
    #518cfc 53%,
    rgba(81, 140, 252, 0.1) 99%
  );
}
.line-back {
  width: 100%;
  background: #eeeeee;
  height: 16px;
}
</style>
