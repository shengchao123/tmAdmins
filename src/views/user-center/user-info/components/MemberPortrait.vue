<template>
  <div class='member-portrait-wrap mb16'>
    <div class="portrait-top between-row">
      <div class="ft16 bold font-bold info-title">会员画像</div>
      <span v-show="!closeBtnVisible">
        <el-button type="primary"
                   v-if='$hasAuth($urls.createMemberRelLabel)'
                   @click="goHandleMember('tag')">添加</el-button>
        <el-button class="secondary-btn"
                   v-if='$hasAuth($urls.removeMemberRelLabel) && portraitInfo && portraitInfo.length>0'
                   @click="closeBtnVisible = true">编辑</el-button>
      </span>
      <span v-show="closeBtnVisible">
        <el-button type="primary"
                   @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </span>
    </div>
    <div v-if="portraitInfo && portraitInfo.length > 0"
         class="portrait-bottom-box">
      <div :style="portraitBottomHeight < 248 || isExpandedMoreTag ? 'height:auto'
           : 'height:248px'">
        <div class="portrait-bottom"
             :style="portraitBottomHeight < 248 ? 'padding: 0 16px'
           : 'padding: 0 16px 24px;'"
             ref="portraitBottom">
          <div class="portrait-info row"
               v-for="item in portraitInfo"
               :key="item.id">
            <el-popover placement="top"
                        width="200"
                        v-if="item.name.length>5"
                        trigger="hover">
              <div>{{item.name}}</div>
              <div slot="reference"
                   class="info-label color-999 mr16 mt8 w82">{{item.name.substring(0,5)+'...'}}</div>
            </el-popover>
            <div v-else
                 class="info-label color-999 mr16 mt8 w82">{{item.name}}：</div>
            <div class="info-content">
              <el-tag v-for="value in item.memberLabelList"
                      :class="value.isSelf ? 'self-bg mr16 mb24' :'self-bg mr16 mb24'"
                      size="medium"
                      :closable="closeBtnVisible"
                      @close="onTagClose(item.id,value.id)"
                      :key="value.id">
                <el-popover trigger="hover"
                            width="150"
                            placement="top">
                  <span class="center">这是自动标签</span>
                  <span v-show="value.isAutomatic"
                        slot="reference"
                        class="automatic-icon">
                    <svg-icon icon="icon_cha"
                              class="mr4 pointer ft16 fc8" />
                  </span>
                </el-popover>
                {{value.name}}
                {{value.isAutomatic}}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="pr16 fr pb24 primary-color pointer expanded-more"
           v-if="portraitBottomHeight > 248"
           @click="isExpandedMoreTag = !isExpandedMoreTag">
        <span class="mr12">{{isExpandedMoreTag ? '收起全部' : '展开全部'}}</span>
        <svg-icon icon="icon_shensuoanniu"
                  v-show="isExpandedMoreTag"></svg-icon>
        <svg-icon icon="icon_zhankaianniu"
                  v-show="!isExpandedMoreTag"></svg-icon>
      </div>
    </div>
    <div v-else
         class="center color-999"
         style="height:100px">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'MemberPortrait',
  methods: {
    // 添加标签
    goHandleMember (type) {
      const route = {
        name: 'Marking',
        query: {
          type: type,
          id: this.$route.query.id
        }
      }
      this.$router.push(route)
    },
    // 编辑状态-保存按钮
    onSave () {
      this.closeBtnVisible = false
      if (this.$isEmpty(this.memberLabelIds)) {
        this.closeBtnVisible = false
        this.getMemberRelGroupAndLabel()
      } else {
        this.removeMemberRelLabel()
      }
    },
    // 编辑状态-取消按钮
    onCancel () {
      this.getMemberRelGroupAndLabel()
      this.closeBtnVisible = false
      this.memberLabelIds = []
    },
    // 标签关闭按钮
    onTagClose (groupId, labelId) {
      const groupData = this.portraitInfo.filter(info => info.id === groupId)[0].memberLabelList
      const deleteIndex = groupData.findIndex(item => item.id === labelId)
      groupData.forEach(item => {
        if (item.id === labelId) {
          this.memberLabelIds.push(item.id)
        }
      })
      groupData.splice(deleteIndex, 1)
      this.portraitInfo = this.portraitInfo.filter(item => !this.$isEmpty(item.memberLabelList))
    },
    // 删除标签
    removeMemberRelLabel () {
      const params = {
        memberLabelIds: this.memberLabelIds,
        memberId: this.$route.query.id
      }
      this.$api.removeMemberRelLabel(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('删除标签成功')
        this.getMemberRelGroupAndLabel()
      })
    },
    // 根据会员id获取标签组及标签
    getMemberRelGroupAndLabel () {
      this.$api.getMemberRelGroupAndLabel({ memberId: this.$route.query.id }).then(res => {
        if (res.isError) return
        this.portraitInfo = res.content
        this.memberLabelIds = []
        if (!this.$isEmpty(res.content)) {
          setTimeout(() => {
            this.portraitBottomHeight = this.$refs.portraitBottom.offsetHeight
            window.onresize = () => {
              this.portraitBottomHeight = this.$refs.portraitBottom.offsetHeight
            }
          }, 10)
        }
      })
    }
  },
  data () {
    return {
      isExpandedMoreTag: false, // 展开收起全部
      closeBtnVisible: false, // 标签上面的关闭按钮
      portraitInfo: [],
      memberLabelIds: [],
      portraitBottomHeight: 248
    }
  },
  created () {
    this.getMemberRelGroupAndLabel()
  },
  destroyed () {
    window.onresize = null
  }
}
</script>

<style lang='scss' scoped>
.w82 {
  width: 82px;
}
.public-bg {
  background: #518cfc;
  border-color: #518cfc;
}
.self-bg {
  background: #fff8f0;
  color: #fc8d11 !important;
  border: none;
}
.member-portrait-wrap {
  background: #ffffff;
  border-radius: 2px;
  .portrait-top {
    padding: 32px 0 16px 12px;
  }
  .portrait-bottom-box {
    border: 1px solid #dedede;
    padding: 24px 24px 0 24px;
    overflow: hidden;
    position: relative;
    transition: height 0.4s;
  }
  .expanded-more {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    text-align: right;
    background: #fff;
  }
  .portrait-bottom {
    // padding: 0 16px 24px;
    height: auto;
    overflow: hidden;
    .info-content {
      flex: 1;
    }
    .automatic-icon {
      display: inline-block;
      height: 32px;
    }
    .el-tag--medium {
      height: 32px;
      line-height: 30px;
      color: #fff;
      /deep/ .el-tag__close {
        color: #fc8d11;
        font-size: 16px;
      }
      /deep/ .el-tag__close:hover {
        background-color: transparent;
      }
    }
  }
}
.fc8 {
  color: #fc8d11 !important;
}
</style>
