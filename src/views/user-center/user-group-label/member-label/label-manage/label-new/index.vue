<template>
  <div class='new-label-wrap'>
    <page title='新增标签'>
      <label-form></label-form>
    </page>
  </div>
</template>

<script>
import LabelForm from '../components/LabelForm.vue'
export default {
  name: 'SetCard',
  methods: {

  },
  data () {
    return {

    }
  },
  created () {
  },
  components: {
    LabelForm
  }
}
</script>

<style lang='scss' scoped>
.new-label-wrap {
  padding-bottom: 70px;
  .form {
    padding-left: 15%;
    .content {
      border: 1px solid $color-de;
      width: 778px;
      box-sizing: border-box;
      min-height: 469px;
      padding: 8px 26px 24px;
      border-radius: 0 6px 6px;
    }
    .w96 {
      width: 96px;
    }
  }
}
</style>
