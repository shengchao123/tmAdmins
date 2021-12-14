<template>
  <el-dialog :title="dialog.title"
             width="456px"
             :modal-append-to-body="false"
             :visible.sync="dialog.show">
    <div class="pb24 pl24 pr24 line-h20">
      <div v-for="item in detailProps"
           :key="item.prop"
           class="row mt24">
        <div class="color-999 w70">{{item.name}}：</div>
        <div class="flex1">{{detailData[item.prop]}}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DetailDialog',
  methods: {
    // 打开弹窗
    show (id) {
      this.getJourneyKeyWorkById(id)
      this.dialog.show = true
    },
    // 根据id获取重点工作
    getJourneyKeyWorkById (id) {
      this.$api.getJourneyKeyWorkById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.detailData = res?.content ?? {}
      })
    }
  },
  data () {
    return {
      dialog: {
        title: '工作详情',
        show: false
      },
      detailData: {},
      detailProps: Object.freeze([
        {
          prop: 'journeyAllianceName',
          name: '党建联盟'
        },
        {
          prop: 'year',
          name: '年度'
        },
        {
          prop: 'statusName',
          name: '状态'
        },
        {
          prop: 'content',
          name: '工作内容'
        }
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
.w70 {
  width: 70px;
}
.line-h20 {
  line-height: 20px;
}
</style>
