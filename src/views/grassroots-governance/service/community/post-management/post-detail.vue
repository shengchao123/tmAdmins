<template>
  <page title="帖子详情"
        needPadding>
    <div class="position">
      <el-tooltip placement="bottom"
                  effect="light"
                  popper-class="w65">
        <div slot="content"
             class="primary-color pointer">
          <p @click="onRecommend"
             v-if="$hasAuth($urls.createCommunityNoteRecommendRecord) && noteDetail.status !== 3">
            {{noteDetail.isRecommend?'取消推荐':'推荐'}}</p>
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
    <note-info :noteDetail="noteDetail"></note-info>
    <discuss-list></discuss-list>
    <page-handle :config="{ btns: [{ text: '返回', event: 'cancel' }],backRouteName: 'CommunityPost'}"></page-handle>
  </page>
</template>
<script>
import NoteInfo from './components/NoteInfo'
import DiscussList from './components/DiscussList'
import PageHandle from '@c/PageHandle'

export default {
  data () {
    return {
      noteDetail: {}
    }
  },
  methods: {
    // 推荐和取消推荐按钮
    onRecommend () {
      const isCommend = this.noteDetail.isRecommend
      const params = {
        id: this.noteDetail.id
      }
      this.$api.createCommunityNoteRecommendRecord(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(isCommend ? '取消推荐' : '推荐成功')
        this.getNoteManageDetail()
      })
    },
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
      this.$api.modifyCommunityNoteStatus(params).then(res => {
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
      this.$api.getCommunityNoteInfoById(params).then(res => {
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
  components: { NoteInfo, DiscussList, PageHandle },
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
