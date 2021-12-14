<template>
  <div class="container mt60">
    <el-form ref="form"
             class="form"
             :rules="form.rules"
             :model="form.data"
             label-width="80px"
             label-position="left">
      <div class="form-box pb16">
        <div class="info-title ml12 mb24">职位信息</div>
        <div class="ml90">
          <el-form-item label="职位姓名"
                        prop="name">
            <el-input class="w240"
                      v-model="form.data.name"
                      maxlength="12"
                      show-word-limit
                      placeholder="输入职位姓名"></el-input>
          </el-form-item>
          <el-form-item label="经验"
                        prop="workExperience">
            <el-select class="w240"
                       v-model="form.data.workExperience"
                       placeholder="不限">
              <el-option v-for="item in workExperienceOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历"
                        prop="education">
            <el-select class="w240"
                       v-model="form.data.education"
                       placeholder="不限">
              <el-option v-for="item in educationOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资待遇"
                        prop="isNegotiableSalary"
                        required>
            <div class="center-align">
              <el-radio-group v-model="form.data.isNegotiableSalary"
                              @change="changeRadio">
                <el-radio class="lineh32"
                          :label="true">面议</el-radio>
                <el-radio class="lineh32"
                          :label="false">自定义</el-radio>
              </el-radio-group>
              <div class="ml16"
                   v-if="!form.data.isNegotiableSalary">
                <el-form-item style="margin-bottom: 0px !important"
                              prop="annualSalary">
                  <el-input-number class="w120"
                                   v-model="form.data.annualSalary"
                                   :controls="false"
                                   placeholder="输入年薪收入">
                  </el-input-number>
                  <span class="color-333 ft14 ml8">万/年</span>
                </el-form-item>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="发布单位"
                        prop="publishingDepartment">
            <el-input class="w240"
                      v-model="form.data.publishingDepartment"
                      maxlength="20"
                      show-word-limit
                      placeholder="输入发布单位"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-box pb16 mt32">
        <div class="info-title ml12 mb24">联系信息</div>
        <div class="ml90">
          <el-form-item label="单位名称"
                        prop="companyName">
            <el-input class="w240"
                      v-model="form.data.companyName"
                      maxlength="30"
                      show-word-limit
                      placeholder="输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="上班地址"
                        prop="workAddress">
            <el-input class="w360"
                      v-model="form.data.workAddress"
                      type="textarea"
                      :rows="2"
                      maxlength="50"
                      show-word-limit
                      placeholder="输入上班地址"></el-input>
          </el-form-item>
          <el-form-item label="联系人"
                        prop="contactPerson">
            <el-input class="w240"
                      v-model="form.data.contactPerson"
                      maxlength="10"
                      show-word-limit
                      placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        prop="contactPhone">
            <el-input class="w240"
                      v-model="form.data.contactPhone"
                      placeholder="支持固话和手机号码"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱"
                        prop="contactEmail"
                        class="ml12">
            <el-input class="w240 ml-12"
                      v-model="form.data.contactEmail"
                      maxlength="20"
                      show-word-limit
                      placeholder="输入电子邮箱"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-box pb16 mt32">
        <div class="info-title ml12 mb24">职位描述</div>
        <div class="ml90">
          <el-form-item label="职位职责"
                        prop="responsibilities"
                        class="ml12">
            <el-input class="w690 ml-12"
                      v-model="form.data.responsibilities"
                      type="textarea"
                      :rows="5"
                      maxlength="200"
                      show-word-limit
                      placeholder="比如：
1、执行公司的运营战略、流程与计划；
2、组织协调公司运营各职能部门执行、实现景区的运营目标；
3、修订及执行公司战略规划及与日常运作相关的制度体系、业务流程；"></el-input>
          </el-form-item>
          <el-form-item label="任职资格"
                        prop="qualifications"
                        class="ml12">
            <el-input class="w690 ml-12"
                      v-model="form.data.qualifications"
                      type="textarea"
                      :rows="5"
                      maxlength="200"
                      show-word-limit
                      placeholder="比如：
1、工商管理、旅游管理、演艺管理等相关专业，大专以上学历；
2、两年以上相关工作经验；
3、具有较强的沟通协调能力；"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <page-handle :confirmText="$route.query.id ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import PageHandle from '@/components/PageHandle'
import { workExperienceOptions, educationOptions } from '@u/enum'
import { checkInput } from '@u/validate.js'
export default {
  name: 'FormInfo',
  methods: {
    changeRadio () {
      this.form.data.annualSalary = undefined
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { apiName, msg } = this.actionMap.get(!!this.$route.query.id)
          const formData = JSON.parse(JSON.stringify(this.form.data))
          if (formData.isNegotiableSalary) {
            formData.annualSalary = 0
          }
          const params = {
            id: this.$route.query.id,
            ...formData
          }
          this.$deleteObjectEmptyAttr(params)
          this.$api[apiName](params).then(res => {
            if (res.isError) {
              this.$message.error(res.message)
              return
            }
            this.$message.success(msg + '职位成功')
            this.$router.back()
          })
        }
      })
    },
    // 根据id获取职位详情
    getJourneyPostById (id) {
      this.$api.getJourneyPostById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const content = JSON.parse(JSON.stringify(res?.content ?? {}))
        this.form.data = content
      })
    }
  },
  props: {
    type: String
  },
  data () {
    const checkNoValue = (rule, value, callback) => {
      callback()
    }
    const checkAnnualSalary = (rule, value, callback) => {
      if (this.$isEmpty(value)) return callback(new Error('请输入年薪收入'))
      if (value <= 0) return callback(new Error('请输入大于0的数值'))
      if (value > 9999) return callback(new Error('限制4位数'))
      callback()
    }
    const checkContactPhone = (rule, value, callback) => {
      const { contactPhone } = this.form.data
      if (this.$isEmpty(contactPhone)) return callback(new Error('请输入联系电话'))
      if (!checkInput(contactPhone, 'phone') && !checkInput(value, 'tel')) {
        return callback(new Error('请输入正确的联系电话'))
      }
      callback()
    }
    // const checkContactEmail = (rule, value, callback) => {
    //   const { contactEmail } = this.form.data
    //   if (this.$isEmpty(contactEmail)) return callback(new Error('请输入电子邮箱'))
    //   if (!checkInput(contactEmail, 'email')) {
    //     return callback(new Error('请输入正确的电子邮箱'))
    //   }
    //   callback()
    // }
    return {
      workExperienceOptions,
      educationOptions,
      actionMap: Object.freeze(new Map([
        [true, { apiName: 'modifyJourneyPost', msg: '修改' }],
        [false, { apiName: 'createJourneyPost', msg: '新增' }]
      ])),
      form: {
        rules: Object.freeze({
          name: [
            { required: true, message: '请输入职位姓名', trigger: 'blur' }
          ],
          workExperience: [
            { required: true, validator: checkNoValue, trigger: 'blur' }
          ],
          education: [
            { required: true, validator: checkNoValue, trigger: 'blur' }
          ],
          annualSalary: [
            { required: true, validator: checkAnnualSalary, trigger: 'blur' }
          ],
          publishingDepartment: [
            { required: true, message: '请输入发布单位', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          workAddress: [
            { required: true, message: '请输入上班地址', trigger: 'blur' }
          ],
          contactPerson: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, validator: checkContactPhone, trigger: 'blur' }
          ]
          // contactEmail: [
          //   { required: true, validator: checkContactEmail, trigger: 'blur' }
          // ],
          // responsibilities: [
          //   { required: true, message: '请输入职位职责', trigger: 'blur' }
          // ],
          // qualifications: [
          //   { required: true, message: '请输入任职资格', trigger: 'blur' }
          // ]
        }),
        data: {
          name: '',
          workExperience: '01',
          education: '01',
          isNegotiableSalary: true,
          annualSalary: undefined,
          publishingDepartment: '',
          companyName: '',
          workAddress: '',
          contactPerson: '',
          contactPhone: undefined,
          contactEmail: '',
          responsibilities: '',
          qualifications: ''
        }
      }
    }
  },
  components: {
    PageHandle
  },
  created () {
    this.$route.query.id && this.getJourneyPostById(this.$route.query.id)
  }
}
</script>
<style lang='scss' scoped>
.lineh32 {
  line-height: 32px;
}
.ml90 {
  margin-left: 90px;
}
.w690 {
  width: 690px;
}
.w120 {
  width: 120px !important;
}
.w690 {
  width: 690px;
}
.w360 {
  width: 360px;
}
.ml-12 {
  margin-left: -12px;
}
.container {
  .form {
    margin: 0 40px;
    .form-box {
      border-bottom: 1px solid #eeeeee;
      padding-left: 348px;
      &:last-child {
        border: none;
      }
    }
    .introduction {
      /deep/ .el-textarea__inner {
        text-align: justify;
        text-align-last: left;
      }
    }
    .upload-img {
      /deep/ .upload-icon {
        color: #eee;
      }
    }
    .tips {
      position: absolute;
      left: 136px;
      top: 22px;
    }

    .select-time {
      margin-left: 64px;
    }
    /deep/ .el-input__inner {
      text-align: left;
    }
  }
}
</style>
