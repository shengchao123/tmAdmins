<template>
  <div class='community-wrap'>
    <div class="info-title">党组织</div>
    <div class="content">
      <div class="center-align mb16"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="community-item-wrap">
          <div class="item between-row">
            <div class="center-align">
              <div class="label1">
                <span style="color:#ff0000">*</span>
                <span>党组织</span>
              </div>
              <el-input v-model="item.name"
                        placeholder="输入党组织姓名"></el-input>
            </div>
            <el-button class="secondary-btn"
                       v-if="item.id"
                       @click="$refs.showDialog.show(item)">{{item.partyGraphic ? '查看' : '新增'}}支部风采
            </el-button>
          </div>
          <div class="item center-align mt16">
            <div class="label1">
              <span style="color:#ff0000">*</span>
              <span>书记</span>
            </div>
            <el-input v-model="item.partyContacts[0].name"
                      placeholder="输入姓名"
                      maxlength="5"
                      show-word-limit></el-input>
            <div class="label2 ml32">
              <span style="color:#ff0000">*</span>
              <span>联系电话</span>
            </div>
            <el-input v-model="item.partyContacts[0].phone"
                      placeholder="联系电话"></el-input>
            <div class="ml32 label3">
              <span style="color:#ff0000">*</span>
              <span>分工</span>
            </div>
            <el-input v-model="item.partyContacts[0].position"
                      placeholder="输入职责分工"
                      class="limit"
                      maxlength="20"
                      show-word-limit></el-input>
          </div>
          <div class="item center-align mt16"
               v-for="(item1, index1) in item.partyContacts"
               :key="index1"
               v-if="index1 !== 0">
            <div class="label1">
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
                       v-show="index1 === item.partyContacts.length - 1"
                       class="text-btn ml16 mr8"></SvgIcon>
            </span>
            <span @click="onSub(index, index1)">
              <SvgIcon icon="icon_jianshao"
                       class="text-btn ml16"
                       v-show="item.partyContacts.length > 2"></SvgIcon>
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
      <ShowDialog @success="getList"
                  ref="showDialog"></ShowDialog>
    </div>
  </div>
</template>

<script>
import ShowDialog from '@/views/grassroots-governance/community/add/components/ShowDialog'
import { checkInput } from '@/utils/validate.js'

export default {
  name: 'community',
  methods: {
    onConfirm () {
      for (const i in this.dataList) {
        const item = this.dataList[i]
        if (!item.name) return this.showMessage()
        for (const j in item.partyContacts) {
          const item2 = item.partyContacts[j]
          if (!item2.name || !item2.position) {
            return this.showMessage('补全信息')
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
        communityParties: this.dataList
      }
      this.$api.updateJourneyCommunityParty(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
        this.getList()
      })
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityPartyList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },
    initDataList () {
      this.dataList = [
        {
          name: '',
          partyContacts: [
            {
              contactType: '01',
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
      const temContacts = temArr[index].partyContacts
      temContacts.push({
        contactType: '03',
        name: '',
        phone: '',
        position: ''
      })
      temArr[index].partyContacts = temContacts
      this.dataList = temArr
    },
    onSub (index, index1) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      var temContacts = temArr[index].partyContacts
      temContacts.splice(index1, 1)
      temArr[index].partyContacts = temContacts
      this.dataList = temArr
    },
    onAddCommunity () {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.push({
        name: '',
        partyContacts: [
          {
            contactType: '01',
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
  components: { ShowDialog },
  data () {
    return {
      dataList: []
    }
  },
  props: {
    communityOrgId: String
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
