<template>
  <page title="行程单详情"
        needPadding>
    <div class="wrap relative">
      <el-form ref="form"
               class="mt24 form "
               label-position="left">
        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">标题：</div>
            <div>临安区机关党员参与城市基层治理工作（城市党建日）统计表</div>
          </div>
        </el-form-item>
        <el-form-item class="">
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">单位：</div>
            <div>{{currentOrgInfo.name}}</div>
          </div>
        </el-form-item>
        <el-form-item class="">
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">共建社区：</div>
            <div>{{getValue('communityOrgName')}}</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">填表人：</div>
            <div>{{getValue('preparer')}}</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">联系电话：</div>
            <div>{{getValue('contactNumber')}}</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999">累计主办“城市党建日”次数：</div>
            <div>{{getValue('activityNum')}}次</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">机关党员数：</div>
            <div>{{getValue('officePartyNum')}}人</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">城区居住党员数：</div>
            <div>{{getValue('residentPartyNum')}}人</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="color-999">当月“城市党建日”活动内容：</div>
          <div style="width:720px">{{getValue('activityContent')}}</div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">今年至今累计领办问题数：</div>
            <div>{{getValue('receiveProblemNum')}}件</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">解决问题数：</div>
            <div>{{getValue('solveProblemNum')}}件</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="color-999">主要领办问题及当前办理情况：</div>
          <div style="width:720px">{{getValue('handlingInstructions')}}</div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">今年至今累计到共建社区线下报到参与活动党员总人数：</div>
            <div>{{getValue('joinActiityTotalPartyNum')}}<span class="ml8 mr8">人，占比（D栏）：{{joinPer }}</span></div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">今年至今累计到共建社区线下报到服务机关党员总人数：</div>
            <div>{{getValue('serviceOfficeTotalPartyNum')}}<span class="ml8 mr8">人，占比（E栏）：{{joinPer }}</span></div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">已担任“临里红管家”、业委会、楼栋长党员数：</div>
            <div>{{getValue('employmentPartyNum')}}人</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="center-align">
            <div class="color-999"
                 style="min-width:120px">机关在职党员数：</div>
            <div>{{getValue('officeWorkPartyNum')}}人</div>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="mt32">
            <div class="bold">进社区报到服务、“点亮微心愿”等活动开展情况</div>

            <div class="center-align">
              <div class="color-999"
                   style="min-width:120px">时间地点：</div>
              <div>{{getValue('activityTimePlace') || '--'}}</div>
            </div>

            <div class="row">
              <div class="color-999"
                   style="min-width:120px">具体活动：</div>
              <div style="width:600px">{{getValue('activityIntroduction') || '--'}}</div>
            </div>

          </div>
        </el-form-item>

      </el-form>

    </div>
    <page-handle :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
export default {
  methods: {
    getValue (key) {
      return this.detailInfo[key]
    }
  },
  data () {
    return {
      detailInfo: {},
      pageHandleConfig: {
        btns: [
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      }
    }
  },
  created () {
    this.detailInfo = this.$route.params || {}
  },
  computed: {
    currentOrgInfo () {
      return this.$store.state.app.currentOrgInfo
    },
    joinPer () {
      const { officePartyNum, joinActiityTotalPartyNum } = this.detailInfo
      if ((!officePartyNum && officePartyNum !== 0) || (!joinActiityTotalPartyNum && joinActiityTotalPartyNum !== 0)) return '--'
      const per = (joinActiityTotalPartyNum / officePartyNum).toFixed(2) * 100
      return per + '%'
    },
    partyPer () {
      const { residentPartyNum, serviceOfficeTotalPartyNum } = this.detailInfo
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
    bottom: 216px;
  }
}
</style>
