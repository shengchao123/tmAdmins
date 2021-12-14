<template>
  <div class="customer-info-wrap">
    <!-- <p class="details-info-title bold ml64"><span><a></a>填写客群信息</span></p> -->
    <el-form :model="formData"
             ref="formData"
             label-width="76px"
             :rules="rules"
             label-position="left"
             class="ml106 mt24 form">
      <el-form-item label="客群名称"
                    prop="name">
        <el-input v-model="formData.name"
                  class="w240"
                  maxlength="10"
                  show-word-limit
                  placeholder="输入名称，不超过10个字">
        </el-input>
      </el-form-item>
      <el-form-item label="客群描述"
                    class="pl12">
        <el-input v-model="formData.description"
                  class="w400 ml-12"
                  maxlength="150"
                  show-word-limit
                  :rows="6"
                  type="textarea"></el-input>
      </el-form-item>
      <!-- <el-form-item style="margin-bottom: 0px !important"
                    label="关键词"
                    class="pl12">
        <div v-for="(item,index) in formData.keywords"
             :key="item.id">
          <el-input v-model="item.keyword"
                    class="w240 ml-10 mb16">
          </el-input>
          <span v-show="index === formData.keywords.length - 1 "
                @click="onAddTimeKeywordItem">
            <svg-icon class="ft16 ml24 primary-color pointer"
                      icon="icon_tianjia">
            </svg-icon>
          </span>
          <span v-show="formData.keywords.length !== 1"
                @click="onDelTimeKeywordItem(item.id)">
            <svg-icon class="ft16 ml24 primary-color pointer"
                      icon="icon_jianshao">
            </svg-icon>
          </span>
        </div>
      </el-form-item> -->
      <!-- <el-form-item label="公开范围"
                    required>
        <div class="flex">
          <el-radio-group class="mr8"
                          v-model="formData.memberGroupPublicRange">
            <el-radio label="01">不公开</el-radio>
            <el-radio label="02">本组织内公开</el-radio>
            <el-radio label="03">融合体系内公开</el-radio>
            <el-radio label="04">自定义</el-radio>
          </el-radio-group>
          <el-form-item style="margin-bottom: 0 !important"
                        label=""
                        prop="customizeOrgIds">
            <el-cascader v-show="formData.memberGroupPublicRange === '04'"
                         v-model="formData.customizeOrgIds"
                         :show-all-levels='false'
                         collapse-tags
                         :options="organizationTree"
                         :props="cascaderProps"
                         placeholder="选择组织">
            </el-cascader>
          </el-form-item>
        </div>
      </el-form-item> -->
    </el-form>
    <!-- <page-handle @cancelClick="onCancel"
                 @confirmClick="onSure">
    </page-handle> -->
    <!-- <page-handle @onConfirm="onSure"
                 @onCancel="onCancel"
                 :config="{btns: [{ text: '确定',type: 'primary',event: 'onConfirm' },{ text: '取消', event: 'onCancel' }]}">
    </page-handle> -->
    <page-handle @onConfirm="onSure"
                 @onCancel="onCancel"
                 :config='pageHandleConfig'>
    </page-handle>
  </div>
</template>
<script>
import sameAttrToNewArrayObj from './index.js'
import PageHandle from '@/components/PageHandle.vue'

export default {
  name: 'CustomerInfo',
  methods: {
    // 初始化表单数据
    initFormData () {
      this.formData = {
        name: null,
        description: null
        // memberGroupPublicRange: '01',
        // customizeOrgIds: null
        // keywords: [
        //   {
        //     id: 1,
        //     keyword: null
        //   }
        // ]
      }
    },
    // // 添加关键词的input项
    // onAddTimeKeywordItem () {
    //   const lastItem = this.formData.keywords[this.formData.keywords.length - 1]
    //   const obj = { id: lastItem.id + 1, keyword: null }
    //   this.formData.keywords.push(obj)
    // },
    // // 删除关键词
    // onDelTimeKeywordItem (id) {
    //   const newKeywords = this.formData.keywords.filter(item => item.id !== id)
    //   this.formData.keywords = newKeywords
    // },
    onAction () {
      const memberLabelIds = []
      this.newLabelTagsList.forEach(el => {
        if (!this.$isEmpty(el.tagOptions)) {
          el.tagOptions.forEach(label => {
            memberLabelIds.push(label.id)
          })
        }
      })
      const { name, description } = this.formData
      const query = {
        name,
        description,
        memberLabelIds,
        id: this.detailInfo ? this.detailInfo.id : null,
        memberGroupRuleType: this.memberGroupRuleType
      }
      this.$deleteObjectEmptyAttr(query)
      const apiName = this.actionType === 'add' ? 'createMemberGroup' : 'modifyMemberGroup'
      const msgContent = this.actionType === 'add' ? '客群新增成功' : '客群编辑成功'
      this.$api[apiName](query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.$message.success(msgContent)
        this.$router.back()
        sessionStorage.removeItem('selectedLabelTags')
      })
    },
    // 点击确定回调
    onSure () {
      this.$emit('getValid')
    },
    onCancel () {
      const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags'))
      const isHaveTags = !this.$isEmpty(selectedLabelTags) // 是否有选择标签
      if (this.actionType === 'edit' || (!this.isChange && !isHaveTags)) {
        this.$router.back()
        sessionStorage.removeItem('selectedLabelTags') // 只有当点击确定或者取消时移出本地sessionStorage保存的标签列表
      } else {
        this.$confirm('取消新增后，所填写的信息将全部清除', '要“取消”新增客群？', {
          customClass: 'custom-msg-box msg-box-double',
          cancelButtonClass: 'msg-box-cancel',
          confirmButtonClass: 'msg-box-confirm',
          confirmButtonText: '继续填写',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          center: true,
          showClose: false
        }).then(() => {
        }).catch(() => {
          this.$router.back()
          sessionStorage.removeItem('selectedLabelTags') // 只有当点击确定或者取消时移出本地sessionStorage保存的标签列表
        })
      }
    }
  },
  props: {
    p1: Promise,
    detailInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    labelTagsList: {
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
  data () {
    const checkCustomerName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写客群名称'))
      } else {
        const query = {
          name: this.formData.name,
          memberGroupId: this.actionType === 'add' ? null : this.detailInfo.id
        }
        this.$deleteObjectEmptyAttr(query)
        this.$api.verificationMemberGroupName(query).then(res => {
          if (res.content.hasRepeat) {
            callback(new Error('该客群名称已存在，请重新填写'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      actionType: this.$route.query.type,
      sameAttrToNewArrayObj,
      formData: {
        name: null,
        description: null
      },
      rules: {
        name: [
          { required: true, validator: checkCustomerName, trigger: 'blur' }
        ]
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        multiple: true,
        emitPath: false
      },
      newLabelTagsList: []
    }
  },
  watch: {
    detailInfo (val) {
      const newVal = JSON.parse(JSON.stringify(val))
      this.formData = newVal
    },
    labelTagsList (val) {
      this.newLabelTagsList = val
    }
  },
  activated () {
    // 更新sessionStorage的数据
    this.$nextTick(() => {
      const that = this
      const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags')) || []
      that.newLabelTagsList = that.sameAttrToNewArrayObj(selectedLabelTags)
    })
  },
  created () {
    // 添加完后需要获取sessionStorage的标签
    const selectedLabelTags = JSON.parse(sessionStorage.getItem('selectedLabelTags')) || []
    this.newLabelTagsList = this.sameAttrToNewArrayObj(selectedLabelTags)
  },

  computed: {
    organizationTree () {
      return this.$store.state.app.orgs
    },
    isChange () {
      const formData = this.formData
      if (!this.$isEmpty(formData.name)) return true
      if (!this.$isEmpty(formData.description)) return true
      return false
    },
    pageHandleConfig () {
      return {
        isEdit: this.actionType === 'edit',
        // backRouteName: !this.$isEmpty(this.pageType) ? 'ActivityMarket' : '',
        backConfirm: this.isChange && this.actionType === 'add',
        backConfirmText: '要“取消”新增客群？',
        btns: [
          {
            text: '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'onCancel'
          }
        ]
      }
    }
  },
  components: {
    PageHandle
  }
}
</script>

<style lang='scss' scoped>
.ml64 {
  margin-left: 64px;
}
.ml106 {
  margin-left: 106px;
}
.w400 {
  width: 400px;
}
.ml-12 {
  margin-left: -12px;
}
.customer-info-wrap {
  margin-top: 60px;
  .form {
    /deep/ .el-textarea {
      height: 100%;
      .el-input__count {
        bottom: 1px;
      }
    }
    /deep/ .el-radio {
      line-height: 32px;
    }
  }
}
</style>
