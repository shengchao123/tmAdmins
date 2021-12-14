<template>
  <div>
    <div class="tb pb32"></div>
    <div class="ml307">
      <div class="center-align">
        <div class="info-title ft16">评论</div>
        <span class="color-666 ml8"
              v-if="commentCount > 0">共{{commentCount}}条评论</span>
        <span class="color-666 ml8"
              v-else>暂无评论</span>
      </div>
      <div class="mt32 ml64">
        <div v-for="(item,index) in commentList"
             :key="index">
          <div class="flex mb24">
            <img :src="$fileHost + item.avatar"
                 alt=""
                 class="mr16 user-img">
            <div>
              <div class="center-align mt8">
                <div class="mr8 bold">{{item.nick}}</div>
                <div class="designation"
                     v-if="item.communityTitle && item.communityTitleType !=='01'">{{item.communityTitle}}</div>
              </div>
              <div class="w790 mt16">
                <div class="lh5">
                  {{item.content}}
                </div>
                <div class="between-row center-align mt16">
                  <div class="center-align color-999">
                    <div class="mr24">
                      <span>ID：</span>
                      <span>{{item.communityNoteCommentId}}</span>
                    </div>
                    <div class="mr24">
                      <span>发布于：</span>
                      <span>{{$moment(item.commentTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                    </div>
                    <div>
                      <svg-icon icon="icon_zankong"
                                class="ft16 mr8"></svg-icon>
                      <span>{{item.likeCount}}</span>
                    </div>
                  </div>
                  <el-popconfirm title="要删除该评论?"
                                 cancelButtonType=""
                                 placement="top"
                                 confirmButtonText="删除"
                                 hideIcon
                                 @confirm="deleteComment(item,index)">
                    <svg-icon icon="icon_shanchu"
                              slot="reference"
                              class="ft16 color-999 pointer"></svg-icon>
                  </el-popconfirm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      commentCount: 0,
      commentList: [],
      search: {
        pageNumber: 1,
        pageSize: 10
      },
      isLoading: true
    }
  },
  methods: {
    onLoadmore () {
      if (!this.isLoading) return
      this.search.pageNumber++
      this.getNoteComments()
    },
    // 获取评论信息
    getNoteComments () {
      const params = {
        communityNoteId: this.$route.query.id,
        pageNumber: this.search.pageNumber,
        pageSize: 10
      }
      this.$api.getCommunityNoteCommentDetailPage(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        if (!res.content.items || res.content.items.length === 0) {
          this.isLoading = false
          return
        }
        this.commentCount = res.content?.count ?? 0
        this.commentList = params.pageNumber === 1 ? res.content.items : this.commentList.concat(res.content?.items ?? [])
      })
    },
    // 删除评论
    deleteComment (item, index) {
      const params = {
        id: item.communityNoteCommentId
      }
      this.$api.removeCommunityNoteComment(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('已删除')
        this.commentList.splice(index, 1)
      })
    }
  },
  created () {
    this.getNoteComments()
    this.$bus.$on('onPagesLoadmore', this.onLoadmore)
  },
  destroyed () {
    this.$bus.$off('onPagesLoadmore')
  }
}
</script>
<style lang="scss" scoped>
.ml307 {
  margin-left: 307px;
}
.designation {
  font-size: 10px;
  transform: scale(0.9);
  background: #fc8d11;
  color: #ffffff;
  padding: 2px 4px;
  border-radius: 2px;
}
.w790 {
  width: 790px;
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
.ml64 {
  margin-left: 64px;
}
</style>
