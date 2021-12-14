<template>
  <div class='wrap'>
    <section class="title-wrap center">
      <!-- <div class="logo-wrap mr12"><img src="@/assets/login/logo.png"></div> -->
      <div class="title bold">天目红盟数字化平台</div>
    </section>

    <section class="form-wrap mt32">
      <div class="wel-text mb36">欢迎登录！</div>

      <el-form ref="form"
               :model="form"
               :rules="rules">

        <el-form-item prop="username">
          <form-item :config="formItemConfig[0]"
                     @onLogin="onLogin"
                     :isError="usernameError"
                     :formData.sync="form.username"></form-item>
        </el-form-item>

        <el-form-item prop="password">
          <form-item :config="formItemConfig[1]"
                     @onLogin="onLogin"
                     :isError="passwordError"
                     :formData.sync="form.password"></form-item>
        </el-form-item>

        <el-form-item prop="code"
                      v-if="loginWay === 'sms'">
          <div class="between-row">
            <form-item :config="formItemConfig[2]"
                       @onLogin="onLogin"
                       :isError="codeError"
                       :formData.sync="form.code"></form-item>

            <div @click="onGetSmsCode"
                 class="pointer center code-img b">
              {{sms.btnTitle}}
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="code"
                      v-else>
          <div class="between-row">
            <form-item :config="formItemConfig[2]"
                       @onLogin="onLogin"
                       :isError="codeError"
                       :formData.sync="form.code"></form-item>

            <div @click="getCodeImgSrc"
                 class="pointer">
              <img :src="codeImgSrc"
                   class="code-img">
            </div>
          </div>
        </el-form-item>

      </el-form>

      <div class="login-button center"
           @click="onLogin">
        立即登录
      </div>
    </section>

    <top-org-select-dialog v-show="showTopOrgDialog"
                           @onGoApp="onGoApp"
                           :topOrgList="topOrgList"></top-org-select-dialog>

  </div>
</template>

<script>
import FormItem from './components/FormItem'
import { setCiphertext, setGlobalParams } from '@/utils/login'
import TopOrgSelectDialog from './components/TopOrgSelectDialog'
const loginErrorMap = new Map([
  ['CHECK_FAIL', 'isCodeError'],
  ['CODE_ERROR', 'isCodeError'],
  ['PASSWORD_ERROR', 'isPasswordError']
])

export default {
  name: 'Form',

  methods: {

    onLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.reqLogin()
        }
      })
    },
    // 获取短信验证码
    onGetSmsCode () {
      this.$refs.form.validateFields(['username', 'password'])
      if (this.form.username && this.form.password) {
        if (this._timer) return
        this.sendVerificationCode()
        this._timer = setInterval(() => {
          this.setTime()
        }, 1000)
      }
    },

    setTime () {
      if (this.sms.countdown === 0) {
        this.sms.btnTitle = '重新获取验证码'
        this.sms.countdown = 60
        this.removeTimer()
      } else {
        this.sms.btnTitle = `${this.sms.countdown}s后重新获取`
        this.sms.countdown--
      }
    },
    removeTimer () {
      clearInterval(this._timer)
      this._timer = null
      this.sms = {
        btnTitle: '重新获取验证码',
        countdown: 60
      }
    },

    // 发送验证码
    sendVerificationCode () {
      const params = {
        phone: this.form.username
      }
      this.$api.sendVerificationCode(params).then(res => {
        if (res.isError) {
          this.removeTimer()
          return
        }
        this.$message.success('发送成功')
      })
    },

    reqLogin () {
      const params = {
        loginName: this.form.username,
        password: this.form.password,
        code: this.form.code,
        uuid: this.form.uuid
      }

      this.$api.login(params).then(res => {
        if (res.isError) {
          this.handleLoginError(res)
          return
        }
        this.loginRes = res.content

        // 存储登录信息
        setCiphertext(res.content)

        if (this.loginRes.manyMasterOrg) {
          this.getTopOrganizationList()
          return
        }
        this.goInitialization()
      })
    },
    // 获取多个顶级组织
    getTopOrganizationList () {
      const params = {}
      this.$api.getTopOrganizationByUserId(params).then(res => {
        if (res.isError) return
        this.handleLoginLogic(res.content)
      })
    },
    // 处理登录逻辑
    handleLoginLogic (topOrgList) {
      // 只有一个顶级组织一个应用

      // 没有顶级组织，就是没权限进入
      if (this.$isEmpty(topOrgList)) {
        this.$message('该用户没有进入权限，请联系管理员')
        return
      }

      // 多个顶级组织
      if (topOrgList.length > 1) {
        this.showTopOrgDialog = true
        this.topOrgList = topOrgList
        return
      }

      this.loginRes.masterOrgId = topOrgList[0].id
      this.jumpPage()
    },
    onGoApp (id) {
      this.showTopOrgDialog = false
      setGlobalParams('masterOrgId', id)
      this.loginRes.masterOrgId = id
      this.jumpPage()
    },

    // 处理完逻辑，跳转其它页面
    jumpPage () {
      // 有别名，直接跳转去地址
      if (this.$route.query.abbreviation) {
        this.goInitialization()
        return
      }

      this.$router.push('/')
    },

    // 有多个顶级组织
    handleHasMoreTopOrg () {
      this.getTopOrganizationList()
    },

    // 处理登录错误
    handleLoginError (res) {
      const key = loginErrorMap.get(res.subCode)

      if (key === 'isPasswordError') {
        this.$message.error('5 次密码错误后该账号将会被冻结')
        // this.$message.error(`${res.content.surplusLoginTimes || 5}次密码错误后该账号将会被冻结`)
      }

      if (!key) {
        this.$confirm(res.message, '', {
          cancelButtonText: '我知道了',
          center: true,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          showConfirmButton: false,
          type: 'warning'
        })
      }
      this[key] = true
      this.$refs.form.validate()
    },
    // 去初始化页面跳转其它应用
    goInitialization () {
      this.$router.push('/')
      // this.$router.push({
      //   name: 'Initialization',
      //   query: {
      //     redirect_uri: this.loginRes.abbreviation,
      //     masterOrgId: this.loginRes.masterOrgId,
      //     page: this.$route.query.page
      //   }
      // })
    },

    // 获取验证码
    getCodeImgSrc () {
      const src = this.$api.getCaptchaUrl + this.generateUUID()
      this.codeImgSrc = src
      const index = src.lastIndexOf('=')
      this.form.uuid = src.substring(index + 1, src.length)
    },

    generateUUID () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23]
      var uuid = s.join('')
      return uuid
    }
  },

  components: { FormItem, TopOrgSelectDialog },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        this.usernameError = true
        callback(new Error('请输入用户名'))
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        this.usernameError = true
        callback(new Error('目前只支持中国大陆的手机号码'))
      } else {
        this.usernameError = false
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        this.passwordError = true
        callback(new Error('请输入密码'))
      } else if (this.isPasswordError) {
        this.passwordError = true
        callback(new Error('密码错误'))
        this.isPasswordError = false
      } else {
        this.passwordError = false
        callback()
      }
    }

    const validateCode = (rule, value, callback) => {
      if (value === '') {
        this.codeError = true
        callback(new Error('请输入验证码'))
      } else if (this.isCodeError) {
        this.codeError = true
        callback(new Error('验证码错误'))
        this.isCodeError = false
      } else {
        this.codeError = false
        callback()
      }
    }
    return {
      loginWay: '',
      sms: {
        btnTitle: '获取短信验证码',
        countdown: 60
      },

      codeImgSrc: '',

      showTopOrgDialog: false,

      usernameError: false,
      passwordError: false,
      codeError: false,

      isPasswordError: false,
      isCodeError: false,

      loginRes: {},
      topOrgList: [],

      form: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      formItemConfig: [
        {
          width: 376,
          imgUrl: 'icon_shoujihao',
          placeholder: '请输入用户名'
        },
        {
          width: 376,
          imgUrl: 'icon_mima',
          type: 'password',
          placeholder: '请输入密码'
        },
        {
          width: 189,
          imgUrl: 'icon_yanzhengma',
          placeholder: '请输入验证码'
        }
      ]
    }
  },
  destroyed () {
    this.removeTimer()
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.loginWay = process.env.VUE_APP_LOGIN_WAY
    this.getCodeImgSrc()
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  .form-wrap {
    width: 380px;
    border-radius: 12px;
    background: $color-f9;
    padding: 30px 60px 50px;
    .wel-text {
      font-size: 38px;
      color: $primaryColor;
    }
  }

  .title-wrap {
    .logo-wrap {
      background: $color-f9;
      border-radius: 12px;
      width: 100px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 30px;
      color: #fff;
    }
  }

  /deep/ .el-form .el-form-item {
    margin-bottom: 30px !important;
  }

  .code-img {
    margin-left: 19px;
    border-radius: 29px;
    height: 48px;
    width: 170px;
    color: #999999;
  }

  .login-button {
    background-color: $primaryColor;
    width: 397px;
    border-radius: 24px;
    height: 48px;
    color: #fff;
    cursor: pointer;
  }
  .login-button:hover {
    opacity: 0.8;
  }
}
</style>
