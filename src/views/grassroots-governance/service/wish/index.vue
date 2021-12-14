<template>
  <page title="微心愿管理">
    <page-search :formOptions="formOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="请输入微心愿名称"
                  class="w240"
                  clearable
                  v-model="search.keyword">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
      <div slot="status">
        <el-select v-model="search.status"
                   class="w240"
                   placeholder="选择状态">
          <el-option v-for="item in selectOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
    </page-search>

    <el-button type="primary"
               @click="onAdd"
               v-if="$hasAuth($urls.createJourneyCommunityWish)">新建微心愿</el-button>
    <page-table v-if="$hasAuth($urls.getJourneyCommunityWishPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :isShowIndex="true"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('微心愿')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :width="98"
                class="mt16">

      <el-table-column slot="phone"
                       label="认领人/手机号"
                       class="operate no-wrap"
                       width="240">
        <template slot-scope="scope">
          <span>{{scope.row.memberPhone ? scope.row.memberPhone + '，' + scope.row.memberName : '--'}}</span>
        </template>
      </el-table-column>

      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="180">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onEdit(scope.row)"
                v-if="$hasAuth($urls.modifyJourneyCommunityWish)">编辑</span>
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getJourneyCommunityWish)">详情</span>
          <el-popconfirm title="要删除该微心愿？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(scope.row)"
                         v-if="$hasAuth($urls.removeJourneyCommunityMessage)">
            <span class="text-btn"
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
import { timeFormat } from '@/utils/formatter.js'

export default {
  name: 'index',

  methods: {
    // 查询
    onInquire () {
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
      this.$api.getJourneyCommunityWishPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content?.items ?? []
        table.total = res.content?.count ?? 0
      })
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'CommunityWishDetail', query: { id: row.id } })
    },
    // 新增公告按钮
    onAdd () {
      this.$router.push({ name: 'CommunityAddEditWish' })
    },
    // 新增公告按钮
    onEdit (row) {
      this.$router.push({ name: 'CommunityAddEditWish', query: { id: row.id } })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.deleteJourneyCommunityWish(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    }
  },
  data () {
    return {
      btnItems: 'inquire,reset',
      selectOptions: Object.freeze([
        {
          value: 1,
          label: '待认领'
        },
        {
          value: 2,
          label: '已认领'
        },
        {
          value: 3,
          label: '已过期'
        }
      ]),
      formOptions: [
        {
          slot: 'keyword'
        },
        {
          slot: 'status'
        }
      ],
      table: {
        colConfig: Object.freeze([// 路线管理
          {
            label: '微心愿标题',
            prop: 'name',
            minWidth: 200
          },
          {
            label: '认领截止时间',
            prop: 'endTime',
            formatter: timeFormat,
            width: 240
          },
          {
            label: '组织单位',
            prop: 'communityOrgName',
            width: 320
          },
          {
            label: '状态',
            prop: 'statusName',
            width: 160
          },
          {
            slot: 'phone'
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
