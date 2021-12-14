
<template>
  <div class='table-header-wrap mt16 center-align'>
    <div class="mb16">
      标签名称
      <el-input v-model="searchData.keyword"
                class="search-input ml8 mr24"
                placeholder="请输入标签名称"></el-input>
    </div>
    <div class="mb16">
      标签组
      <el-select placeholder="选择标签组"
                 v-model="searchData.memberLabelGroupId"
                 clearable
                 class="ml8 search-input mr24">
        <el-option :label="item.name"
                   :value="item.id"
                   v-for="item in memberLabelGroup"
                   :key="item.id"></el-option>
      </el-select>
    </div>
    <div class="mb16">
      是否公开
      <el-select placeholder="请选择"
                 v-model="searchData.isPublic"
                 clearable
                 class="ml8 search-input mr24">
        <el-option :label="item.name"
                   :value="item.id"
                   v-for="item in publicData"
                   :key="item.id"></el-option>
      </el-select>
    </div>
    <div class="mb16">
      打标签方式
      <el-select placeholder="请选择"
                 v-model="searchData.isAutomatic"
                 clearable
                 class="ml8 search-input mr24">
        <el-option :label="item.name"
                   :value="item.id"
                   v-for="item in setLabelTypeData"
                   :key="item.id"></el-option>
      </el-select>
    </div>
    <!-- <div class="mb16">
      归属企业
      <el-cascader class="ml8 search-input mr24"
                   v-model="searchData.attributionOrgId"
                   :show-all-levels='false'
                   ref="refCascader"
                   :options="organizationTree"
                   :props="cascaderProps">
      </el-cascader>
    </div> -->
    <div class="mb16">
      状态
      <el-select placeholder="请选择"
                 v-model="searchData.status"
                 clearable
                 class="ml8 search-input mr24">
        <el-option :label="item.name"
                   :value="item.id"
                   v-for="item in statusData"
                   :key="item.id"></el-option>
      </el-select>
    </div>

    <div class="mb16">
      <el-button @click="onSearch"
                 class="secondary-btn">查询</el-button>
      <el-button @click="resetSearchCondition"
                 class="custom-normal-button">重置</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TableHeader',
  methods: {
    onSearch () {
      this.$emit('update:searchCondition', this.searchData)
      this.$emit('searchClick')
    },
    // 重置搜索条件
    resetSearchCondition () {
      this.searchData = {}
      this.$emit('update:searchCondition', this.searchData)
      this.$emit('searchClick')
    },
    // 获取标签组分组
    reqGetMemberLabelGroupById () {
      this.$api.getMemberLabelGroupListByOrgId().then(res => {
        this.loading = false
        if (res.isError) return this.$message.error(res.message)
        this.memberLabelGroup = res.content
      })
    }
  },
  data () {
    return {
      searchData: this.searchCondition,
      memberLabelGroup: [],
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true
      },
      publicData: Object.freeze([
        {
          id: true,
          name: '公开'
        },
        {
          id: false,
          name: '不公开'
        }
      ]),
      setLabelTypeData: Object.freeze([
        {
          id: true,
          name: '自动'
        },
        {
          id: false,
          name: '手动'
        }
      ]),
      statusData: Object.freeze([
        {
          id: 1,
          name: '已启用'
        },
        {
          id: -1,
          name: '已停用'
        }
      ]),

      labelGroupLoadMoreCondition: {
        pageSize: 1,
        pageNumber: 1
      }
    }
  },
  computed: {
    organizationTree () {
      return this.$store.state.app.orgs
    }
  },
  props: ['searchCondition'],
  created () {
    this.reqGetMemberLabelGroupById()
  }
}
</script>

<style lang='scss' scoped>
.table-header-wrap {
  flex-wrap: wrap;
  .search-input {
    width: 160px;
  }
}
</style>
