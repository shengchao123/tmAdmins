<template>
  <div class="selected-label-wrap">
    <div class="container">
      <div>
        <el-form :rules="rules"
                 :model="formData"
                 ref="formData"
                 label-width="76px"
                 class="mt24 form">
          <el-form-item label="选择标签"
                        prop="selectLabel">
            <!-- <span class="mr12">选择标签</span> -->
            <el-button plain
                       class="secondary-btn"
                       @click="onToAddLabel">添加</el-button>
          </el-form-item>
        </el-form>

      </div>
      <!-- <div v-show="isShowLabel || !$isEmpty(tagsList)"> -->
      <div v-show="!$isEmpty(tagsList)">
        <ul class="color-999 mt16 ml76">
          <!-- <li v-if="$isEmpty(tagsList)"
              class="placeholder">暂无标签数据请点击上方添加</li> -->
          <li v-for="item in tagsList"
              :key="item.id">
            <div class="flex"
                 v-if="!$isEmpty(item.tagOptions)">
              <span class="title">{{item.titleName}}：</span>
              <div>
                <el-tag type="info"
                        :key="tag.id"
                        v-for="tag in item.tagOptions"
                        closable
                        @close="onRemoveLabel(tag)">
                  {{tag.name}}
                </el-tag>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="!$isEmpty(tagsList)"
           class="mt16 ml12">
        <span class="mr8">会员结果</span>
        <el-button plain
                   class="secondary-btn"
                   @click="onSearch">查询</el-button>
      </div>
      <div v-show="isSearchResult"
           style="margin-left: 64px">
        <member-list ref="memberList">
        </member-list>
      </div>
    </div>
  </div>
</template>
<script>
import sameAttrToNewArrayObj from './index.js'
import { MemberList } from '../../components'
export default {
  name: 'SelectedLabel',
  data () {
    const checkLabel = (rule, value, callback) => {
      if (this.$isEmpty(this.tagsList)) {
        return callback(new Error('请选择标签'))
      }
      callback()
    }
    return {
      formData: {},
      rules: {
        selectLabel: [
          { required: true, validator: checkLabel, trigger: 'change' }
        ]
      },
      // isShowLabel: false,
      isSearchResult: false,
      sameAttrToNewArrayObj,
      tagsList: [],
      activeName: 'memberSpread',
      memberLabels: []
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    oldSelectedLabelTags: {
      type: Array,
      default: function () {
        return []
      }
    },
    memberGroupRuleType: {
      type: String,
      default: function () {
        return '01'
      }
    }
  },
  watch: {
    memberLabels: {
      handler: function (val) {
        if (this.$refs.memberList) {
          this.$refs.memberList.memberLabelList = val
        }
      },
      immediate: true
    },
    detailInfo (val) {
      if (this.$route.query.type === 'edit') {
        this.$emit('update:memberGroupRuleType', val.memberGroupRuleType)
      }
    },
    oldSelectedLabelTags (val) {
      // 编辑时的原先数据
      const oldArr = JSON.parse(
        JSON.stringify(val)
          .replace(/memberLabelGroupName/g, 'titleName')
          .replace(/memberGroupLabels/g, 'tagOptions')
          .replace(/memberLabelName/g, 'name')
          .replace(/memberLabelId/g, 'id')
      )
      const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags')) || []
      const storageArr = this.sameAttrToNewArrayObj(selectedLabelTags)
      if (!this.$isEmpty(storageArr)) {
        this.tagsList = storageArr
        this.$emit('update:labelTagsList', this.tagsList)
      } else {
        this.tagsList = oldArr
        this.$emit('update:labelTagsList', this.tagsList)
      }
    },
    tagsList (val) {
      // 为了方便使用公共组件 将数据格式再转化成原来的格式赋值给memberLabels传到客群分布组件
      const memberLabelsArr = []
      val.forEach(el1 => {
        el1.tagOptions.forEach(el2 => {
          memberLabelsArr.push(el2)
        })
      })
      this.memberLabels = JSON.parse(JSON.stringify(memberLabelsArr).replace(/id/g, 'memberLabelId'))
    }
  },
  activated () {
    // 初始化页面
    this.$nextTick(() => {
      const that = this
      this.$bus.$on('listInit', function () {
        // that.isShowLabel = false
        that.isSearchResult = false
        const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags')) || []
        that.tagsList = that.sameAttrToNewArrayObj(selectedLabelTags)
      })
    })
  },
  created () {
    const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags')) || []
    this.tagsList = this.sameAttrToNewArrayObj(selectedLabelTags)
  },
  methods: {
    onSearch () {
      this.isSearchResult = true
      this.$refs.memberList && this.$refs.memberList.getTableData()
    },
    // 移除标签
    onRemoveLabel (tag) {
      const newTagsList = JSON.parse(JSON.stringify(this.tagsList))
      this.tagsList.forEach((el, i) => {
        el.tagOptions.forEach((el2, j) => {
          if (el2.id === tag.id) {
            if (el.tagOptions.length > 1) {
              newTagsList[i].tagOptions.splice(j, 1)
            } else {
              newTagsList.splice(i, 1)
            }
          }
        })
      })
      this.tagsList = newTagsList
      this.$emit('update:labelTagsList', this.tagsList)
      sessionStorage.setItem('selectedLabelTags', JSON.stringify(this.tagsList))
    },
    onToAddLabel () {
      // this.isShowLabel = true
      const route = {
        name: 'Marking',
        query: {
          type: 'customer'
        }
      }
      this.$router.push(route)
    }
  },
  components: { MemberList }
}
</script>

<style lang='scss' scoped>
.ml76 {
  margin-left: 76px;
}
.pb70 {
  padding-bottom: 70px;
}
.ml106 {
  margin-left: 106px;
}
.selected-label-wrap {
  .container {
    width: 1362px;
    margin-left: 106px;
    ul {
      border: 1px solid #dedede;
      border-radius: 6px;
      padding: 24px;

      li {
        &:last-child {
          margin-bottom: -24px;
        }

        /deep/ .el-tag.el-tag--info {
          border: 0;
          background: #fff8f0;
          color: #fc8d11;
          margin-right: 16px;
          margin-bottom: 16px;
          &:last-child {
            margin-right: 0;
          }
          .el-tag__close {
            color: #fc8d11;
          }
          .el-tag__close:hover {
            background: #fff;
          }
        }
        span {
          display: inline-block;
          height: 32px;
          line-height: 32px;
        }
        .title {
          display: inline-block;
          margin-right: 16px;
          white-space: nowrap;
        }
      }
      .placeholder {
        margin: 0 !important;
      }
    }
  }
}
</style>
