<template>
  <page title="定制详情"
        needPadding>
    <div class="operate-position">
      <el-dropdown placement="bottom"
                   @command="commandOperate">
        <el-button :class="detailData.status === 3?'':'secondary-btn'"
                   :disabled="detailData.status === 3">管理操作</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="detailData.status !==3 && $hasAuth($urls.modifyJourneyPlayCustomizationShowStatusById)"
                            command="status"
                            class="p26">{{statusText}}</el-dropdown-item>
          <el-dropdown-item v-if="detailData.status !== 3 && $hasAuth($urls.deleteJourneyPlayCustomizationById)"
                            command="delete"
                            class="p26">删除
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content-wrap relative">
      <div class="delete-product"
           v-if="detailData.status === 3">
        <img :src="deleteImg"
             alt=""
             class="delete-img" />
      </div>
      <template v-for="item in basicProp">
        <div v-if="!$isEmpty(detailData[item.prop])"
             :key="item.prop"
             class="row mb8"
             :class="item.prop === 'nick' && 'center-align'">
          <div class="color-999 w70"
               :class="item.prop === 'nick' ? 'line-h32 mb12':'line-h22'">{{item.name}}：</div>
          <div v-if="item.prop === 'nick'"
               class="center-align ml8 mb12">
            <img :src="$fileHost + detailData.avatar"
                 alt=""
                 class="avatar-img" />
            <div class="w160 ml8 mr8 line-h32">{{detailData.nick}}</div>
            <!-- <div class="manage-status">管理员</div> -->
          </div>
          <div class="w760 line-h22 ml8 row"
               v-else>
            <div>{{detailText(item.prop)}}</div>
            <div v-if="item.prop === 'code' && detailData.status === 2"
                 class="hide-status">已隐藏</div>
          </div>
        </div>
      </template>
    </div>
    <page-handle :config="{ btns: [{ text: '返回', event: 'cancel' }]}"></page-handle>
  </page>
</template>

<script>
import PageHandle from '@c/PageHandle'
export default {
  name: 'Detail',
  methods: {
    commandOperate (val) {
      val === 'status' ? this.onStatusConfirm() : this.onDeleteConfirm()
    },
    // 显示隐藏
    onStatusConfirm () {
      const { journeyPlayCustomizationId, status } = this.detailData
      const params = {
        journeyPlayCustomizationId,
        displayOrHidden: status === 2
      }
      this.$api.modifyJourneyPlayCustomizationShowStatusById(params).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success(`${this.statusText}该条定制信息成功`)
        this.getJourneyPlayCustomizationById()
      })
    },
    // 删除
    onDeleteConfirm () {
      const { journeyPlayCustomizationId } = this.detailData
      const params = {
        journeyPlayCustomizationId
      }
      this.$api.deleteJourneyPlayCustomizationById(params).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除该条定制信息成功')
        this.getJourneyPlayCustomizationById()
      })
    },
    // 根据id获取联盟信息
    getJourneyPlayCustomizationById () {
      this.$api.getJourneyPlayCustomizationById({ journeyPlayCustomizationId: this.$route.query.journeyPlayCustomizationId }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.detailData = res?.content ?? {}
      })
    }
  },
  data () {
    return {
      detailData: {},
      basicProp: Object.freeze([
        {
          prop: 'code',
          name: 'ID'
        },
        {
          prop: 'nick',
          name: '发布人'
        },
        {
          prop: 'createTime',
          name: '发布时间'
        },
        {
          prop: 'contactPhone',
          name: '联系电话'
        },
        {
          prop: 'peopleQuantity',
          name: '人数'
        },
        {
          prop: 'playDays',
          name: '天数'
        },
        {
          prop: 'demand',
          name: '需求'
        }
      ])
    }
  },
  computed: {
    // 显示、隐藏按钮状态
    statusText () {
      const status = this.detailData.status
      return status === 1 ? '隐藏' : '显示'
    },
    deleteImg () {
      return require('@/assets/noteManage/deleted.png')
    },
    detailText () {
      return (val) => {
        const detailData = this.detailData
        if (val === 'createTime') {
          return this.$moment(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')
        }
        return detailData[val]
      }
    }
  },
  components: { PageHandle },
  created () {
    this.getJourneyPlayCustomizationById()
  }
}
</script>

<style lang="scss">
.w80 {
  width: 60px;
  text-align: center;
}
.p26 {
  padding: 0 26px !important;
}
</style>
<style lang='scss' scoped>
.operate-position {
  position: absolute;
  right: 24px;
  top: 16px;
}
.w70 {
  width: 70px;
  height: 32px;
}
.w760 {
  width: 760px;
}
.w160 {
  width: 160px;
  height: 32px;
}
.line-h32 {
  line-height: 32px;
}
.line-h22 {
  line-height: 20px;
}
.flex-wrap {
  flex-wrap: wrap;
}
.content-wrap {
  width: 838px;
  margin: 60px auto 0;
  .hide-status {
    font-size: 12px;
    color: #e02020;
    border: 1px solid #e02020;
    border-radius: 2px;
    width: 48px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    margin-left: 8px;
  }
  .manage-status {
    font-size: 12px;
    color: #fff;
    background: #fc8d11;
    border-radius: 2px;
    width: 48px;
    height: 18px;
    line-height: 18px;
    text-align: center;
  }
  .delete-product {
    position: absolute;
    top: 40px;
    right: 24px;
    .delete-img {
      width: 80px;
      height: 80px;
    }
  }
  .avatar-img {
    width: 56px;
    height: 56px;
    border-radius: 56px;
  }
}
</style>
