<template>
  <page title="编辑点位"
        needPadding>
    <point-components :journeyPointId="this.$route.query.journeyPointId"></point-components>
  </page>
</template>
<script>
import PointComponents from './components/PointComponents'
export default {
  components: { PointComponents }
}
</script>
