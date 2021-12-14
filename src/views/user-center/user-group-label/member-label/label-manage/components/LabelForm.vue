<template>
  <div class='form-wrap'>
    <el-form ref="form"
             class="form"
             :rules="rules"
             label-position="left"
             :model="form"
             label-width="90px">
      <el-form-item label="标签名称"
                    prop="name">
        <el-input type="text"
                  show-word-limit
                  maxlength="10"
                  placeholder="输入名称，不超过10个字"
                  v-model="form.name"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="标签组"
                    prop="memberLabelGroupId">
        <el-select placeholder="选择标签组"
                   :disabled="memberLabelGroup.length === 0"
                   v-model="form.memberLabelGroupId"
                   class="w240 mr8">
          <el-option :label="item.name"
                     :value="item.id"
                     v-for="item in memberLabelGroup"
                     :key="item.id"></el-option>
        </el-select>
        <span v-if="memberLabelGroup.length === 0 && isMasterOrg"
              class="color-666">
          暂无标签组，请前往标签组管理进行
          <span class="primary-color pointer"
                @click="goLabelGroupManage">新增</span></span>
        <span v-if="memberLabelGroup.length === 0 && !isMasterOrg"
              class="color-666">暂无标签组，请联系上级组织进行新增</span>
      </el-form-item>

      <el-form-item label="是否公开"
                    required>
        <el-radio-group v-model="form.isPublic">
          <el-radio :label="true">公开</el-radio>
          <el-radio :label="false">不公开</el-radio>
        </el-radio-group>
        <p class="ft12 color-999 line-h20">（如对某个会员打上此标签，其他融合组织也可看到该会员身上有此标签信息）</p>
      </el-form-item>
      <el-form-item label="打标签方式"
                    required>
        <el-radio-group v-model="form.isAutomatic">
          <el-radio :label="false">手动打</el-radio>
          <el-radio :label="true">自动打</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="计算维度"
                    v-show="form.isAutomatic"
                    required>
        <el-radio-group v-model="form.setLabelRange">
          <el-radio label="01">按消费行为</el-radio>
          <el-radio label="03">按会员特征</el-radio>
          <el-radio label="05">按卡券领用</el-radio>
        </el-radio-group>
        <div class="content mt8">
          <consuming-behavior v-show="form.setLabelRange === '01'"
                              ref="consumingBehavior"></consuming-behavior>
          <member-characteristics v-show="form.setLabelRange === '03'"
                                  ref="memberCharacteristics"></member-characteristics>
          <card-use v-show="form.setLabelRange === '05'"
                    ref="cardUse">
          </card-use>
        </div>
        <div class="mt16"
             v-show="form.isAutomatic">
          <el-form-item label="开始计算日期"
                        label-width="140px"
                        prop="startDate">
            <el-date-picker v-model="form.startDate"
                            type="date"
                            :picker-options="fixedDateOptions"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否动态打标签"
                        label-width="140px"
                        required>
            <el-radio-group v-model="form.isDynamic">
              <el-radio :label="true">动态</el-radio>
              <el-radio :label="false">非动态</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="form.isDynamic"
                        label="动态重算日期设置"
                        label-width="140px"
                        prop="dynamicDate.memberLabelDynamicType">
            <div class="row">
              <el-select placeholder="请选择"
                         v-model="form.dynamicDate.memberLabelDynamicType"
                         class="w96 mr16">
                <el-option v-for="item in dynamicTypeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
              <div v-show="form.dynamicDate.memberLabelDynamicType === '01'">
                <el-select placeholder="选择日期"
                           v-model="form.dynamicDate.dynamicCycle"
                           style="width: 96px"
                           class="w96 mr16">
                  <el-option v-for="item in thirtyDays"
                             :key="item"
                             :label="item"
                             :value="item"></el-option>
                </el-select>
              </div>
              <div v-show="form.dynamicDate.memberLabelDynamicType === '02'">
                <el-radio-group v-model="form.dynamicDate.dynamicCycle">
                  <el-radio v-for="item in weekly"
                            :label="item.value"
                            :key="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </div>
              <div v-show="form.dynamicDate.memberLabelDynamicType === '03'">
                <span>每</span>
                <el-input-number v-model="form.dynamicDate.dynamicCycle"
                                 :controls="false"
                                 :min="1"
                                 class="w80 ml8 mr8"
                                 placeholder="输入数量"></el-input-number>
                <span>天</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label=""
                        label-width="140px">
            <p class="color-999 line-h20">(每个重算日期的0点开始计算，数据可能会有延迟)</p>
          </el-form-item>
        </div>
      </el-form-item>
    </el-form>
    <page-handle :config="pageHandleConfig"
                 @onConfirm="confirmClick">
    </page-handle>
  </div>
</template>

<script>
import { getGlobalParams } from '@/utils/login'
import memberCharacteristics from './MemberCharacteristics'
import consumingBehavior from './ConsumingBehavior'
import CardUse from './CardUse'
import { getLabelParams, setLabelParams } from '../expand/paramsCompile'
import { startDateValidate, memberLabelDynamicTypeValidate } from '../expand/validate'
import pageHandle from '@c/PageHandle.vue'

export default {
  name: 'SetCard',
  methods: {
    goLabelGroupManage () {
      if (!this.isMasterOrg) return
      this.$router.push({ name: 'labelGroupManage' })
    },
    confirmClick () {
      this.$refs.form.validate((valid) => {
        if (!valid) return
        let childForm = null
        switch (this.form.setLabelRange) {
          case '01':
            childForm = 'consumingBehavior'
            break
          case '03':
            childForm = 'memberCharacteristics'
            break
          case '05':
            childForm = 'cardUse'
            break
        }
        this.$refs[childForm].$refs.form.validate((valid) => {
          if (!valid) return
          const params = getLabelParams(this)
          if (this.form.isAutomatic && (!params.ruleList || params.ruleList.length === 0)) return this.$message('请选择一条自动打签规则')
          let reqApi = null
          if (this.isEdit) {
            reqApi = 'modifyMemberLabel'
            params.id = this.id
          } else {
            reqApi = 'createMemberLabel'
          }
          this.$api[reqApi](params).then(res => {
            if (res.isError) return this.$message.error(res.message)
            this.$message.success(this.isEdit ? '修改标签成功' : '新增标签成功')
            this.$router.back()
          })
        })
      })
    },
    // 获取详情
    getMemberLabelById () {
      this.$api.getMemberLabelById({ id: this.id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        setLabelParams(this, res.content)
      })
    },
    // 获取标签组列表
    getLabelGroupList () {
      this.$api.getMemberLabelGroupListByOrgId().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.memberLabelGroup = res.content
      })
    }
  },
  data () {
    const startDateVal = (rule, value, callback) => {
      startDateValidate(this, { rule, value, callback })
    }
    const memberLabelDynamicTypeVal = (rule, value, callback) => {
      memberLabelDynamicTypeValidate(this, { rule, value, callback })
    }
    return {
      id: null,
      isEdit: false,
      isDataEcho: false,
      form: {
        name: '',
        memberLabelGroupId: null,
        isPublic: true,
        isAutomatic: false,
        setLabelRange: '01',
        startDate: '',
        isDynamic: false,
        dynamicDate: {
          dynamicCycle: '',
          memberLabelDynamicType: ''
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { required: true, message: '最多 10 个字', max: 10, trigger: 'change' }
        ],
        memberLabelGroupId: [
          { required: true, message: '请选择标签组', trigger: ['change', 'blur'] }
        ],
        startDate: [
          { required: true, message: '请选择日期', trigger: ['change', 'blur'], validator: startDateVal }
        ],
        'dynamicDate.memberLabelDynamicType': [
          { required: true, message: '请选择', trigger: ['change', 'blur'], validator: memberLabelDynamicTypeVal }
        ]
      },
      memberLabelGroup: [],
      dynamicTypeList: [{ label: '每月', value: '01' }, { label: '每周', value: '02' }, { label: '每多少天', value: '03' }],
      thirtyDays: Array.from({ length: 28 }, (v, k) => k + 1),
      weekly: [{ label: '周一', value: 1 }, { label: '周二', value: 2 }, { label: '周三', value: 3 }, { label: '周四', value: 4 }, { label: '周五', value: 5 }, { label: '周六', value: 6 }, { label: '周日', value: 7 }],
      fixedDateOptions: {
        disabledDate (time) {
          return time.getTime() < new Date().getTime()
        }
      }
    }
  },
  watch: {
    'form.dynamicDate.memberLabelDynamicType': {
      deep: true,
      handler () {
        if (this.isDataEcho) {
          this.isDataEcho = false
          return
        }
        this.form.dynamicDate.dynamicCycle = null
      }
    }
  },
  computed: {
    pageHandleConfig () {
      return {
        isEdit: this.isEdit,
        btns: [
          {
            text: this.isEdit ? '保存' : '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      }
    },
    isMasterOrg () {
      return getGlobalParams('masterOrgId') === getGlobalParams('orgId')
    },
    haveEditOrAddPermission () {
      return this.isEdit ? this.$hasAuth(this.$urls.modifyMemberLabel) : this.$hasAuth(this.$urls.createMemberLabel)
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.isEdit = true
      this.getMemberLabelById()
    }
    this.getLabelGroupList()
  },
  components: { memberCharacteristics, consumingBehavior, CardUse, pageHandle }
}
</script>

<style lang='scss' scoped>
.line-h20 {
  line-height: 20px;
}
.form-wrap {
  margin-top: 60px;
  .form {
    padding-left: 15%;
    .content {
      border: 1px solid $color-de;
      width: 778px;
      box-sizing: border-box;
      min-height: 376px;
      padding: 16px 26px 22px;
      border-radius: 0 6px 6px;
    }
    .w96 {
      width: 96px;
    }
  }
}
</style>
