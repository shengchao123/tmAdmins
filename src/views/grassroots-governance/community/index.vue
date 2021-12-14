<template>
  <page title="社区单位管理">
    <div class="mt24 center-align">
      <div ref="closeRef"></div>
      <div class="mr8">街道社区</div>
      <el-cascader v-model="search.communityOrgId"
                   clearable
                   class="w240"
                   @change="getTableData"
                   ref="refCascader"
                   :options="communityOrgIdTree"
                   :props="cascaderProps"></el-cascader>
    </div>

    <div class="center-align mt24">
      <el-button type="primary"
                 class="mr8"
                 @click="onNew()">新建单位</el-button>
      <!-- 好东西评选 -->
      <GoodRank></GoodRank>
    </div>

    <page-table :data="table.data"
                class="mt16"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :isShowIndex="true"
                :emptyText="emptyText('项目')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">

      <el-table-column slot="servicePhone"
                       label="服务热线"
                       width="200">
        <template slot-scope="scope">
          <div class="center-align">
            <div class="mr8"
                 v-if="scope.row.serviceHotline">{{scope.row.serviceHotline}}</div>
            <el-popover placement="top"
                        ref="popover"
                        width="216">
              <span @click="onEditHotline(scope.row)"
                    slot="reference">
                <SvgIcon icon="icon_bianji"
                         class="text-btn"></SvgIcon>
              </span>
              <el-input v-model="editRow.serviceHotline"
                        placeholder="填入联系电话"
                        class="ml24"
                        style="width:170px"></el-input>
              <div class="center-align mt16 ml24">
                <el-button type="primary"
                           style="width:64px;height:32px"
                           @click="onConfirmSave(scope.row)">保存</el-button>
                <el-button class="secondary-btn"
                           size="mini"
                           style="width:64px;height:32px"
                           @click="onCancel(scope.row)">取消</el-button>
              </div>

            </el-popover>

          </div>
        </template>
      </el-table-column>

      <el-table-column slot="operate"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <span class="text-btn mr16"
                @click="onDetail(scope.row)">详情</span>
          <span class="text-btn mr16"
                @click="onEdit(scope.row)">编辑</span>

        </template>
      </el-table-column>
    </page-table>
  </page>
</template>

<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import GoodRank from './components/GoodRank'

export default {
  name: 'index',
  methods: {
    onDetail (item) {
      this.$router.push({
        name: 'CommunityDetail',
        query: {
          communityOrgId: item.communityOrgId,
          communityOrgName: item.streetOrgName + ' / ' + item.communityOrgName
        }
      })
    },
    onNew () {
      this.$router.push({
        name: 'CommunityAdd'
      })
    },
    onEdit (item) {
      this.$router.push({
        name: 'CommunityAdd',
        query: {
          communityOrgId: item.communityOrgId
        }
      })
    },
    // 删除
    onDeleteConfirm (id) {
      this.$api.deleteJourneyHelperProject({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除项目成功')
        this.getTableData()
      })
    },
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    onEditHotline (row) {
      this.editRow = { ...row }
    },
    onConfirmSave (row) {
      const params = {
        communityOrgId: row.communityOrgId,
        serviceHotline: this.editRow.serviceHotline
      }
      this.$api.updateOrgServiceHotline(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.getTableData()
        this.$refs.closeRef.click()
      })
    },
    onCancel (row) {
      this.$refs.closeRef.click()
    },
    // 重置按钮
    onReset () {
      this.search = {
        keyword: '',
        journeyHelperProjectType: '',
        status: '',
        communityOrgId: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 新增、编辑
    onProject (type, data, id) {
      this.$refs[type].show(data, id)
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.findJourneyCommunityPage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    },
    // 获取街道社区组织树
    findCommunityOrganizationTree () {
      this.$api.findCommunityOrganizationTree().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.communityOrgIdTree = res?.content ?? []
      })
    },
    arrayFormat (row, column) {
      if (this.$isEmpty(row[column.property])) return '--'
      return row[column.property].join('、')
    }
  },
  data () {
    return {
      editRow: {},
      formOptions: [
        {
          slot: 'communityOrgId'
        }
      ],
      btnItems: 'inquire,reset',
      communityOrgIdTree: [],
      search: {
        communityOrgId: ''
      },
      table: {
        colConfig: Object.freeze([
          {
            prop: 'communityOrgName',
            label: '街道社区'
          },
          {
            slot: 'servicePhone'
          },
          {
            prop: 'partyCount',
            label: '党支部',
            width: 128
          },
          {
            prop: 'allianceCount',
            label: '党建联盟',
            width: 128
          },
          {
            prop: 'plotCount',
            label: '小区',
            width: 128
          },
          {
            prop: 'propertyCount',
            label: '物业',
            width: 128
          },
          {
            prop: 'owerCount',
            label: '业委会',
            width: 128
          },
          {
            prop: 'buildingCount',
            label: '楼栋长',
            width: 128
          },
          {
            prop: 'stewardCount',
            label: '管家',
            width: 128
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
        emitPath: false
      }
    }
  },
  activated () {
    this.findCommunityOrganizationTree()
    this.getTableData()
  },
  mixins: [TableMixins],
  components: {
    PageTable,
    GoodRank
  }
}
</script>
