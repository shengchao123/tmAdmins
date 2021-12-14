<template>
  <page title="行程单详情"
        needPadding>
    <div class="wrap relative">
      <el-form ref="form"
               :rules="form.rules"
               :model="form.data"
               class="mt24 form "
               label-position="left">
        <el-form-item class="ml12">
          <span class="i-block label"
                slot="label">标题：</span>
          <div class="bold">临安区机关党员参与城市基层治理工作（城市党建日）统计表</div>
        </el-form-item>
        <el-form-item class="ml12">
          <span class="i-block label"
                slot="label">单位：</span>
          <div>{{currentOrgInfo.name}}</div>
        </el-form-item>
        <el-form-item class="ml12">
          <span class="i-block label"
                slot="label">共建社区：</span>
          <div>{{detailInfo.communityOrgName}}</div>
        </el-form-item>
        <el-form-item prop="preparer">
          <span class="i-block label"
                slot="label">填表人</span>
          <el-input v-model.trim="form.data.preparer"
                    class="w240"
                    maxlength="10"
                    show-word-limit
                    placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item prop="contactNumber">
          <span class="i-block label"
                slot="label">联系电话</span>
          <el-input v-model.trim="form.data.contactNumber"
                    class="w240"
                    placeholder="输入联系电话"></el-input>
        </el-form-item>
        <el-form-item prop="activityNum">
          <span slot="label">
            <span>累计主办“城市党建日”次数</span>
            <span class="color-999 ft12">（要求每个单位至少主办一次）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.activityNum"
                      class="w240"
                      type="number"
                      placeholder="输入次数"></el-input>
          </div>

        </el-form-item>
        <el-form-item prop="officePartyNum">
          <span slot="label">
            <span>机关党员数</span>
            <span class="color-999 ft12">（机关党组织党员为主体，不含退休、基层站所党组织党员等）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.officePartyNum"
                      class="w240"
                      type="number"
                      placeholder="输入人数"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="residentPartyNum">
          <span slot="label">
            <span>城区居住党员数</span>
            <span class="color-999 ft12">（城区概念为36个社区）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.residentPartyNum"
                      class="w240"
                      type="number"
                      placeholder="输入人数"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="activityContent">
          <span slot="label">
            <span>当月“城市党建日”活动内容</span>
            <span class="color-999 ft12">（含会议/活动/领办问题等）</span>
          </span>
          <div class="ml8">
            <el-input v-model.trim="form.data.activityContent"
                      class="w690"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 20}"
                      maxlength="200"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="receiveProblemNum">
          <span slot="label">
            <span>今年至今累计领办问题数</span>
            <span class="color-999 ft12">（指具体的问题、难题，参与常态化的共建活动不算在内）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.receiveProblemNum"
                      class="w240"
                      type="number"
                      placeholder="输入件数"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="solveProblemNum">
          <span slot="label">
            <span>解决问题数</span>
            <span class="color-999 ft12">（指具体的问题、难题，参与常态化的共建活动不算在内）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.solveProblemNum"
                      class="w240"
                      type="number"
                      placeholder="输入件数"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="handlingInstructions">
          <span slot="label">
            <span>主要领办问题及当前办理情况</span>
            <span class="color-999 ft12">（具体表述问题）</span>
          </span>
          <div class="ml8">
            <el-input v-model.trim="form.data.handlingInstructions"
                      class="w690"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 20}"
                      maxlength="200"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
        </el-form-item>

        <el-form-item required>
          <span slot="label">
            <span>今年至今累计到共建社区线下报到参与活动党员总人数</span>
            <span class="color-999 ft12">（非人次，疫情值守可算在内）</span>
          </span>
          <br />
          <div class="ml8 row">
            <el-form-item prop="joinActiityTotalPartyNum">
              <el-input v-model.trim="form.data.joinActiityTotalPartyNum"
                        class="w120"
                        type="number"
                        placeholder="输入人数"></el-input>
            </el-form-item>
            <span class="ml8 mr8">人，占比（D栏）：{{joinPer || '--'}}</span>
          </div>
        </el-form-item>

        <el-form-item required>
          <span slot="label">
            <span>今年至今累计到共建社区线下报到服务机关党员总人数</span>
            <span class="color-999 ft12">（非人次，疫情值守可算在内）</span>

          </span>
          <br />
          <div class="ml8 row">
            <el-form-item prop="serviceOfficeTotalPartyNum">
              <el-input v-model.trim="form.data.serviceOfficeTotalPartyNum"
                        class="w120"
                        type="number"
                        placeholder="输入人数"></el-input>
            </el-form-item>
            <span class="ml8 mr8">人，占比（E栏）：{{partyPer || '--'}}</span>
          </div>
        </el-form-item>

        <el-form-item prop="employmentPartyNum"
                      required>
          <span slot="label">
            <span>已担任“临里红管家”、业委会、楼栋长党员数</span>
            <span class="color-999 ft12">（含退休、下属单位党组织等）</span>
            <div class="color-999 ft12 ml8">以居住地社区为准，随共建单位进入党建联盟的不计入，因包含退休，所以O栏数有可能大于D栏数</div>
          </span>
          <div class="ml8">
            <el-input v-model.trim="form.data.employmentPartyNum"
                      class="w240"
                      type="number"
                      placeholder="输入人数"></el-input>
          </div>
        </el-form-item>

        <el-form-item prop="officeWorkPartyNum"
                      required>
          <span slot="label">
            <span>机关在职党员数</span>
            <span class="color-999 ft12">（P栏数不可能大于E栏数）</span>
          </span>
          <br />
          <div class="ml8">
            <el-input v-model.trim="form.data.officeWorkPartyNum"
                      class="w240"
                      type="number"
                      placeholder="输入人数"></el-input>
          </div>
        </el-form-item>

        <div class="mt48 ml8">
          <div class="bold">进社区报到服务、“点亮微心愿”等活动开展情况</div>
          <div class=" mt16">
            <span class="mr8">时间地点</span>
            <el-input v-model.trim="form.data.activityTimePlace"
                      style="width:360px"
                      class="limit"
                      maxlength="30"
                      show-word-limit
                      placeholder="输入姓名"></el-input>
          </div>
          <div class=" mt16">
            <span class="mr8">具体活动</span>
            <span class="color-999">(活动内容请尽量写详细，择优进行宣传)</span>
          </div>
          <div class=" mt16">
            <el-input v-model.trim="form.data.activityIntroduction"
                      class="w690"
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 20}"
                      maxlength="200"
                      show-word-limit
                      placeholder="输入内容"></el-input>
          </div>
        </div>

      </el-form>

    </div>
    <page-handle @onConfirm="confirmHandle"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import { checkInput } from '@u/validate'
export default {

  methods: {
    // 保存、确定按钮
    confirmHandle () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.modifyJourneyCoConstructionUnitPartyStatistics()
        }
      })
    },
    modifyJourneyCoConstructionUnitPartyStatistics () {
      const params = {
        ...this.form.data,
        id: this.detailInfo.id
      }
      this.$api.modifyJourneyCoConstructionUnitPartyStatistics(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
        this.$bus.$emit('delTagView')
        this.$router.back()
      })
    }

  },

  data () {
    const contactRule = (rule, value, callback) => {
      const { contactNumber } = this.form.data
      if (!checkInput(contactNumber, 'phone') && !checkInput(contactNumber, 'tel')) return callback(new Error('请输入正确联系方式'))
      callback()
    }
    return {
      detailInfo: {},
      regionsCodeOptions: [],
      form: {
        data: {
          activityNum: ''
        },
        rules: {
          preparer: [
            { required: true, message: '请填写填表人', trigger: 'blur' }
          ],
          contactNumber: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { required: true, validator: contactRule, trigger: 'blur' }
          ],
          activityNum: [
            { required: true, message: '请填写举办次数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          officePartyNum: [
            { required: true, message: '请填写党员数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          residentPartyNum: [
            { required: true, message: '请填写党员数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          receiveProblemNum: [
            { required: true, message: '请输入问题数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          solveProblemNum: [
            { required: true, message: '请填写解决问题数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          joinActiityTotalPartyNum: [
            { required: true, message: '请填写人数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          serviceOfficeTotalPartyNum: [
            { required: true, message: '请填写人数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          employmentPartyNum: [
            { required: true, message: '请填写人数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          officeWorkPartyNum: [
            { required: true, message: '请填写人数', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能输入数字', trigger: 'blur' }
          ],
          activityContent: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          handlingInstructions: [
            { required: true, message: '请输入情况', trigger: 'blur' }
          ]
        }
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
        ]
      },
      addIndex: null
    }
  },
  created () {
    this.detailInfo = this.$route.params || {}
    if (this.detailInfo.preparer) this.form.data = { ...this.detailInfo }
  },
  computed: {
    currentOrgInfo () {
      return this.$store.state.app.currentOrgInfo
    },
    joinPer () {
      const { officePartyNum, joinActiityTotalPartyNum } = this.form.data
      if ((!officePartyNum && officePartyNum !== 0) || (!joinActiityTotalPartyNum && joinActiityTotalPartyNum !== 0)) return '--'
      const per = (joinActiityTotalPartyNum / officePartyNum).toFixed(2) * 100
      return per + '%'
    },
    partyPer () {
      const { residentPartyNum, serviceOfficeTotalPartyNum } = this.form.data
      if ((!residentPartyNum && serviceOfficeTotalPartyNum !== 0) || (!serviceOfficeTotalPartyNum && serviceOfficeTotalPartyNum !== 0)) return '--'
      const per = (serviceOfficeTotalPartyNum / residentPartyNum).toFixed(2) * 100
      return per + '%'
    }
  },
  components: { PageHandle }
}
</script>
<style lang="scss" scoped>
.w690 {
  width: 690px;
}
/deep/ .el-form-item__error {
  padding-left: 10px;
}
.wrap {
  max-width: 1300px;
  padding-top: 60px;
  display: flex;
  justify-content: flex-end;
  .form {
    padding-bottom: 80px;
    .label {
      width: 70px;
    }
  }
  .line {
    position: absolute;
    height: 1px;
    background: #eeeeee;
    left: 120px;
    right: 0;
    bottom: 316px;
  }
}
</style>
