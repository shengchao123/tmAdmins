<template>
  <page title="公告管理">
    <page-search :formOptions="formOptions"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入公告标题"
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
        <div class="mr8">创建单位</div>
        <el-cascader class="cascader-company"
                     @change="onInquire"
                     v-model="search.orgId"
                     :show-all-levels='false'
                     clearable
                     ref="refCascader"
                     :options="orgs"
                     :props="cascaderProps"></el-cascader>
      </div>
    </page-search>
    <el-button type="primary"
               @click="addACtivity"
               v-if="$hasAuth($urls.insertJourneyAdvertisement)">新增公告</el-button>
    <page-table v-if="$hasAuth($urls.findJourneyAdvertisementsByPage)"
                :data="table.data"
                :isShowIndex="true"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('公告')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :width="98"
                class="mt16">
      <el-table-column slot="showTime"
                       label="显示时间"
                       class="operate no-wrap"
                       width="350">
        <template slot-scope="scope">
          <span class="mr8">{{$moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span class="mr8"> 至 </span>
          <span class="">{{$moment(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </template>
      </el-table-column>

      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="105">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.findJourneyAdvertisementById)">详情</span>
          <el-popconfirm title="要删除该公告？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(scope.row)"
                         v-if="$hasAuth($urls.deleteJourneyAdvertisement)">
            <span class="text-btn mr12"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import { timeFormat } from '@u/formatter'
export default {
  name: 'index',
  data () {
    return {
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'orgId'
        }
      ],
      table: {
        colConfig: Object.freeze([// 公告管理
          {
            label: '公告名称',
            prop: 'title'
          },
          {
            label: '创建单位',
            prop: 'orgName',
            minWidth: 240
          },
          {
            slot: 'showTime'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            width: 240,
            formatter: timeFormat
          },
          {
            slot: 'operate'
          }
        ])
      },
      cascaderProps: {
        value: 'id',
        children: 'child',
        label: 'name',
        checkStrictly: true,
        emitPath: false
      }
    }
  },
  methods: {
    // 查询
    onInquire () {
      this.$refs.refCascader.dropDownVisible = false
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置
    onReset () {
      this.search = {
        keyword: '',
        filterOrgId: '',
        pageNumber: 1,
        pageSize: 10
      }
    },

    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search
      }
      this.$api.findJourneyAdvertisementsByPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'CommunityAfficheDetail', query: { id: row.id } })
    },
    // 新增公告按钮
    addACtivity () {
      this.$router.push({ name: 'CommunityAddAffiche' })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.deleteJourneyAdvertisement(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    }
  },
  computed: {
    orgs () {
      return this.$store.state.app.orgs
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [TableMinxis],
  components: { PageSearch, PageTable }
}
</script>

<style lang='scss' scoped>
.cascader-company {
  width: 240px;
}
</style>
