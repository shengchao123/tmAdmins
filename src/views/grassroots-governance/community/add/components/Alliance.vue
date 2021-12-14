<template>
  <div class='community-wrap'>
    <div class="info-title">党建联盟</div>
    <div class="content">
      <div class="center-align mb16"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="mb16 community-item-wrap">
          <div class="item center-align mt16">
            <div class="item center-align">
              <div class="label">
                <span style="color:#ff0000">*</span>
                <span>党建联盟</span>
              </div>
              <el-input v-model="item.name"
                        class="limit"
                        placeholder="输入党建联盟名称"
                        maxlength="20"
                        show-word-limit></el-input>
              <div class="label ml32">
                <span style="color:#ff0000">*</span>
                <span>联盟主任</span>
              </div>
              <el-input v-model="item.headName"
                        placeholder="输入姓名"
                        maxlength="5"
                        show-word-limit></el-input>
            </div>
          </div>
          <div class="item center-align mt16">
            <div class="label">
              <span style="color:#ff0000">*</span>
              <span>联系电话</span>
            </div>
            <el-input v-model="item.phone"
                      placeholder="输入姓名"></el-input>
            <div class="label ml32">
              <span style="color:#ff0000">*</span>
              <span>共建单位</span>
            </div>
            <el-select v-model="item.unitOrgIds"
                       class="w240"
                       multiple
                       placeholder="选择共建单位">
              <el-option v-for="org in orgOptions"
                         :key="org.orgId"
                         :label="org.orgName"
                         :value="org.orgId">
              </el-option>
            </el-select>
            <div class="label ml32">
              <span style="color:#ff0000">*</span>
              <span>覆盖小区</span>
            </div>
            <el-select v-model="item.plotOrgIds"
                       class="w240"
                       multiple
                       placeholder="选择小区，可多选">
              <el-option v-for="plot in plotOptions"
                         :key="plot.orgId"
                         :label="plot.orgName"
                         :value="plot.orgId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <span @click="onAddCommunity(index)">
            <SvgIcon icon="icon_tianjia"
                     v-show="index === dataList.length - 1"
                     class="text-btn ml16 mr8"></SvgIcon>
          </span>
          <span @click="onSubCommunity(index)">
            <SvgIcon icon="icon_jianshao"
                     class="text-btn ml16"
                     v-show="dataList.length >= 2"></SvgIcon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkInput } from '@/utils/validate.js'
export default {
  name: 'community',
  methods: {
    onConfirm () {
      for (const i in this.dataList) {
        const item = this.dataList[i]
        if (!item.name) {
          return this.showMessage('请填写联盟名称')
        }
        if (!item.headName) {
          return this.showMessage('请填写联盟主任名称')
        }
        if (!checkInput(item.phone, 'phone') && !checkInput(item.phone, 'tel')) {
          return this.showMessage('电话信息错误，请检查')
        }
        if (!item.unitOrgIds) {
          return this.showMessage('请选择共建单位')
        }
        if (this.$isEmpty(item.plotOrgIds)) {
          return this.showMessage('请选择覆盖小区')
        }
      }
      this.updateJourneyCommunityAlliance()
    },
    showMessage (msg) {
      this.$message.warning(msg)
    },
    updateJourneyCommunityAlliance () {
      const params = {
        communityOrgId: this.communityOrgId,
        communityAlliances: this.dataList
      }
      delete params.plots
      this.$api.updateJourneyCommunityAlliance(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
      })
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityAllianceList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        let temArr = []
        !this.$isEmpty(res.content) ? temArr = res.content : this.initDataList()
        if (temArr[0]) {
          this.dataList = temArr.map(item => {
            item.plotOrgIds = item.plots.map(item1 => item1.plotOrgId)
            item.unitOrgIds = item.units.map(item1 => item1.unitOrgId)
            return item
          })
        }
      })
    },

    initDataList () {
      this.dataList = [
        {
          headName: '',
          name: '',
          phone: ''
        }
      ]
    },
    onAddCommunity () {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.push({
        name: ''
      })
      this.dataList = temArr
    },
    onSubCommunity (index) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.splice(index, 1)
      this.dataList = temArr
    },

    initRequest () {
      this.getList()
    }
  },
  data () {
    return {
      dataList: []

    }
  },
  props: {
    communityOrgId: String,
    orgOptions: {
      type: Array,
      default: () => []
    },
    plotOptions: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.initDataList()
    this.initRequest()
  }
}
</script>

<style lang='scss' scoped>
.community-wrap {
  padding: 70px 100px;
  .content {
    padding: 32px 100px;
  }
  .el-input {
    width: 240px;
  }
  .label {
    width: 70px;
  }
  .community-item-wrap {
    min-width: 1030px;
    padding: 24px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
  }
}
</style>
