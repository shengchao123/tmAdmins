<template>
  <page title="评价详情"
        needPadding>
    <div class="position">
      <el-tooltip placement="bottom"
                  effect="light"
                  popper-class="w65">
        <div slot="content"
             class="primary-color pointer">
          <p class="mt12"
             v-if="noteDetail.status !==3 && $hasAuth($urls.modifyCommunityNoteStatus)"
             @click="onModifyNote(noteDetail,2)">{{hiddenStatus}}</p>
          <p class="mt12"
             v-if="noteDetail.status !== 3 && $hasAuth($urls.modifyCommunityNoteStatus)"
             @click="onModifyNote(noteDetail,3)">删除</p>
        </div>
        <el-button :class="noteDetail.status === 3?'':'secondary-btn'"
                   :disabled="noteDetail.status === 3">管理操作</el-button>
      </el-tooltip>
    </div>
    <evaluate-info :noteDetail="noteDetail"></evaluate-info>
    <page-handle :config="{ btns: [{ text: '返回', event: 'cancel' }],backRouteName: backRouteName}"></page-handle>
  </page>
</template>
<script>
import EvaluateInfo from './components/EvaluateInfo'
import PageHandle from '@c/PageHandle'

export default {
  data () {
    return {
      noteDetail: {},
      backRouteName: this.$route.query.backRouteName ? this.$route.query.backRouteName : 'EvaluateManage'
    }
  },
  methods: {
    // 显示、隐藏、删除按钮
    onModifyNote (row, type) {
      let status = null
      let msg = ''
      if (type === 2) { // 显示、隐藏接口
        row.status === 1 ? status = 2 : status = 1
        row.status === 1 ? msg = '已隐藏' : msg = '已显示'
      } else if (type === 3) { // 删除接口
        status = 3
        msg = '已删除'
      }
      const params = {
        id: row.id,
        status: status
      }
      this.$api.modifyItineraryEvaluationStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(msg)
        this.getNoteManageDetail()
      })
    },
    // 获取笔记管理详情数据
    getNoteManageDetail () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getItineraryEvaluationInfoById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.noteDetail = res.content
      })
    }
  },
  computed: {
    // 显示、隐藏按钮状态
    hiddenStatus () {
      const status = this.noteDetail.status
      return status === 1 ? '隐藏' : status === 2 ? '显示' : ''
    }
  },
  components: { EvaluateInfo, PageHandle },
  created () {
    this.getNoteManageDetail()
  }
}
</script>
<style lang="scss" scoped>
.position {
  position: absolute;
  right: 24px;
  top: 16px;
}
</style>
<style lang="scss">
.w65 {
  width: 60px;
  text-align: center;
}
</style>
