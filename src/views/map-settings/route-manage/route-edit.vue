<template>
  <page title="编辑路线"
        needPadding>
    <route-components :journeyLineId="this.$route.query.journeyLineId"></route-components>
  </page>
</template>
<script>
import RouteComponents from './components/RouteComponents'
export default {
  components: { RouteComponents }
}
</script>
