<template>
  <div class='community-wrap'>
    <div class="info-title">业委会</div>
    <div class="content">
      <div class="center-align mb16"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="community-item-wrap">
          <div class="item center-align">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>小区名称</span>
            </div>
            <el-select v-model="item.plotOrgId"
                       class="w240"
                       placeholder="选择小区，可多选">
              <el-option v-for="plot in plotOptions"
                         :key="plot.orgId"
                         :label="plot.orgName"
                         :value="plot.orgId">
              </el-option>
            </el-select>
          </div>
          <div class="item center-align mt16">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>主任</span>
            </div>
            <el-input v-model="item.ownerContacts[0].name"
                      placeholder="输入姓名"
                      maxlength="5"
                      show-word-limit></el-input>
            <div class="label2 ml32">
              <span style="color:#ff0000">*</span>
              <span>联系电话</span>
            </div>
            <el-input v-model="item.ownerContacts[0].phone"
                      placeholder="联系电话"></el-input>
            <div class="ml32 label3">
              <span style="color:#ff0000">*</span>
              <span>分工</span>
            </div>
            <el-input v-model="item.ownerContacts[0].position"
                      placeholder="输入职责分工"
                      maxlength="20"
                      class="limit"
                      show-word-limit></el-input>
          </div>
          <div class="item center-align mt16"
               v-for="(item1, index1) in item.ownerContacts"
               :key="index1"
               v-if="index1 !== 0">
            <div class="label2">
              <span style="color:#ff0000">*</span>
              <span>委员{{index1}}</span>
            </div>
            <el-input v-model="item1.name"
                      placeholder="输入姓名"
                      maxlength="5"
                      show-word-limit></el-input>
            <div class="label2 ml32">
              <span style="color:#ff0000">*</span>
              <span>联系电话</span>
            </div>
            <el-input v-model="item1.phone"
                      placeholder="联系电话"></el-input>
            <div class="ml32 label3">
              <span style="color:#ff0000">*</span>
              <span>分工</span>
            </div>
            <el-input v-model="item1.position"
                      placeholder="输入职责分工"
                      maxlength="20"
                      class="limit"
                      show-word-limit></el-input>

            <span @click="onAdd(index)">
              <SvgIcon icon="icon_tianjia"
                       v-show="index1 === item.ownerContacts.length - 1"
                       class="text-btn ml16 mr8"></SvgIcon>
            </span>
            <span @click="onSub(index, index1)">
              <SvgIcon icon="icon_jianshao"
                       class="text-btn ml16"
                       v-show="item.ownerContacts.length > 2"></SvgIcon>
            </span>
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
        if (!item.plotOrgId) return this.showMessage('请选择小区')
        for (const j in item.ownerContacts) {
          const item2 = item.ownerContacts[j]
          if (!item2.name || !item2.position) {
            return this.showMessage('请补全信息')
          }
          if (!checkInput(item2.phone, 'phone') && !checkInput(item2.phone, 'tel')) {
            return this.showMessage('电话信息错误，请检查')
          }
        }
      }
      this.updateInfo()
    },
    showMessage (msg) {
      this.$message.warning(msg)
    },
    updateInfo () {
      const params = {
        communityOrgId: this.communityOrgId,
        communityOwners: this.dataList
      }
      this.$api.updateJourneyCommunityOwner(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
      })
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityOwnerList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },
    initDataList () {
      this.dataList = [
        {
          name: '',
          ownerContacts: [
            {
              contactType: '02',
              name: '',
              phone: '',
              position: ''
            },
            {
              contactType: '03',
              name: '',
              phone: '',
              position: ''
            }
          ]
        }
      ]
    },
    onAdd (index) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      const temContacts = temArr[index].ownerContacts
      temContacts.push({
        contactType: '03',
        name: '',
        phone: '',
        position: ''
      })
      temArr[index].ownerContacts = temContacts
      this.dataList = temArr
    },
    onSub (index, index1) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      var temContacts = temArr[index].ownerContacts
      temContacts.splice(index1, 1)
      temArr[index].ownerContacts = temContacts
      this.dataList = temArr
    },
    onAddCommunity () {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.push({
        name: '',
        ownerContacts: [
          {
            contactType: '02',
            name: '',
            phone: '',
            position: ''
          },
          {
            contactType: '03',
            name: '',
            phone: '',
            position: ''
          }
        ]
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
    plotOptions: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.initRequest()
    this.initDataList()
  }
}
</script>

<style lang='scss' scoped>
.label1 {
  width: 54px;
}
.label2 {
  width: 70px;
}
.label3 {
  width: 40px;
}

.community-wrap {
  padding: 70px 100px;
  .content {
    padding: 32px 100px;
  }
  .el-input {
    width: 240px;
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
