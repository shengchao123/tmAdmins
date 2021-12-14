<template>
  <page title="用户信息">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入昵称/姓名/手机号"
                  class="w240"
                  clearable
                  @clear="onInquire"
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>

      <div slot="orgId"
           class="flex">
        <div class="mr8">组织单位</div>
        <el-cascader class="cascader-company"
                     v-model="search.orgId"
                     :show-all-levels='false'
                     clearable
                     placeholder="全部"
                     ref="refCascader"
                     :options="orgs"
                     :props="cascaderProps"></el-cascader>
      </div>
      <div slot="communityOrgId"
           class="flex">
        <div class="mr8">街道社区</div>
        <el-cascader v-model="search.communityOrgId"
                     clearable
                     class="w240"
                     placeholder="全部"
                     ref="refCascader"
                     :options="communityOrgIdTree"
                     :props="cascaderProps1"></el-cascader>
      </div>

    </page-search>
    <page-table v-if="$hasAuth($urls.getMemberPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :isShowZero="true"
                :width="98">
      <el-table-column slot="community"
                       label="所在社区"
                       class="no-wrap"
                       width="150">
        <template slot-scope="scope">
          <span>{{scope.row.communityOrgName || '' + scope.row.plotName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="60">
        <template slot-scope="scope">
          <span class="text-btn"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getMemberDetailById)">详情</span>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { userInfoColConfig } from '@u/enum'

export default {
  name: 'index',
  data () {
    const changeFormOptions = (val, key) => {
      this.search[key] = val
    }
    return {
      communityOrgIdTree: [],
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          label: '注册时间',
          prop: 'date',
          element: 'el-date-picker',
          valueFormat: 'timestamp',
          type: 'daterange',
          clearable: true,
          events: {
            change (val) {
              changeFormOptions(val, 'date')
            }
          }
        },
        {
          label: '来源',
          placeholder: '请选择来源',
          prop: 'sourceType',
          element: 'el-select',
          options: [{ name: '微信公众号', id: '01' }, { name: '微信小程序', id: '02' }, { name: '支付宝生活号', id: '03' }, { name: '支付宝小程序', id: '04' }],
          events: {
            change (val) {
              changeFormOptions(val, 'sourceType')
            }
          }
        },
        {
          slot: 'orgId'
        },
        {
          slot: 'communityOrgId'
        }
      ],
      btnItems: 'inquire,reset',
      table: {
        colConfig: userInfoColConfig
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      },
      cascaderProps1: {
        value: 'id',
        children: 'child',
        label: 'name',
        emitPath: false
      }
    }
  },
  computed: {
    orgs () {
      return this.$store.state.app.orgs
    }
  },
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        keyword: '',
        startDate: '',
        endDate: '',
        sourceType: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = this.dealParams()
      this.$api.getMemberPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 处理接口数据
    dealParams () {
      const params = {
        ...this.search
      }
      if (params.date) {
        params.startDate = params.date[0]
        params.endDate = params.date[1]
        delete params.date
      }
      return params
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'UserDetail', query: { id: row.id } })
    },
    // 获取街道社区组织树
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    }
  },
  created () {
    this.getTableData()
    this.findCommunityOrganizationTree()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable }
}
</script>

<style lang='scss' scoped>
</style>
