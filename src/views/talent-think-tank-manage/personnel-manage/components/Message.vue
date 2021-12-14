<template>
  <div>
    <page-search class="mt16"
                 :btnItems="btnItems"
                 :formOptions="formOptions"
                 @onInquire="onInquire"
                 @onReset="onReset"></page-search>
    <page-table :data="table.data"
                :col-configs="table.colConfig"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText('留言')"
                :isLoading="table.isLoading"
                @getTableData="getTableData">
      <el-table-column slot="status"
                       label="处理状态"
                       width="106">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '待回复' : '已回复'}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="124">
        <template slot-scope="scope">
          <div class="flex">
            <el-popover v-if="scope.row.status === 2"
                        placement="top"
                        width="200"
                        trigger="hover"
                        title="回复内容"
                        :content="scope.row.replyContent">
              <div slot="reference">
                <span class="text-btn mr16">查看回复</span>
              </div>
            </el-popover>
            <el-popconfirm title="要删除该留言？"
                           cancelButtonType="取消"
                           confirmButtonText="删除"
                           hideIcon
                           @confirm="onDeleteConfirm(scope.row.id)"
                           v-if="$hasAuth($urls.removeJourneyTalentsMessage)">
              <span class="text-btn"
                    slot="reference">删除</span>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>
<script>
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import PageSearch from '@c/PageSearch/index'
import { timeFormat } from '@u/formatter.js'
export default {
  name: 'Message',
  methods: {
    // 删除
    onDeleteConfirm (id) {
      this.$api.removeJourneyTalentsMessage({ id }).then(res => {
        if (res.isError) return this.$mssage.error(res.message)
        this.$message.success('删除留言成功')
        this.getTableData()
      })
    },
    // 搜索
    onInquire (params) {
      this.search.pageNumber = 1
      this.search = {
        ...this.search,
        ...params
      }
      this.getTableData()
    },
    onReset () {
      this.search = {
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 获取列表
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyTalentsMessagePage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.total = res?.content?.count ?? 0
        this.table.data = res?.content?.items ?? []
      })
    }
  },
  data () {
    const changeFunction = (val, key) => {
      if (key === 'time') {
        if (!this.$isEmpty(val)) {
          this.search.startDate = val[0]
          this.search.endDate = val[1]
        } else {
          this.search.startDate = ''
          this.search.endDate = ''
        }
        return
      }
      this.search[key] = val
    }
    return {
      btnItems: 'inquire,reset',
      formOptions: [
        {
          placeholder: '输入用户昵称/姓名/手机号',
          prop: 'keyword',
          element: 'el-input',
          icon: 'suffix',
          iconClass: 'el-input__icon el-icon-search pointer'
        },
        {
          label: '留言时间',
          prop: 'time',
          element: 'el-date-picker',
          valueFormat: 'timestamp',
          value: [],
          type: 'daterange',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'time')
            }
          }
        },
        {
          label: '处理状态',
          prop: 'status',
          element: 'el-select',
          value: '',
          clearable: true,
          options: [{ id: '', name: '全部' }, { id: 1, name: '待回复' }, { id: 2, name: '已回复' }],
          style: {
            width: '120px'
          }
        }
      ],
      table: {
        colConfig: Object.freeze([
          {
            prop: 'code',
            label: '留言编号',
            width: 224
          },
          {
            prop: 'content',
            label: '留言内容',
            showTip: false,
            style: {
              padding: 20
            }
          },
          {
            prop: 'memberNick',
            label: '用户昵称',
            width: 180
          },
          {
            prop: 'journeyTalentsName',
            label: '人才',
            width: 120
          },
          {
            prop: 'contentTime',
            label: '留言时间',
            formatter: timeFormat,
            width: 180
          },
          {
            slot: 'status'
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
    PageTable,
    PageSearch
  }
}
</script>
<style lang="scss" scoped>
/deep/ .cell {
  padding: 12px;
  text-align: justify;
  text-align-last: left;
}
.nomarl {
  color: #606266;
}
</style>
