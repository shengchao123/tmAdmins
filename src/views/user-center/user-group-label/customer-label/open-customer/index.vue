<template>
  <div class='open-customer-wrap'>
    <p class="ft16 bold pl16 mt16 mb16">{{creatorName ? creatorName +'的客群': '客群管理'}}</p>
    <div class='pl16 pr16'
         v-if='$hasAuth($urls.getPublicMemberGroupPage)'>
      <customer-page-search :events.sync="events"
                            :btnOptions.sync="btnOptions">
      </customer-page-search>
      <el-button v-if='$hasAuth($urls.createMemberGroup)'
                 type="primary"
                 @click="onToAddCustomer">新增客群</el-button>
      <customer-list class="mt16"
                     :tableData="tableData"
                     type="open">
      </customer-list>
      <el-pagination v-show="total > 0"
                     style="line-height:32px"
                     :class="[creatorName ? 'pb70' : null, 'mt12 tr']"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNumber"
                     :page-sizes="[10, 20, 30, 40, 50]"
                     :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

      <page-handle v-if="creatorName"
                   :config="{ btns: [{ text: '返回', event: 'cancel' }]}">
      </page-handle>
    </div>
  </div>
</template>

<script>
import { CustomerList, CustomerPageSearch } from '../components'
import PageHandle from '@/components/PageHandle.vue'
export default {
  name: 'OpenCustomer',
  methods: {
    // 跳转到添加客群页面
    onToAddCustomer () {
      const route = {
        name: 'AddCustomer',
        query: {
          type: 'add'
        }
      }
      this.$router.push(route)
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getListData()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNumber = val
      this.getListData()
    },
    getListData () { // 获取列表
      const query = {
        ...this.searchObj,
        ...this.listQuery
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.getPublicMemberGroupPage(query).then(res => {
        this.listLoading = false
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.tableData = res.content.items
        this.total = res.content.count
      })
    }

  },
  data () {
    const changeKeyword = (val) => {
      this.searchObj.keyword = val
    }
    const selectMemberLabelId = (val) => {
      this.searchObj.memberLabelId = val.id
    }
    const clearMemberLabelId = () => {
      this.searchObj.memberLabelId = null
    }
    const changeOrg = (val) => {
      if (!this.$isEmpty(val)) {
        this.searchObj.createOrgId = val[val.length - 1]
      }
    }
    const selectCreatorId = (val) => {
      this.searchObj.creatorId = val.id
    }
    const clearCreatorId = () => {
      this.searchObj.creatorId = null
    }
    return {
      creatorName: this.$route.query.creatorName || null,
      events: {
        keyword: {
          change (val) {
            changeKeyword(val)
          }
        },
        memberLabelId: {
          select (val) {
            selectMemberLabelId(val)
          },
          clear (val) {
            clearMemberLabelId()
          }
        },
        createOrgId: {
          change (val) {
            changeOrg(val)
          }
        },
        creatorId: {
          select (val) {
            selectCreatorId(val)
          },
          clear (val) {
            clearCreatorId()
          }
        }
      },
      searchObj: {
        keyword: null,
        memberLabelId: null,
        createOrgId: null,
        creatorId: null
      },
      tableData: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      listLoading: true,
      total: 0,
      btnOptions: {
        inquire: () => {
          this.getListData()
        },
        reset: () => {
          this.searchObj = null
          this.getListData()
        }
      }

    }
  },
  activated () {
    const { creatorId } = this.$route.query
    if (creatorId) {
      this.searchObj.creatorId = creatorId
    }
    this.getListData()
  },
  components: { CustomerList, CustomerPageSearch, PageHandle }
}
</script>

<style lang='scss' scoped>
.pb70 {
  padding-bottom: 70px !important;
}
</style>
