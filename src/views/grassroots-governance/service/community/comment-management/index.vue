<template>
  <page title="评论管理"
        needPadding>
    <page-search class="mt16"
                 :btnItems="btnItems"
                 :formOptions="formOptions"
                 @onInquire="onInquire"
                 @onReset="onReset">
    </page-search>
    <page-table :data="table.data"
                :col-configs="table.configs"
                :pageNumber.sync="search.pageNumber"
                :pageSize.sync="search.pageSize"
                :total="table.total"
                :emptyText="emptyText()"
                :isLoading="table.isLoading"
                @getTableData="getTableData"
                v-if="$hasAuth($urls.getCommunityNoteCommentPage)">
      <el-table-column slot="content"
                       minWidth="280"
                       label="评论内容">
        <template slot-scope="scope">
          <el-popover placement="top-start"
                      title=""
                      width="270"
                      trigger="hover"
                      popper-class="overflow"
                      :content="scope.row.content">
            <span slot="reference"
                  class="comment-cont">{{scope.row.content}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column slot="name"
                       width="234"
                       label="发布人">
        <template slot-scope="scope">
          <span class="primary-color pointer"
                @click="onMember(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate"
                       label="操作"
                       width="110">
        <template slot-scope="scope"
                  class="primaryColor">
          <span class="text-btn mr16"
                @click="onDetail(scope.row.id)"
                v-if="$hasAuth($urls.getCommunityNoteCommentDetail) && scope.row.status !== -1">详情</span>
          <el-popconfirm title="要删除该评论？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="deleteComment(scope.row)"
                         v-if="$hasAuth($urls.removeCommunityNoteComment) && scope.row.status !== -1">
            <span class="text-btn mr14"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </page-table>
    <comment-detail ref="CommentDetail"></comment-detail>
  </page>
</template>
<script>
import PageSearch from '@c/PageSearch'
import PageTable from '@c/PageTable'
import TableMinxis from '@/mixins/table'
import CommentDetail from './components/CommentDetail'
import { timeFormat } from '@u/formatter'

export default {
  name: '',
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
    },
    // 重置按钮
    onReset () {
      this.search = {
        date: [],
        status: '',
        keyword: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
    },
    // 详情按钮 查看详情弹窗
    onDetail (id) {
      const CommentDetail = this.$refs.CommentDetail
      CommentDetail.id = id
      CommentDetail.commentStatus = true
      CommentDetail.getCommentDetail()
    },
    // 删除评论按钮
    deleteComment (row) {
      const params = {
        id: row.id
      }
      this.$api.removeCommunityNoteComment(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('已删除')
        this.getTableData()
      })
    },
    // 获取评论列表数据
    getTableData () {
      const table = this.table
      const params = this.dealParams()
      this.$api.getCommunityNoteCommentPage(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        table.data = res.content?.items ?? []
        table.total = res.content?.count ?? 0
      })
    },
    // 处理接口数据
    dealParams () {
      const params = {
        ...this.search,
        noteType: '04'
      }
      if (params.date) {
        params.startDate = params.date[0]
        params.endDate = params.date[1]
        delete params.date
      }
      return params
    },
    // 跳转会员信息
    onMember (row) {
      this.$router.push({ name: 'UserDetail', query: { id: row.memberId, backRouteName: 'CommentManagement' } })
    }
  },
  data () {
    const changeFunction = (val, key) => {
      this.search[key] = val
    }
    return {
      formOptions: [
        {
          label: '',
          prop: 'keyword',
          element: 'el-input',
          show: true,
          placeholder: '输入评论ID',
          events: {
            change (val) {
              changeFunction(val, 'keyword')
            }
          }
        },
        {
          label: '发布时间',
          prop: 'date',
          element: 'el-date-picker',
          valueFormat: 'timestamp',
          type: 'daterange',
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'date')
            }
          }
        },
        {
          label: '状态',
          prop: 'status',
          element: 'el-select',
          placeholder: '全部',
          value: '',
          options: [{ name: '已发布', id: 1 }, { name: '已删除', id: -1 }],
          clearable: true,
          events: {
            change (val) {
              changeFunction(val, 'status')
            }
          },
          style: {
            width: '120px'
          }
        }
      ],
      table: {
        configs: Object.freeze([// 评论管理
          {
            label: '评论ID',
            prop: 'code',
            width: 169
          },
          {
            slot: 'content'
          },
          {
            slot: 'name'
          },
          {
            label: '发布时间',
            prop: 'createTime',
            width: 254,
            formatter: timeFormat
          },
          {
            label: '话题ID',
            prop: 'communityNoteCode',
            width: 224
          },
          {
            label: '状态',
            prop: 'statusName',
            width: 224
          },
          {
            slot: 'operate'
          }
        ])
      },
      btnItems: 'inquire,reset',
      search: {
        status: ''
      }
    }
  },
  components: { PageSearch, PageTable, CommentDetail },
  mixins: [TableMinxis],
  created () {
    this.getTableData()
  }
}
</script>
<style lang='scss' scoped>
.mr14 {
  margin-right: 14px;
}
.comment-cont {
  width: 290px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: auto;
}
</style>
<style lang="scss">
.overflow {
  max-height: 140px;
  overflow: auto;
}
</style>
