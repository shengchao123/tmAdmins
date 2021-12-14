<template>
  <div>
    <el-dialog title="评论详情"
               width="800px"
               :close-on-click-modal="true"
               :modal-append-to-body="true"
               :close-on-press-escape="true"
               :before-close="closeDialog"
               :visible.sync="commentStatus">
      <div class="h620">
        <div class="mt24 ml24">
          <div class="mb24">
            <span>所属话题 :</span>
            <span class="primary-color pointer ml8"
                  @click="onNoteDetail(commentDetail)">{{commentDetail.communityNoteName}}</span>
          </div>
          <div>
            <div class="flex mb24"
                 v-if="commentDetail.communityNoteCommentDetailDTO">
              <img :src="$fileHost + commentDetail.communityNoteCommentDetailDTO.avatar"
                   alt=""
                   class="mr16 user-img">
              <div>
                <div class="center-align mt8">
                  <div class="mr8 bold">{{commentDetail.communityNoteCommentDetailDTO.nick}}</div>
                  <div class="designation"
                       v-if="commentDetail.communityNoteCommentDetailDTO.communityTitle && commentDetail.communityNoteCommentDetailDTO.communityTitleType !=='01'">
                    {{commentDetail.communityNoteCommentDetailDTO.communityTitle}}</div>
                </div>
                <div class="w700 mt16">
                  <div class="lh5">
                    {{commentDetail.communityNoteCommentDetailDTO.content}}
                  </div>
                  <div class="between-row center-align mt16 color-999">
                    <div class="center-align">
                      <div class="mr24">
                        <span>ID：</span>
                        <span>{{commentDetail.communityNoteCommentDetailDTO.memberCode}}</span>
                      </div>
                      <div class="mr24">
                        <span>发布于：</span>
                        <span>{{$moment(commentDetail.communityNoteCommentDetailDTO.commentTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                      </div>
                      <div>
                        <svg-icon icon="icon_zankong"
                                  class="ft16 mr8"></svg-icon>
                        <span>{{commentDetail.communityNoteCommentDetailDTO.likeCount}}</span>
                      </div>
                    </div>
                    <el-popconfirm title="要删除该评论?"
                                   cancelButtonType=""
                                   placement="top-end"
                                   confirmButtonText="删除"
                                   hideIcon
                                   @confirm="deleteComment(commentDetail.communityNoteCommentDetailDTO)">
                      <svg-icon icon="icon_shanchu"
                                slot="reference"
                                class="ft16 color-999 pointer"></svg-icon>
                    </el-popconfirm>
                  </div>
                  <!-- <div class="pl16 pr16 feee mt20 relative"
                       v-if="commentDetail.communityNoteCommentDetailDTO.children.length">
                    <div class="triangle"></div>
                    <div class="bb"
                         v-for="(items,indx) in commentDetail.communityNoteCommentDetailDTO.children"
                         :key="indx">
                      <div class="between-row center-align mb16 pt16">
                        <div>
                          <span>{{items.nick}}：</span>
                          <span>{{items.content}}</span>
                        </div>
                        <el-popconfirm title="要删除该评论?"
                                       cancelButtonType=""
                                       confirmButtonText="删除"
                                       hideIcon
                                       @confirm="deleteComment(items)">
                          <svg-icon icon="icon_shanchu"
                                    slot="reference"
                                    class="ft16 color-999 pointer"></svg-icon>
                        </el-popconfirm>
                      </div>
                      <div class="center-align pb16">
                        <div class="color-999 mr24">{{$moment(items.commentTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                        <div>
                          <svg-icon icon="icon_dianzan"
                                    class="ft16 mr8"></svg-icon>
                          <span>{{items.likeCount}}</span>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
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
      commentStatus: false,
      commentDetail: {}
    }
  },
  methods: {
    // 获取评论详情内容
    getCommentDetail () {
      const params = {
        id: this.id
      }
      this.$api.getCommunityNoteCommentDetail(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.commentDetail = res.content
      })
    },
    // 删除评论
    deleteComment (item) {
      const params = {
        id: item.communityNoteCommentId
      }
      this.$api.removeCommunityNoteComment(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('已删除')
        this.getCommentDetail()
      })
    },
    // 跳转帖子详情
    onNoteDetail (val) {
      if (val.isDelete) return this.$message('该帖子已删除')
      this.$router.push({ name: 'CommunityPostDetail', query: { id: this.commentDetail.communityNoteId, backRouteName: 'CommunityPost' } })
    },
    closeDialog () {
      this.commentStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.h620 {
  max-height: 620px;
  overflow: hidden;
  overflow-y: auto;
}
.designation {
  font-size: 10px;
  transform: scale(0.9);
  background: #fc8d11;
  color: #ffffff;
  padding: 2px 4px;
  border-radius: 2px;
}
.w700 {
  width: 700px;
}
.user-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.feee {
  background: #eeeeee;
}
.triangle {
  width: 0;
  height: 0;
  border: 12px solid;
  border-color: transparent transparent #eeeeee;
  position: absolute;
  top: -22px;
  left: 77px;
}
.lh5 {
  line-height: 1.5;
}
</style>
