<template>
  <page-empty v-if="$isEmpty(tableData)"
              icon="icon_zanwurongheshezhi"
              message="暂无客群"
              tip="请先新增客群">
  </page-empty>
  <div v-else
       class='list-wrap'>
    <el-card shadow="hover"
             v-for="(item,index) in tableData"
             :key="item.id">
      <header class="between-row pl16 pr16">
        <p class="top"><span class="ft14 color-333 bold">
            {{item.name}}</span>
          <!-- <a v-if="item.memberGroupPublicRange === '01'"
             class="primary-color ml8 ft12">未公开</a> -->
        </p>
        <!-- <span v-if="type !== 'myCreate' && $hasAuth($urls.modifyMemberGroupFavoritesStatus)"
              @click="onChangeFavorites(item)">
          <svg-icon :class="item.isFavorites ? 'ft20 primary-color pointer' : 'ft20 color-ccc pointer'"
                    :icon="item.isFavorites ? 'icon_shoucang' : 'icon_weishoucang'">
          </svg-icon>
        </span>
        <span v-else
              class="collect-num">
          <a>{{item.favoritesQuantity}}</a>人收藏
        </span> -->
      </header>
      <content class="color-999 pl16 pr16 pt16">
        <div>
          <div v-if="item.targetOrgName"
               class="f-wrap">
            <p class="mr8 flex">本组织/<a class="org-name active">{{item.createOrgName}}</a></p>
            <p>{{item.targetMemberQuantity}}/<a class="active">{{item.createMemberQuantity}}</a>（用户数）</p>
          </div>
          <div v-else
               class="f-wrap">
            <p class="mr8"><a class="org-name">用户数：</a></p>
            <p><span class="color-333">{{item.memberQuantity}}</span></p>
          </div>
        </div>
        <!-- <div v-if="type === 'open' || type === 'myCollect'">
          <div v-if="item.targetOrgName"
               class="f-wrap">
            <p class="mr8 flex">本组织/<a class="org-name active">{{item.createOrgName}}</a></p>
            <p>{{item.targetMemberQuantity}}/<a class="active">{{item.createMemberQuantity}}</a>（用户数）</p>
          </div>
          <div v-else
               class="f-wrap">
            <p class="mr8"><a class="org-name">{{item.createOrgName}}</a></p>
            <p><span class="color-333">{{item.createMemberQuantity}}</span>（用户数）</p>
          </div>
        </div>
        <div v-else>
          <div v-if="item.createOrgId === currentOrgId "
               class="f-wrap">
            <p class="mr8 flex"><a class="org-name">{{item.createOrgName}}</a></p>
            <p><a class="color-333">{{item.createMemberQuantity}}</a>（用户数）</p>
          </div>
          <div v-else
               class="f-wrap">
            <p class="mr8"><a class="org-name active">{{item.createOrgName}}</a></p>
            <p><a class="active">{{item.createMemberQuantity}}</a>（用户数）</p>
          </div>
        </div> -->

        <!-- <div class="label">
          <p :class="item.memberLabels && item.memberLabels.length > 0 ? null : 'mt8'">
            <span>标签：</span>
            <a class="mt8 mr8 pl12 pr12 active"
               v-for="labelItem in item.memberLabels"
               :key="labelItem.memberLabelId">
              {{labelItem.memberLabelName}}
            </a>
          </p>
        </div> -->
        <div style=" height: 32px;overflow: hidden;">
          <div class="label flex">
            <div ref="customerLabel"
                 :class="item.memberLabels && item.memberLabels.length > 0 ? null : 'mt8'">
              <span>标签：</span>
              <a class="mt8 mr8 pl12 pr12 active"
                 v-for="labelItem in item.memberLabels"
                 :key="labelItem.memberLabelId"
                 :label="labelItem.memberLabelName">{{labelItem.memberLabelName}}
              </a>
            </div>
            <el-popover v-show="moreIndexList.includes(index)"
                        placement="top"
                        width="280"
                        trigger="hover">
              <div class="column"
                   style="max-height:158px;overflow-y: scroll;">
                <p class="bold mb20 color-333">标签</p>
                <div class="f-wrap">
                  <p style="padding: 0 12px;height: 24px;line-height: 24px;text-align: center;border-radius: 12px;color: #fc8d11;background: #fff8f0;margin-right: 8px;margin-bottom: 8px;white-space: nowrap;"
                     v-for="labelItem in item.memberLabels"
                     :key="labelItem.memberLabelId"
                     :label="labelItem.memberLabelName">{{labelItem.memberLabelName}}
                  </p>
                </div>

              </div>
              <a slot="reference"
                 class="ml8 mt8 mr8 pl12 pr12 active">...</a>
            </el-popover>
          </div>
        </div>

        <ul>
          <li class="pt8">创建人：<span class="color-333">{{item.creatorName}}</span></li>
          <li class="pt8">最近更新：<span class="color-333">{{$moment(item.modifyTime).format('YYYY-MM-DD')}}</span></li>
        </ul>
        <el-button v-if='$hasAuth($urls.getMemberGroupDetail)'
                   type="text"
                   @click="onToDetail(item)">详情</el-button>
      </content>
    </el-card>

  </div>
</template>
<script>
import { getGlobalParams } from '@/utils/login'
import PageEmpty from '@c/PageEmpty.vue'

export default {
  name: 'List',
  methods: {
    getIsLabelMoreList () {
      const arr = []
      setTimeout(() => {
        this.$refs.customerLabel && this.$refs.customerLabel.forEach((ele, index) => {
          if (ele.offsetHeight > 32) {
            arr.push(index)
          }
        })
      }, 100)
      this.moreIndexList = arr
    },
    // 修改客群收藏状态
    onChangeFavorites (row) {
      const query = {
        memberGroupId: row.id,
        isFavorites: !row.isFavorites
      }
      this.$api.modifyMemberGroupFavoritesStatus(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        row.isFavorites = !row.isFavorites
        if (this.type === 'myCollect') {
          this.$emit('getCollectList')
        }
        this.$message.success(`${row.isFavorites ? '收藏成功' : '取消收藏成功'}`)
      })
    },
    // 跳转到详情
    onToDetail (row) {
      const routeName = this.type === 'open' ? 'labelManagePublicDetail' : 'labelManageMyDetail'
      const route = {
        name: routeName,
        query: {
          id: row.id,
          type: this.type
        }
      }
      this.$router.push(route)
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  watch: {
    tableData () {
      this.getIsLabelMoreList()
    }
  },
  data () {
    return {
      moreIndexList: [],
      currentOrgId: getGlobalParams('orgId')
    }
  },
  components: {
    PageEmpty
  }
}
</script>

<style lang='scss' scoped>
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
  -webkit-appearance: none;
  background: transparent;
}
.ft20 {
  font-size: 20px;
}
.color-ccc {
  color: #ccc;
}

.list-wrap {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, 306px);
  grid-template-rows: repeat(auto-fit, 176px);
  .el-card {
    width: 306px;
    height: 174px;
    position: relative;
    .org-name {
      display: inline-block;
      white-space: nowrap;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /deep/ .el-card__body {
      padding: 0 !important;
      header {
        height: 40px;
        line-height: 40px;
        background: #f0f7ff;
        .collect-num {
          color: #999;
          a {
            color: #ffac41;
          }
        }
        .top {
          a {
            display: inline-block;
            width: 44px;
            height: 20px;
            line-height: 20px;
            border: 1px solid $primaryColor;
            border-radius: 2px;
            text-align: center;
          }
        }
      }
      content {
        display: inline-block;
        a.active {
          color: #fc8d11;
        }
        .label {
          a {
            display: inline-block;
            height: 24px;
            line-height: 24px;
            background: #fff8f0;
            border-radius: 4px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
        button {
          position: absolute;
          right: 0;
          bottom: 8px;
        }
      }
    }
  }
}
</style>
