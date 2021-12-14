<template>
  <page title="人才管理">
    <el-tabs v-model="activeName">
      <el-tab-pane label="人才管理"
                   name="personnel">
        <personnel></personnel>
      </el-tab-pane>
      <el-tab-pane label="留言管理"
                   name="message">
        <message></message>
      </el-tab-pane>
    </el-tabs>
  </page>
</template>

<script>
import Personnel from './components/Personnel.vue'
import Message from './components/Message.vue'
export default {
  name: 'index',
  data () {
    return {
      activeName: 'personnel'
    }
  },
  components: {
    Personnel,
    Message
  }
}
</script>
