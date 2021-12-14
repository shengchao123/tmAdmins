<template>
  <div class="pt28">
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="pl40 pr40"
             label-position="left"
             label-width="112px">
      <div class="b-border">
        <div class="w900">
          <div class="info-title ml24 mb24">基本信息</div>
          <el-form-item label="联盟名称"
                        class="ml80"
                        prop="orgId">
            <el-select v-model="form.data.orgId"
                       class="w240"
                       @change="changeOrgStructure"
                       placeholder="请选择">
              <el-option v-for="item in orgOptions"
                         :key="item.orgId"
                         :label="item.orgName"
                         :value="item.orgId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联盟简称"
                        class="ml80 pl12"
                        prop="abbreviation">
            <el-input v-model="form.data.abbreviation"
                      class="w240 ml-10"
                      maxlength="10"
                      show-word-limit
                      placeholder="输入联盟简称"></el-input>
          </el-form-item>
          <el-form-item label="介绍(组织框架)"
                        class="ml80"
                        prop="introduction">
            <el-input v-model="form.data.introduction"
                      class="w690"
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 11}"
                      maxlength="500"
                      show-word-limit
                      placeholder="输入介绍文字"></el-input>
          </el-form-item>
          <el-form-item label="行政区域"
                        class="ml80"
                        prop="regionsCode">
            <el-select v-model="form.data.regionsCode"
                       class="w240"
                       placeholder="请选择">
              <el-option v-for="item in regionsOptions"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对应示范线"
                        class="pb16 ml80"
                        prop="journeyLineId">
            <el-select v-model="form.data.journeyLineId"
                       class="w240"
                       placeholder="请选择">
              <el-option v-for="item in journeyLineOptions"
                         :key="item.journeyLineId"
                         :label="item.name"
                         :value="item.journeyLineId"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="b-border"
           v-show="isShowOrgStructure">
        <div class="w900">
          <div class="info-title ml24 mb24">组织架构</div>
          <org-structure class="ml80"
                         ref="orgStructure"></org-structure>
        </div>
      </div>
      <div class="w900">
        <div class="info-title ml24 mb24">联盟联络人</div>
        <div>
          <page-table :data="table.data"
                      class="mt16 ml80"
                      isShowIndex
                      :col-configs="table.colConfig">
            <el-table-column slot="orgName"
                             label="职务"
                             min-width="200">
              <template slot-scope="scope">
                <div class="row">
                  <el-input v-model="scope.row.orgName"
                            maxlength="15"
                            show-word-limit
                            class="w240"
                            placeholder="输入职务名称"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column slot="contactPerson"
                             label="联络人"
                             width="144">
              <template slot-scope="scope">
                <div class="row">
                  <el-input v-model="scope.row.contactPerson"
                            class="w120"
                            maxlength="5"
                            show-word-limit
                            placeholder="输入联络人"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column slot="tel"
                             label="联系电话"
                             width="352">
              <template slot-scope="scope">
                <div class="center-align">
                  <el-input v-model="scope.row.tel"
                            class="w240"
                            maxlength="13"
                            placeholder="输入联系电话"></el-input>
                  <div @click="addContact(scope)"
                       v-if="table.data.length === scope.$index + 1"
                       class="ml24">
                    <svg-icon icon="icon_tianjia"
                              class="ft16 primary-color pointer"></svg-icon>
                  </div>
                  <div @click="deleteContact(scope)"
                       v-if="table.data.length > 1"
                       :class="table.data.length === scope.$index + 1?'ml32':'ml24'">
                    <svg-icon icon="icon_jianshao"
                              class="ft16 primary-color pointer"></svg-icon>
                  </div>
                </div>
              </template>
            </el-table-column>
          </page-table>
        </div>
      </div>
    </el-form>
    <page-handle :confirmText="$route.query.id ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import OrgStructure from './OrgStructure.vue'
import { unionContact } from '@u/enum.js'
import PageTable from '@c/PageTable'
export default {
  name: 'Form',
  methods: {
    // 组织架构
    changeOrgStructure () {
      this.$refs.orgStructure.findOrganizationTreeByOrgId(this.form.data.orgId)
      this.form.data.orgId && (this.isShowOrgStructure = true)
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleParams()
        }
      })
    },
    // 处理参数
    handleParams () {
      const addressBookList = this.table.data
      const { orgName, contactPerson, tel } = addressBookList[0]
      const temLength = (this.$isEmpty(orgName) && this.$isEmpty(contactPerson) && this.$isEmpty(tel)) ? 0 : addressBookList.length
      for (var i = 0; i < temLength; i++) {
        const { orgName, contactPerson, tel } = addressBookList[i]
        if (this.$isEmpty(orgName) || this.$isEmpty(contactPerson) || this.$isEmpty(tel)) {
          return this.$message.warning('请填写完整联络人信息')
        }
      }
      this.$route.query.id ? this.modifyJourneyAlliance(temLength > 0 ? addressBookList : []) : this.createJourneyAlliance(temLength > 0 ? addressBookList : [])
    },
    // 新增联盟
    createJourneyAlliance (addressBookList) {
      const params = {
        ...this.form.data,
        addressBookList: addressBookList
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.createJourneyAlliance(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增联盟成功')
        this.$router.back()
      })
    },
    // 编辑联盟
    modifyJourneyAlliance () {
      const params = {
        ...this.form.data,
        addressBookList: this.table.data
      }
      delete params.journeyLineName
      delete params.regionsName
      this.$api.modifyJourneyAlliance(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑联盟成功')
        this.$router.back()
      })
    },
    // 根据id获取联盟信息
    getJourneyAllianceById (id) {
      this.$api.getJourneyAllianceById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.form.data = res?.content ?? {}
        this.table.data = res?.content?.addressBookList ?? []
        this.changeOrgStructure()
        if (this.$isEmpty(this.table.data)) {
          this.table.data = [
            {
              contactPerson: '',
              orgName: '',
              tel: ''
            }
          ]
        }
      })
    },
    // 获取联盟组织列表
    findOrganizationList () {
      this.$api.findOrganizationList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.orgOptions = res?.content ?? []
      })
    },
    // 获取行政区域列表
    getJourneyRegionsList () {
      this.$api.getJourneyRegionsList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.regionsOptions = res?.content ?? []
      })
    },
    // 获取线路列表
    getJourneyLineList () {
      this.$api.getJourneyLineList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.journeyLineOptions = res?.content ?? []
      })
    },
    // 添加联络人
    addContact () {
      const contact = { orgName: '', contactPerson: '', tel: '' }
      this.table.data.push(contact)
      const main = document.getElementsByClassName('app-main')[0]
      this.$nextTick(() => {
        main.scrollTop = main.scrollHeight
      })
    },
    // 删除联络人
    deleteContact (row) {
      this.table.data.splice(row.$index, 1)
    }
  },
  data () {
    return {
      orgOptions: [],
      regionsOptions: [],
      journeyLineOptions: [],
      isShowOrgStructure: false,
      form: {
        rules: {
          orgId: [
            { required: true, message: '请选择联盟名称', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入介绍文字', trigger: 'blur' }
          ],
          regionsCode: [
            { required: true, message: '请选择行政区域', trigger: 'change' }
          ],
          journeyLineId: [
            { required: true, message: '请选择路线', trigger: 'change' }
          ]
        },
        data: {
          orgId: '',
          abbreviation: '',
          introduction: '',
          regionsCode: '',
          journeyLineId: ''
        }
      },
      table: {
        data: [{ orgName: '', contactPerson: '', tel: '' }],
        colConfig: unionContact
      }
    }
  },
  components: {
    pageHandle, OrgStructure, PageTable
  },
  created () {
    this.findOrganizationList()
    this.getJourneyRegionsList()
    this.getJourneyLineList()
    this.$route.query.id && this.getJourneyAllianceById(this.$route.query.id)
  }
}
</script>

<style lang='scss' scoped>
.ml80 {
  margin-left: 80px;
}
.w900 {
  width: 900px !important;
  margin: 32px auto 0;
}
.w690 {
  width: 690px !important;
}
.b-border {
  border-bottom: 1px solid #eee;
}
.ml-10 {
  margin-left: -12px;
}
/deep/.from-input .el-input__inner {
  padding: 0 48px 0 8px !important;
}
</style>
