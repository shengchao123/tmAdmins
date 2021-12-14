<template>
  <div>
    <el-dialog title="热度明细"
               width="565px"
               :close-on-click-modal="true"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               :visible.sync="heatStatus">
      <div class="pl24 pr24 pb24 pt24">
        <div>
          <div class="between-row center-align mb16 bold">
            <span>热度</span>
            <span>+{{heatNum}}</span>
          </div>
        </div>
        <div class="tb rb lb w517 b">
          <div v-for="(item,index) in heatList"
               :key="index">
            <div class="flex h48"
                 :class="index % 2 === 0 ?'back':''"
                 v-if="item.num !== 0">
              <div class="flex1 ml24">{{item.operationTypeName}}</div>
              <div class="flex1">{{item.num}}{{item.unit}}</div>
              <div class="w70">+{{item.heat}}</div>
            </div>
          </div>

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data () {
    return {
      id: '',
      heatStatus: false,
      heatList: [],
      heatNum: 0
    }
  },
  methods: {
    // 获取热度明细
    getOperates () {
      const params = {
        id: this.id
      }
      this.$api.getItineraryEvaluationStatisticsInfoById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.heatList = res.content
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.w517 {
  width: 517px;
  margin: 0 auto;
}
.h48 {
  height: 48px;
  line-height: 48px;
}
.back {
  background: #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
}
.mr65 {
  margin-right: 65px;
}
.w70 {
  width: 70px;
}
</style>
