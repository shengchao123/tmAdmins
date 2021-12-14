<template>
  <div class='top-org-select-wrap center'>

    <div class="content">
      <div class="bold mb12">选择顶级组织</div>

      <el-radio-group v-model="currentTopOrg">
        <div v-for="(item, index) in topOrgList"
             class="item"
             :class="item.id === currentTopOrg && 'item-active'"
             :key="index">
          <el-radio :label="item.id">{{item.name}}</el-radio>
        </div>
      </el-radio-group>

      <div class="center mt24">
        <el-button type="primary"
                   @click="onGoApp">进入应用</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopOrgSelectDialog',
  methods: {
    onGoApp () {
      if (!this.currentTopOrg) return
      this.$emit('onGoApp', this.currentTopOrg)
    }
  },
  data () {
    return {
      currentTopOrg: ''
    }
  },
  props: {
    topOrgList: {
      type: Array,
      default: () => [
        {
          id: 123,
          name: '组织 1'
        },
        {
          id: 1232,
          name: '组织 2'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.top-org-select-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #00000080;
  z-index: 999;
  .content {
    background: #feffff;
    border-radius: 6px;
    border-radius: 6px;
    width: 352px;
    padding: 30px 52px;
    .item {
      width: 300px;
      padding: 12px 24px;
    }
    .item-active {
      background: #f6f7fb;
    }
  }
}
</style>
