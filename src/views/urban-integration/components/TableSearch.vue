<template>
  <div class="mt16 center-align">
    <el-input :placeholder="tableSearchData.placeholder"
              class="w240"
              @blur="onSearch"
              @keyup.enter.native="onSearch"
              v-model="search.keyword">
      <i slot="suffix"
         class="el-input__icon el-icon-search pointer"
         @click="onSearch"></i>
    </el-input>
    <div class="ml24">
      <span>状态</span>
      <el-select v-model="search.status"
                 placeholder="请选择"
                 class="w120 ml8"
                 @change="onSearch">
        <el-option v-for="item in tableSearchData.statusOptions"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSearch',
  methods: {
    onSearch () {
      this.$emit('getTableData')
    }
  },
  props: {
    tableSearchData: Object,
    search: Object
  }
}
</script>
