<template>
  <div class='form-item-wrap row b center-align'
       :class="isError && 'error-item'"
       :style="{width: config.width && (config.width + 'px')}">
    <!-- <el-image style="width: 24px; height: 24px"
              class="ml16"
              :src="config.imgUrl"></el-image> -->
    <svg-icon class="ft24 ml16 primary-color"
              :icon="config.imgUrl"></svg-icon>
    <el-input v-model="currentFormData"
              class="input"
              auto-complete="off"
              :type="config.type || 'text'"
              @keyup.enter.native="onLogin"
              @change="changeInputData"
              :placeholder="config.placeholder"></el-input>
  </div>
</template>

<script>
import SvgIcon from '../../../components/SvgIcon.vue'
export default {
  components: { SvgIcon },
  name: 'FormItem',
  methods: {
    onLogin () {
      this.$emit('onLogin')
    },
    changeInputData () {
      this.$emit('update:formData', this.currentFormData)
    }
  },
  data () {
    return {
      currentFormData: ''
    }
  },
  props: {
    config: {
      type: Object
    },
    isError: {
      type: Boolean
    },
    formData: {
      type: String
    }
  },
  watch: {
    formData (n, o) {
      this.currentFormData = n
    }
  },
  created () {
  }
}
</script>

<style lang='scss' scoped>
.form-item-wrap {
  height: 48px;
  border-radius: 24px;
  /deep/ .el-input__inner {
    border: none;
    background: transparent;
    height: 46px;
    border-radius: 24px;
  }
}
/deep/ input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px $color-f9 inset;
}
.input {
  background: transparent;
}
.error-item {
  background: #e7e5e9;
  border: 1px solid #ed4014 !important;
}
</style>
