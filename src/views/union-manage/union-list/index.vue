<template>
  <page title="联盟管理">
    <div class="mt16">
      <el-input placeholder="输入党建联盟名称"
                class="w240"
                @blur="onSearch"
                @keyup.enter.native="onSearch"
                v-model="search.keyword">
        <i slot="suffix"
           class="el-input__icon el-icon-search pointer"
           @click="onSearch"></i>
      </el-input>
    </div>
    <el-button type="primary"
               class="mt16"
               v-if="$hasAuth($urls.createJourneyAlliance)"
               @click="onUnion('AddUnion')">新增联盟</el-button>
    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('联盟')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="keyWork"
                       label="重点工作"
                       width="462">
        <template slot-scope="scope">
          <div class="row">
            <div v-for="(item,index) in scope.row.keyWorkStatusDTOList"
                 :key="index"
                 class="mr16 pointer primary-color"
                 @click="onKeyWork(item,scope.row)">
              <span>{{item.workStatusName}}</span>
              <span>({{item.count}})</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.getJourneyAllianceById)"
                @click="onUnion('UnionDetail',scope.row.id)">详情</span>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.modifyJourneyAlliance)"
                @click="onUnion('EditUnion',scope.row.id)">编辑</span>
          <el-popconfirm title="要删除该联盟？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDeleteConfirm(scope.row.id)"
                         v-if="$hasAuth($urls.removeJourneyAlliance)">
            <span class="text-btn"
                  slot="reference">删除</span>
          </el-popconfirm>

        </template>
      </el-table-column>
    </page-table>

  </page>
</template>

<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
export default {
  name: 'index',
  methods: {
    onKeyWork (item, row) {
      const { count, workStatus } = item
      if (count === 0) return
      const route = {
        name: 'KeyWorkManage',
        query: {
          workStatus,
          journeyAllianceId: row.id
        }
      }
      this.$router.push(route)
    },
    // 新增、编辑、详情
    onUnion (type, id) {
      const route = {
        name: type,
        query: {
          id
        }
      }
      if (type === 'AddUnion') {
        delete route.query
      }
      this.$router.push(route)
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.removeJourneyAlliance({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除联盟成功')
        this.getTableData()
      })
    },
    // 搜索
    onSearch () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyAlliancePage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    return {
      table: {
        colConfig: Object.freeze([
          {
            prop: 'name',
            label: '联盟名称',
            minWidth: 458
          },
          {
            prop: 'abbreviation',
            label: '联盟简称',
            width: 270
          },
          {
            prop: 'regionsName',
            label: '行政区域',
            width: 270
          },
          {
            slot: 'keyWork'
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  activated () {
    this.getTableData()
  },
  mixins: [TableMixins],
  components: {
    PageTable
  }
}
</script>
