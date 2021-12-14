<template>
  <page :title="pageTitle">
    <el-form class="base-info mt24"
             :rules="rules"
             :model="formData"
             label-width="120px"
             label-position="left"
             ref="formData">
      <el-form-item label="微心愿名称"
                    prop="name">
        <el-input v-model="formData.name"
                  class="w380"
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入微心愿标题"></el-input>
      </el-form-item>
      <el-form-item label="简介"
                    prop="introduction">
        <el-input v-model="formData.introduction"
                  class="w690"
                  type="textarea"
                  rows="5"
                  maxlength="500"
                  show-word-limit
                  placeholder="输入简介内容，不超过500个字"></el-input>
      </el-form-item>
      <el-form-item label="发布单位"
                    required
                    class="org-name form-pl">
        <div>{{orgName}}</div>
      </el-form-item>
      <el-form-item label="联系电话"
                    prop="phone">
        <el-input v-model="formData.phone"
                  class="w240"
                  placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="地点"
                    required>
        <el-radio-group v-model="radio">
          <div class="mt8">
            <el-radio label="01">无</el-radio>
          </div>
          <div class="mt16">
            <el-radio label="02">具体地点
              <el-input v-model="formData.address"
                        v-if="radio === '02'"
                        class="w240"
                        placeholder="请输入地点"></el-input>
            </el-radio>
          </div>

        </el-radio-group>
      </el-form-item>

      <el-form-item label="认领截止时间"
                    prop="endTime">
        <el-date-picker v-model="formData.endTime"
                        class="w240"
                        :picker-options="pickerOptions0"
                        prefix-icon="el-icon-date"
                        value-format="timestamp"
                        type="datetime"
                        placeholder="选择时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>

<script>
import PageHandle from '@c/PageHandle'
import { regular } from '@/utils/validate.js'

export default {
  name: 'AddEdit',
  methods: {
    onSure () { // 保存、确定按钮
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    // 保存、确定接口
    save () {
      const params = this.formData
      if (this.radio === '01') params.address = '无'
      this.$deleteObjectEmptyAttr(params)
      const apiName = this.$route.query.id ? 'modifyJourneyCommunityWish' : 'createJourneyCommunityWish'
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
    },
    // 保存、确定接口
    getJourneyCommunityWish () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyCommunityWish(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.formData = res.content
        if (this.formData.address === '无') {
          this.radio = '01'
          this.formData.address = ''
        }
      })
    }
  },
  data () {
    return {
      radio: '02',
      pageTitle: '新增心愿单',
      formData: {
        address: '',
        phone: ''
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入微心愿名称', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: regular.phone, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择截止时间', trigger: 'change' }
        ]
      },
      pageHandleConfig: {
        btns: [
          {
            text: '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ],
        backRouteName: this.$route.query.id ? '' : ''
      }
    }
  },
  computed: {
    orgName () {
      return this.formData.communityOrgName || localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
    }
  },
  created () {
    if (this.$route.query.id) {
      this.pageTitle = '编辑心愿单'
      this.$route.meta.title = '编辑心愿单'
      this.getJourneyCommunityWish()
    }
  },
  components: { PageHandle }
}
</script>

<style lang='scss' scoped>
.mb2 {
  margin-bottom: 2px;
}
.w380 {
  width: 380px;
}
.w690 {
  width: 690px;
}
.ml176 {
  margin-left: 176px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.base-info {
  margin-left: 70px;
  /deep/ .el-form-item__error {
    padding-top: 0px;
  }
}
</style>
