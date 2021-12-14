<template>
  <div v-if="detailInfo"
       class='detail-info-wrap'>
    <content class="color-999">
      <div>
        <div class="f-wrap">
          <p class="mr4"><a>客群名称：</a></p>
          <p><span class="color-333">{{detailInfo.name}}</span></p>
        </div>
        <div class="f-wrap mt16">
          <p class="mr4"><a>用户数：</a></p>
          <p><span class="color-333">{{detailInfo.memberQuantity}}</span></p>
        </div>
      </div>
      <div class="label">
        <a class="pl16 pr16 mt16 mr16 active"
           v-for="labelItem in detailInfo.memberLabels"
           :key="labelItem.memberLabelId">
          {{labelItem.memberLabelName}}
        </a>
      </div>
      <ul class="mt24">
        <li class="flex"><a>描述：</a><span>{{detailInfo.description}}</span></li>
        <li style="margin-bottom:10px">
          <a>最近更新：</a><span>{{$moment(detailInfo.modifyTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </li>
        <li class="center-align">
          <div class="flex">
            <a style="line-height:32px">创建人：</a>
            <span style="line-height:32px"
                  class="mr4">{{detailInfo.creatorName}}</span>
            <el-button v-if='$hasAuth($urls.getPublicMemberGroupPage)'
                       type="text"
                       @click="onSeeMore(detailInfo)">查看更多ta的客群</el-button>
          </div>
        </li>
      </ul>
    </content>
    <div class="market-btn">
      <el-button plain
                 class="secondary-btn"
                 v-if="type === 'myCreate' && detailInfo.createOrgId === currentOrgId && $hasAuth($urls.modifyMemberGroup)"
                 @click="onToEdit">编辑</el-button>
      <el-popover v-if="type === 'myCreate' && $hasAuth($urls.modifyMemberGroupStatus)"
                  placement="top"
                  trigger="click"
                  :ref="`${detailInfo.id}`">
        <div>
          <div class="ft14 color-333 mb16 mt4 tc">要{{detailInfo.isStop ? '启用' : '停用'}}客群？</div>
          <div>
            <el-button type="primary"
                       size="small"
                       @click="onChangeStatus(detailInfo)">{{detailInfo.isStop ? '启用' : '停用'}}</el-button>
            <el-button size="small"
                       @click="$refs[detailInfo.id].doClose()">取消</el-button>
          </div>
        </div>
        <el-button slot="reference"
                   plain
                   class="secondary-btn ml16">{{detailInfo.isStop ? '启用' : '停用'}}</el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { getGlobalParams, jumpOtherApp } from '@/utils/login'

export default {
  name: 'Detail',
  methods: {
    // 跳转到营销中心的新增活动页面
    onToMarket () {
      jumpOtherApp('activity', 'marketing/activity/activity-add')
      // window.open(process.env.VUE_APP_MARKETING_CENTER + 'marketing/activity/activity-add')
    },
    getDetailInfo () { // 获取列表
      const query = {
        id: this.id
      }
      this.$api.getMemberGroupDetail(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.detailInfo = res.content
        this.$emit('update:detailInfo', this.detailInfo)
      })
    },
    // 修改客群收藏状态
    onChangeFavorites (row) {
      const query = {
        memberGroupId: row.id,
        isFavorites: !row.isFavorites
      }
      this.$api.modifyMemberGroupFavoritesStatus(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        row.isFavorites = !row.isFavorites
        this.$message.success(`${row.isFavorites ? '收藏成功' : '取消收藏成功'}`)
      })
    },
    // 修改客群状态
    onChangeStatus (row) {
      const query = {
        id: row.id,
        status: row.isStop ? 1 : -1
      }
      this.$api.modifyMemberGroupStatus(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.$message.success(`${row.isStop ? '启用成功' : '停用成功'}`)
        row.isStop = !row.isStop
        this.$refs[this.detailInfo.id].doClose()
      })
    },
    onSeeMore (val) {
      const route = {
        name: 'openCustomer',
        query: {
          creatorId: val.creatorId,
          creatorName: val.creatorName
        }
      }
      this.$router.push(route)
    },
    onToEdit () {
      const route = {
        name: 'EditCustomer',
        query: {
          type: 'edit',
          id: this.id
        }
      }
      this.$router.push(route)
    }
  },
  data () {
    return {
      dialogVisible: false,
      id: this.$route.query.id,
      type: this.$route.query.type,
      detailInfo: null,
      currentOrgId: getGlobalParams('orgId')
    }
  },
  created () {
    this.getDetailInfo()
  },
  components: {},
  computed: {
    seeMore () {
      return this.detailInfo.memberGroupPublicRange === '04' && this.detailInfo.publicRangeOrgName && this.detailInfo.publicRangeOrgName.indexOf('、') >= 0 && this.detailInfo.publicRangeOrgName.split('、').length > 5
    }
  }
}
</script>

<style lang='scss' scoped>
.el-button--small {
  line-height: 32px;
}
.ft20 {
  font-size: 20px;
}
.primary-color {
  color: $primaryColor !important;
}
.color-ccc {
  color: #ccc;
}
.dialog-wrap {
  /deep/ .el-dialog .el-dialog__body {
    padding: 16px 0 24px !important;
  }
  .org-name {
    padding: 16px;
    height: 128px;
    overflow: auto;
    line-height: 1.5;
  }
}
.detail-info-wrap {
  position: relative;
  padding: 16px;
  .collect-num {
    color: #999;
    a {
      color: #ffac41;
    }
  }
  header {
    height: 22px;
    line-height: 22px;
  }
  content {
    display: inline-block;
    a.active {
      color: #fc8d11;
    }
    .label {
      a {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        background: #fff8f0;
        border-radius: 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    ul {
      li {
        .public-range {
          width: auto;
          max-width: 1000px;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
        a {
          display: inline-block;
          width: 70px;
          color: #999;
        }
        span {
          color: #333;
        }
      }
    }
  }
  .market-btn {
    position: absolute;
    right: 16px;
    bottom: 24px;
  }
}
</style>
