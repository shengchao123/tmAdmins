<template>
  <page title="新增公告">
    <form-table :afficheId='this.$route.query.id'></form-table>
  </page>
</template>
<script>
import FormTable from './components/FormTable'
export default {
  components: {
    FormTable
  }
}
</script>
<style scoped lang='scss'>
</style>
