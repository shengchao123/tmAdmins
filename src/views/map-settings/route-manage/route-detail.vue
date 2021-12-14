<template>
  <page title="路线详情"
        needPadding>
    <div class="ml560 mt60">
      <img src="@/assets/noteManage/deleted.png"
           alt=""
           class="note-status"
           v-if="routeData.status === 3">
      <div class="center-align mb24">
        <div class="w70 color-999">名称：</div>
        <div>{{routeData.name}}</div>
        <div class="error-color ml16 hidden ft10"
             v-if="routeData.status === 2">已隐藏</div>
      </div>
      <div class="flex mb36">
        <div class="w70 color-999">游玩时长：</div>
        <div>{{routeData.playTimeName}}</div>
      </div>
      <div class="flex">
        <div class="w70 color-999">线路景点：</div>
        <div class="steps">
          <div v-for="(item,index) in routeData.journeyPointList"
               :key="index"
               class="flex">
            <div class="mr24 relative">
              <div class="step color-999 relative">{{index + 1}}</div>
              <div class="line"
                   v-if="routeData.journeyPointList.length > (index + 1)"></div>
            </div>
            <div class="w387">
              <div class="between-row">
                <div>{{item.name}}</div>
                <div class="primary-color pointer"
                     @click="toPointDetail(item)">详情</div>
              </div>
              <div class="color-999 mt8">行政区域：{{item.regionsName}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="w70 color-999">行政区域：</div>
        <div>{{routeData.regionsName}}</div>
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
      routeData: {},
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
        ],
        backRouteName: 'RouteManage'
      }
    }
  },
  methods: {
    // 获取路线数据
    getRouteData () {
      const params = {
        journeyLineId: this.$route.query.journeyLineId
      }
      this.$api.getJourneyLineById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.routeData = res.content
      })
    },
    // 跳转点位详情
    toPointDetail (item) {
      const lineId = this.$route.query.journeyLineId
      this.$router.push({ name: 'PointDetail', query: { journeyLineId: lineId, journeyPointId: item.journeyPointId } })
    },
    // 跳转路线编辑页面
    onEdit () {
      this.$router.push({ name: 'EditRoute', query: { journeyLineId: this.$route.query.journeyLineId } })
    }
  },
  created () {
    this.getRouteData()
  },
  components: { PageHandle }
}
</script>
<style lang="scss" scoped>
.ml560 {
  margin-left: 560px;
}
.mt60 {
  margin-top: 60px;
}
.w70 {
  width: 70px;
}
.steps {
  .step {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid;
    border-radius: 50%;
    background: #fff;
    z-index: 1;
  }
  .line {
    position: absolute;
    border-left: 1px dashed #999999;
    top: 0;
    bottom: 0;
    left: 12px;
    z-index: 0;
  }
  .w387 {
    width: 387px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 28px;
  }
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
  right: 390px;
  width: 80px;
  height: 80px;
}
</style>
