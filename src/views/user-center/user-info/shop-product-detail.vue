<template>
  <page title="产品详情"
        needPadding>
    <detail :productData="productData"></detail>
  </page>
</template>
<script>
import Detail from './components/Detail'

export default {
  data () {
    return {
      productData: {}
    }
  },
  components: { Detail },
  created () {
    this.getPointDetail()
  },
  methods: {
    // 获取产品详情(编辑接口)
    getPointDetail () {
      const params = {
        journeyRedHeartProductId: this.$route.query.id
      }
      this.$api.getJourneyProductById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.productData = res.content
      })
    }
  }
}
</script>
