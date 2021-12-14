<template>
  <div class='login-wrap'>

    <section class="content center">
      <img src="@/assets/login/login-content.png" />
      <login-form></login-form>
    </section>

    <!-- <footer class="footer column center-align">
      <div>
        ©2019 杭州商旅数字经济发展有限公司
      </div>
      <div class="mt8">
        浙ICP备 19051069 号 -1
      </div>
    </footer> -->
  </div>
</template>

<script>
import LoginForm from '@/views/login/Form'
export default {
  name: 'Login',
  components: { LoginForm },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
.login-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("~@/assets/login/login-bg.png") no-repeat;
  background-size: 100% 100%;

  .footer {
    position: absolute;
    width: 100%;
    color: #fff;
    bottom: 20px;
  }
  .content {
    height: 100%;
    img {
      height: 551px;
      width: 628px;
      margin-right: 154px;
    }
  }
}
</style>
