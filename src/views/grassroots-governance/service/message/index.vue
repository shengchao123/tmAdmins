<template>
  <page title="留言管理">
    <page-search class="mt16"
                 ref="search"
                 :formOptions="searchCondition.searchOptions"
                 :btnItems="searchCondition.btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset">
      <template slot="messageTime">
        <div class="flex">
          <el-date-picker v-model="search.messageTime"
                          value-format="timestamp"
                          :default-time="['00:00:00', '23:59:59']"
                          class="w240"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </template>
    </page-search>

    <section class="message-wrap">
      <div class="table-wrap">
        <section class="table-header pl24 bg-color flex">
          <div v-for="(item,index) in table.headers"
               class="table-header-item bold"
               :style="`width:${item.width}px;minWidth:${item.minWidth}px;`"
               :class="index === 2 ? 'flex1' : index === 1 ? 'pr24' :''"
               :key="item.name">
            {{ item.name }}
          </div>
        </section>

        <section class="table-items mt8"
                 v-if="table.total > 0"
                 v-loading="table.isLoading">
          <template v-for="(item,index) in table.data">
            <message-item class="mb16"
                          @reply="getTableData"
                          @getTableData="getTableData"
                          :key="index"
                          :messageInfo="item"
                          :tableHeaders="table.headers"></message-item>
          </template>
        </section>
        <section v-else
                 class="message-empty color-999 center">
          {{table.emptyText}}
        </section>
      </div>
    </section>

    <el-pagination v-show="table.total > 0"
                   class="mt20 pagination"
                   :page-sizes="[5, 10, 20, 50]"
                   :current-page.sync="search.pageNumber"
                   :page-size.sync="search.pageSize"
                   @size-change="getTableData"
                   @current-change="getTableData"
                   :total="table.total"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </page>
</template>

<script>
import PageSearch from '@c/PageSearch'

import MessageItem from './components/MessageItem'
export default {
  name: 'index',
  methods: {
    // 查询
    onInquire () {
      this.search.pageNumber = 1
      this.getTableData()
      this.emptyText()
    },
    // 重置
    onReset () {
      this.search = {
        messageTime: [],
        status: '',
        keyword: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.getTableData()
      this.emptyText()
    },
    // 获取列表数据
    getTableData () {
      this.table.isLoading = true
      const params = {
        ...this.search
      }
      if (params.messageTime) {
        params.startTime = params.messageTime[0]
        params.endTime = params.messageTime[1]
        delete params.messageTime
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.getJourneyCommunityMessagePage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) return this.$message.error(res.message)
        this.table.data = res?.content?.items ?? []
        this.table.total = res?.content?.count ?? 0
      })
    },
    // 空文案
    emptyText () {
      this.$deleteObjectEmptyAttr(this.search)
      const hasOtherKeys = Object.keys(this.search).length > 2
      if (hasOtherKeys) return this.table.emptyText = '暂未找到相关信息'
      return this.table.emptyText = '暂无相关信息'
    },
    // 成功提示信息
    successTip (message) {
      this.$message.success(`${message}成功`)
      this.getTableData()
    }
  },
  data () {
    const changeSearchCondition = (val, key) => {
      this.search[key] = val
    }
    return {
      // 搜索栏筛选项
      searchCondition: {
        searchOptions: [
          {
            prop: 'keyword',
            label: '用户信息',
            placeholder: '请输入昵称/姓名/手机号',
            element: 'el-input',
            events: {
              change (val) {
                changeSearchCondition(val, 'keyword')
              }
            }
          },
          {
            label: '留言时间',
            slot: 'messageTime'
          },
          {
            label: '处理状态',
            placeholder: '请选择',
            prop: 'status',
            element: 'el-select',
            value: '',
            options: Object.freeze([
              {
                id: '',
                name: '全部'
              },
              {
                id: 1,
                name: '待回复'
              },
              {
                id: 2,
                name: '已回复'
              }
            ]),
            events: {
              change (val) {
                changeSearchCondition(val, 'status')
              }
            }
          }
        ],
        btnItems: 'inquire, reset'
      },
      search: {
        pageSize: 10,
        pageNumber: 1
      },
      table: {
        total: 0,
        data: [],
        isLoading: false,
        emptyText: '暂无相关信息',
        headers: Object.freeze([
          {
            name: '用户',
            width: 240
          },
          {
            name: '留言内容',
            width: 706
          },
          {
            name: '留言时间',
            minWidth: 240
          },
          {
            name: '处理状态',
            width: 240
          },
          {
            name: '操作',
            width: 124
          }
        ])
      }

    }
  },
  components: {
    PageSearch, MessageItem
  },
  created () {
    this.getTableData()
  },
  provide () {
    return {
      successTip: this.successTip
    }
  }
}
</script>

<style lang='scss' scoped>
.message-wrap {
  width: 100%;
  overflow-x: auto;
}
.table-wrap {
  min-width: 1550px;
  width: 100%;
  .table-header {
    height: 48px;
    line-height: 48px;
  }
  .message-empty {
    height: 60px;
  }
}
.pagination {
  text-align: right;
}

.bg-color {
  background-color: $color-eee;
}
</style>
