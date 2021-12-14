<template>
  <page title="打标签"
        class="marking-wrap">
    <div class='marking-content row pt16 pb16'>
      <div v-if="tagListData && tagListData.length>0"
           class="flex"
           style="width:100%">
        <div class="marking-left mr32">
          <div class="marking-tag-item pt24 pl16 pr16"
               v-for="item in tagListData"
               v-show="item.isShow"
               :key="item.id">
            <div class="mb16 center-align">
              <span class="mr24">{{item.name}}</span>
              <el-input placeholder="请输入标签名称搜索"
                        class="w240"
                        clearable
                        v-model="item.keyword"
                        @focus.once="focusInputFirst(item)"
                        @change="changeInput($event)"
                        @clear="clearInput(item)"
                        @keyup.enter.native="onSearch(item)">
                <i slot="suffix"
                   class="el-input__icon el-icon-search pointer"
                   @click="onSearch(item)"></i>
              </el-input>
            </div>
            <div v-if="!$isEmpty(item.memberLabelList)">
              <el-checkbox class="mr16 mb16"
                           v-for="ele in item.memberLabelList"
                           :key="ele.id"
                           v-model="ele.checked"
                           :label="ele.name"
                           border
                           @change="(val) => {changeCheckbox(val,ele,item)}"
                           size="medium"></el-checkbox>
            </div>
            <div v-else
                 style="text-align:center"
                 class="color-999 pt8 mb24">暂未搜到该标签</div>
          </div>
        </div>
        <div class="marking-right pt24 pl16 pr16">
          <div class="mb16">已选中<span class="primary-color">{{markingCount}}</span>个标签</div>
          <div class="marking-selected-tag"
               v-if="markingCount>0">
            <transition-group name="fade-transform-left">
              <el-tag :key="item.id"
                      v-for="item in selectedTags"
                      class="mr16 mb16"
                      closable
                      disable-transitions
                      @close="onTagClose(item)">
                {{item.name}}
              </el-tag>
            </transition-group>
          </div>
          <div v-else
               class="marking-right-null center">请从左侧选择标签</div>
          <div class="handle-tag-container">
            <el-button type="primary"
                       @click="onTagConfirm">保存</el-button>
            <el-button @click="onTagCancel">取消</el-button>
          </div>
        </div>
      </div>

      <div v-else
           style="width:100%;height:calc(100% - 65px)"
           class="center">
        <page-empty icon="icon_zanwubiaoqian"
                    message="暂无标签，请先到 “标签管理” 进行新增">
          <el-button slot="button"
                     class="secondary-btn"
                     @click="onSetting">新增标签</el-button>
        </page-empty>
        <page-handle :config="{btns: [{ text: '返回', event: 'cancel' }]}">
        </page-handle>

      </div>
    </div>
  </page>
</template>

<script>
import PageEmpty from '@/components/PageEmpty'
import PageHandle from '@/components/PageHandle'
export default {
  name: 'Marking',
  methods: {
    // 空页面去设置
    onSetting () {
      this.$router.push({
        name: 'labelManage'
      })
    },
    // 左侧搜索框第一次聚焦时存储标签数据
    focusInputFirst (item) {
      this.listInitData[item.id] = [...item.memberLabelList]
    },
    // 获取搜索框输入时的value
    changeInput (e) {
      this.serachLabel = e
    },
    // 搜索框搜索
    onSearch (item) {
      item.memberLabelList = this.listInitData[item.id].filter(tag => tag.name.indexOf(this.serachLabel) > -1)
    },
    // 搜索框清除按钮
    clearInput (item) {
      item.memberLabelList = [...this.listInitData[item.id]]
    },
    // 左侧标签选中或取消
    changeCheckbox (val, tag, item) {
      if (val) {
        this.selectedTags.push({ ...tag, titleName: item.name })
        this.markingCount++
      } else {
        this.selectedTags.splice(this.selectedTags.findIndex(item => item.id === tag.id), 1)
        this.markingCount--
      }
    },
    // 右侧标签上面的关闭按钮
    onTagClose (tag) {
      const closeIndex = this.selectedTags.findIndex(item => item.id === tag.id)
      this.selectedTags.splice(closeIndex, 1)
      this.tagListData.forEach(tagPar => {
        tagPar.memberLabelList && tagPar.memberLabelList.forEach(tagChild => {
          tagChild.id === tag.id && (tagChild.checked = false)
        })
      })
      this.markingCount--
    },
    // 保存
    onTagConfirm () {
      if (this.selectedTags.length === 0) {
        this.$message.warning('请选择标签')
      } else if (this.type === 'tag') {
        const memberLabelIds = Array.from(this.selectedTags, ({ id }) => id)
        const params = {
          memberLabelIds: memberLabelIds,
          memberIds: this.$route.params.selectedIds || [this.$route.query.id]
        }
        this.$api.createMemberRelLabel(params).then(res => {
          if (res.isError) {
            this.$message.error(res.message)
            return
          }
          this.$message.success('打标签成功')
          this.onTagCancel()
        })
      } else {
        sessionStorage.setItem('selectedLabelTags', JSON.stringify(this.selectedTags))
        this.onTagCancel()
      }
    },
    // 取消
    onTagCancel () {
      this.$store.dispatch('tags/delView', this.$route)
      this.$router.back()
    },
    // 获取标签组及组里的标签
    getManualGroupLabelByOrg () {
      let apiName
      if (this.type === 'customer') {
        apiName = 'getGroupLabelByOrg'
      } else {
        apiName = 'getManualGroupLabelByOrg'
      }
      this.$api[apiName]().then(res => {
        if (res.isError) return
        this.tagListData = JSON.parse(JSON.stringify(res.content))
        this.tagListData.map(item => {
          if (this.$isEmpty(item.memberLabelList)) {
            item.isShow = false
          } else {
            item.isShow = true
          }
        })
      })
    }
  },
  data () {
    const { type } = this.$route.query
    return {
      markingCount: 0,
      selectedTags: [],
      tagListData: [],
      listInitData: {},
      serachLabel: '',
      type
    }
  },
  created () {
    if (this.type === 'tag' || this.type === 'customer') {
      this.getManualGroupLabelByOrg()
    }
  },
  beforeRouteEnter (to, from, next) {
    to.meta.activeMenu = from.name === 'AddCustomer' ? 'myCustomer' : 'MemberInformation'
    next()
  },
  components: {
    PageEmpty, PageHandle
  }
}
</script>

<style lang='scss' scoped>
.marking-wrap {
  height: calc(100% - 32px);
  // height: 100%;
  .marking-content {
    height: calc(100% - 40px);
    // height: 100%;
  }
  .marking-no-data {
    width: 100%;
    text-align: center;
    margin-top: 300px;
  }
  .marking-left {
    flex: 1;
    border: 1px solid #e6e5ea;
    border-radius: 4px;
    height: 100%;
    overflow-y: auto;
    .marking-tag-item {
      border-bottom: 1px solid $color-de;
      /deep/ .el-checkbox__input {
        display: none;
      }
      /deep/ .el-checkbox__label {
        padding-left: 0 !important;
      }
      /deep/ .el-checkbox.is-bordered.is-checked {
        border-color: $primaryColor;
        color: $primaryColor;
      }
      /deep/ .el-checkbox.is-bordered {
        height: 32px;
        padding: 0 8px;
        border: 1px solid #dedede;
        color: #666666;
      }
      /deep/ .el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label {
        line-height: 32px;
      }
      /deep/ .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0px;
      }
    }
    .marking-tag-item:last-child {
      border-bottom: 0px;
    }
  }

  .marking-right {
    width: 540px;
    border: 1px solid #e6e5ea;
    border-radius: 4px;
    height: calc(100% - 24px);
    overflow: hidden;
    .marking-selected-tag {
      overflow-y: auto;
      height: calc(100% - 116px);
      /deep/ .el-tag {
        background-color: #fff;
        border-color: $primaryColor;
        font-size: 14px;
        color: $primaryColor;
        .el-icon-close {
          color: $primaryColor;
          font-size: 14px;
          top: 0px;
        }

        .el-tag__close:hover {
          background-color: #fff;
        }
      }
      /deep/.el-tag--medium {
        height: 32px;
        line-height: 32px;
      }
    }
    .marking-right-null {
      height: calc(100% - 112px);
    }
    .handle-tag-container {
      width: 540px;
      position: fixed;
      bottom: 75px;
      text-align: center;
      padding: 24px 0;
      background: #fff;
    }
  }
}
</style>
