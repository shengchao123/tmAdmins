<template>
  <page title="风采管理">
    <page-search :formOptions="formOptions"
                 class="mt16">
      <div slot="keyword">
        <el-input placeholder="输入标题"
                  class="w240"
                  clearable
                  @clear="onInquire"
                  @keyup.enter.native="onInquire"
                  @blur="onInquire"
                  v-model="search.title">
          <i slot="suffix"
             class="el-input__icon el-icon-search pointer"
             @click="onInquire"></i>
        </el-input>
      </div>
      <div slot="orgId"
           class="flex">
        <div class="mr8">上传组织</div>
        <el-select v-model="search.orgId"
                   clearable
                   @change="onInquire"
                   class="w240 mr24">
          <el-option v-for="item in orgList"
                     :key="item.orgId"
                     :label="item.orgName"
                     :value="item.orgId"></el-option>
        </el-select>
      </div>
    </page-search>
    <el-button type="primary"
               @click="addTalent"
               v-if="$hasAuth($urls.createGraphic)">新增风采</el-button>
    <page-table v-if="$hasAuth($urls.getGraphicPage)"
                :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('风采')"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                :width="98"
                class="mt16">
      <el-table-column label="序号"
                       type="index"
                       width="200"
                       class-name="index_class"
                       fixed="left"
                       slot="index"></el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       class="operate no-wrap"
                       width="105">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)"
                v-if="$hasAuth($urls.getGraphicById)">详情</span>
          <!-- <span class="text-btn mr16"
                @click="onEdit(scope.row)"
                v-if="$hasAuth($urls.modifyGraphic)">编辑</span> -->
          <el-popconfirm title="要删除该条风采?"
                         cancelButtonType=""
                         confirmButtonText="删除"
                         hideIcon
                         v-if="$hasAuth($urls.deleteGraphicById)"
                         @confirm="onDelete(scope.row)">
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
import orgMinxis from '@/mixins/orgList'
import { talentColConfig } from '@u/enum'
import { getGlobalParams } from '@u/login'

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
      btnItems: 'inquire,reset',
      orgList: [],
      table: {
        colConfig: talentColConfig
      },
      search: {
        orgId: '',
        title: ''
      }
    }
  },
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const table = this.table
      const params = {
        ...this.search,
        orgId: this.search.orgId ? this.search.orgId : getGlobalParams('orgId')
      }

      this.$api.getGraphicPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content.items
        table.total = res.content.count
      })
    },
    // 详情按钮
    onDetail (row) {
      this.$router.push({ name: 'TalentDetail', query: { id: row.id } })
    },
    // 编辑按钮
    onEdit () {
      this.$router.push({ name: 'EditTalent', query: {} })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.deleteGraphicById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 新增风采按钮
    addTalent () {
      this.$router.push({ name: 'AddTalent' })
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [TableMinxis, orgMinxis],
  components: { PageSearch, PageTable }
}
</script>

<style lang='scss' scoped>
</style>
