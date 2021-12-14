<template>
  <div class='child-wrap center-align'>
    <div v-if="list.length !== 1"
         class="border-top w16"></div>
    <div>
      <div v-for="(item) in list"
           :key="'list'+item.id"
           class="center-align relative"
           :class="list.length === 1 ? '':'pb16 list-item'">
        <!-- <div class="flex mt16"> -->
        <div class="mr8 border-top w24"
             :class="list.length === 1 ?'w32' : 'w24'"></div>
        <div class="flex">
          <svg-icon icon="icon_hongmengbiaoji"
                    class="ft14 mr8 mt1"></svg-icon>
          <div class="mr8 w154">{{item.name}}</div>
        </div>
        <!-- </div> -->
        <div v-if="item.child">
          <org-child :list="item.child"></org-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrgChild',
  props: {
    list: Array
  },
}
</script>

<style lang='scss' scoped>
.border-top {
  height: 1px;
  border-top: 1px dashed #cacaca;
}
.w16 {
  width: 16px;
}
.w24 {
  width: 24px;
}
.w32 {
  width: 32px;
}
.w154 {
  max-width: 154px;
}
.mt1 {
  margin-top: 1px;
}
.mt7 {
  margin-top: 7px;
}
.list-item::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 1px;
  border-left: 1px dashed #cacaca;
}
.list-item:first-child::before {
  top: calc(50% - 8px);
  height: calc(50% + 8px);
}
.list-item:last-child::before {
  height: 50%;
}
.list-item:last-child {
  padding-bottom: 0;
}
</style>
