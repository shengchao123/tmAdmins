<template>
  <el-dialog :visible.sync="visible"
             title="标签组排序"
             width="456px">
    <div class="dialog-box pt24">
      <page-table :data="table.data"
                  :col-configs="table.colConfig"
                  :pageNumber.sync="search.pageNumber"
                  :pageSize.sync="search.pageSize"
                  :total="table.total"
                  maxHeight='475'
                  emptyText="暂无记录"
                  :isLoading="table.isLoading"
                  @getTableData="getTableData">
        <el-table-column slot="index"
                         label="排序号"
                         width="80">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column slot="operate"
                         label="操作"
                         width="100">
          <template slot-scope="scope">
            <i slot="suffix"
               v-if="(table.data.length - 1) !== (scope.$index)"
               class="el-icon-bottom text-btn mr24"
               @click="onClickArrow(scope, 'down')">
            </i>
            <div v-else
                 style="display: inline-block; width: 38px; height: 14px"></div>
            <i slot="suffix"
               v-if="scope.$index !== 0"
               class="el-icon-top text-btn mr24"
               @click="onClickArrow(scope, 'up')">
            </i>
          </template>
        </el-table-column>
      </page-table>
      <div class="shadow-box"></div>
    </div>
    <div slot="footer"
         class="footer mt16">
      <el-button @click="visible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import tableMixin from '@/mixins/table.js'
import pageTable from '@c/PageTable'

export default {
  name: 'SortDialog',
  methods: {
    onClickArrow (scope, type) {
      const index = scope.$index
      const params = {
        firstId: type === 'up' ? this.table.data[index - 1].id : scope.row.id,
        secondId: type === 'up' ? scope.row.id : this.table.data[index + 1].id
      }
      this.$api.switchMemberLabelGroupSequence(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temTableData = JSON.parse(JSON.stringify(this.table.data))
        if (type === 'up') {
          temTableData[scope.$index - 1] = scope.row
          temTableData[scope.$index] = this.table.data[index - 1]
        } else {
          temTableData[scope.$index] = this.table.data[index + 1]
          temTableData[scope.$index + 1] = scope.row
        }
        this.table.data = temTableData
        this.$emit('getTableData')
      })
    },
    getTableData () {
      this.table.isLoading = true
      this.$api.getMemberLabelGroupListByOrgId().then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.data = res.content
      })
    }
  },
  props: {
  },
  data () {
    return {
      visible: false,
      table: {
        colConfig: Object.freeze([
          {
            slot: 'index'
          },
          {
            prop: 'name',
            label: '标签组名称'
          },
          {
            slot: 'operate'
          }
        ])
      }
    }
  },
  created () {
    this.getTableData()
  },
  mixins: [tableMixin],
  components: {
    pageTable
  }
}
</script>

<style lang='scss' scoped>
.dialog-box {
  text-align: center;
  margin: 0 24px;
  height: 475px;
  overflow: hidden;
  position: relative;
  .shadow-box {
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    width: 100%;
    height: 8px;
    box-shadow: 0px -7px 12px #d8d8d8;
    z-index: 1;
  }
}
.footer {
  text-align: center;
}
</style>
