<template>
  <div class='community-wrap'>
    <div class="info-title">物业</div>
    <div class="content column center-align pt48">
      <div class="table b mb24"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="center-align">
          <span class="color-999">小区名称：</span>
          <div class="label1"
               style="color: #fc8d11;">{{item.plotOrgName}}</div>
          <span class="color-999">负责人：</span>
          <div class="label2">{{item.headName}}</div>
          <span class="color-999">联系电话：</span>
          <span>{{item.phone}}</span>
        </div>

        <div class="color-999 mt24">文件上传（物业/业委会经费公开等）</div>
        <div class="text-btn center-align"
             style="flex-wrap:wrap">
          <div v-for="(item1, index1) in item.attachments"
               :key="index1"
               class="center-align mt16 "
               style="margin-right:40px "
               @click="handlePreview(item1)">
            <SvgIcon icon="icon_doc-line"
                     class="ft20"></SvgIcon>
            <div class="ml8">{{item1.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onShowPreview } from '@v/talent-think-tank-manage/urlPreview.js'
export default {
  name: 'community',
  methods: {
    onShowPreview,
    handlePreview (item) {
      this.onShowPreview(item.url)
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityPropertyList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },
    initRequest () {
      this.getList()
    }
  },
  created () {
    this.initRequest()
  },
  data () {
    return {
      dataList: []
    }
  },
  props: {
    communityOrgId: String
  }
}
</script>

<style lang='scss' scoped>
.community-wrap {
  padding: 70px 100px;
  .content {
  }
  .name {
    padding: 16px 24px;
    color: #fc8d11;
  }
  .label1 {
    width: 190px;
  }
  .label2 {
    width: 120px;
  }
  .table {
    min-width: 1064px;
    padding: 24px 32px;
    background: #f9f9f9;
    border-radius: 6px;
  }
}
</style>
