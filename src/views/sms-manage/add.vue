<template>
  <page title="新增短信">
    <div>
      <img class="sms-img"
           src="/src/assets/sidebar/logo.png">
    </div>
    <div>
      <el-form ref="form"
               :model="form.data"
               :rules="form.rules"
               label-position="left"
               label-width="68px">
        <div class="b-border">
          <el-form-item label="发送对象"
                        prop="sendObj">
            <div>
              <el-radio-group v-model="type">
                <el-radio :label="1">输入手机号</el-radio>
                <el-radio :label="2">按标签筛选</el-radio>
              </el-radio-group>

            </div>
            <div>
              <el-input type="textarea"
                        class="send-cont"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model="form.data.phone">
              </el-input>

            </div>
          </el-form-item>
          <el-form-item label="短信内容"
                        prop="abbreviation">
            <el-input v-model="form.data.cont"
                      type="textarea"
                      :rows="8"
                      maxlength="70"
                      class="sms-cont"
                      show-word-limit
                      placeholder="输入联盟简称"></el-input>
          </el-form-item>
          <el-form-item label="短信签名:"
                        class="form-color"
                        prop="abbreviation">
            <div>【天目红盟】</div>
          </el-form-item>
          <el-form-item label="发送时间:"
                        class="form-color"
                        prop="abbreviation">
            <div>立即发送</div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </page>
</template>
<script>

export default {
  name: 'index',
  data () {
    return {
      type: 1,
      form: {
        rules: {
          sendObj: [
            { required: true, message: '请选择联盟名称', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入介绍文字', trigger: 'blur' }
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
    }
  },
  methods: {
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.sms-img {
}
.send-cont {
  width: 330px;
  height: 176px;
}
.sms-cont {
  width: 330px;
  height: 176px;
}
.form-color {
  /deep/.el-form-item__label {
    color: #999999 !important;
  }
}
</style>
