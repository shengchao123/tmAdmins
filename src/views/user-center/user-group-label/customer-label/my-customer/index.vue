<template>
  <div class='my-customer-wrap'>
    <p class="ft16 bold pl16 mt16">我的客群</p>
    <el-tabs class="ml16 mr16 mb24"
             v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="我创建的客群"
                   name="create">
        <div class="mt16">
          <customer-page-search :events.sync="events"
                                :btnOptions.sync="createBtnOptions">
          </customer-page-search>
          <el-button v-if='$hasAuth($urls.createMemberGroup)'
                     type="primary"
                     @click="onToAddCustomer">新增客群</el-button>
          <div v-if='$hasAuth($urls.getMyMemberGroupCreatedPage)'>
            <customer-list class="mt16"
                           :tableData="createdList"
                           type="myCreate">
            </customer-list>
            <el-pagination v-show="total > 0"
                           style="line-height:32px"
                           class="mt12 tr"
                           @size-change="(event)=>handleSizeChange(event,1)"
                           @current-change="(event)=>handleCurrentChange(event,1)"
                           :current-page="listQuery.pageNumber"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="listQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我收藏的客群"
                   name="collect">
        <div class="mt16">
          <customer-page-search :events.sync="collectEvents"
                                :btnOptions.sync="collectBtnOptions">
          </customer-page-search>
          <div v-if='$hasAuth($urls.getMyMemberGroupFavoritesPage)'>
            <customer-list :tableData="collectList"
                           type="myCollect"
                           @getCollectList="getCollectList">
            </customer-list>
            <el-pagination v-show="collectTotal > 0"
                           style="line-height:32px"
                           class="mt12 tr"
                           @size-change="(event)=>handleSizeChange(event,2)"
                           @current-change="(event)=>handleCurrentChange(event,2)"
                           :current-page="collectQuery.pageNumber"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="collectQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="collectTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { CustomerList, CustomerPageSearch } from '../components'

export default {
  name: 'MyCustomer',
  methods: {
    handleSizeChange (val, type) {
      if (type === 1) {
        this.listQuery.pageSize = val
        this.getListData()
        return
      }
      this.collectQuery.pageSize = val
      this.getCollectList()
    },
    handleCurrentChange (val, type) {
      if (type === 1) {
        this.listQuery.pageNumber = val
        this.getListData()
        return
      }
      this.collectQuery.pageNumber = val
      this.getCollectList()
    },
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
    handleClick () {
      if (this.activeName === 'create') {
        this.getListData()
      } else {
        this.getCollectList()
      }
    },
    getListData () { // 获取列表
      const query = {
        ...this.searchObj,
        ...this.listQuery
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.getMyMemberGroupCreatedPage(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.createdList = res.content.items
        this.total = res.content.count
      })
    },
    getCollectList () {
      const query = {
        ...this.collectSearchObj,
        ...this.collectQuery
      }
      this.$deleteObjectEmptyAttr(query)
      this.$api.getMyMemberGroupFavoritesPage(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        this.collectList = res.content.items
        this.collectTotal = res.content.count
      })
    }
  },
  data () {
    const changeKeyword = (val, type) => {
      if (type === 'create') {
        this.searchObj.keyword = val
      } else {
        this.collectSearchObj.keyword = val
      }
    }
    const selectMemberLabelId = (val, type) => {
      if (type === 'create') {
        this.searchObj.memberLabelId = val.id
      } else {
        this.collectSearchObj.memberLabelId = val.id
      }
    }
    const clearMemberLabelId = (type) => {
      if (type === 'create') {
        this.searchObj.memberLabelId = null
      } else {
        this.collectSearchObj.memberLabelId = null
      }
    }
    const changeOrg = (val, type) => {
      if (!this.$isEmpty(val)) {
        if (type === 'create') {
          this.searchObj.createOrgId = val[val.length - 1]
        } else {
          this.collectSearchObj.createOrgId = val[val.length - 1]
        }
      }
    }
    const changeIsPublic = (val, type) => {
      if (type === 'create') {
        this.searchObj.memberGroupPublicRange = val
      } else {
        this.collectSearchObj.memberGroupPublicRange = val
      }
    }
    const selectCreatorId = (val, type) => {
      if (type === 'create') {
        this.searchObj.creatorId = val
      } else {
        this.collectSearchObj.creatorId = val
      }
    }
    const clearCreatorId = (type) => {
      if (type === 'create') {
        this.searchObj.creatorId = null
      } else {
        this.collectSearchObj.creatorId = null
      }
    }
    return {
      activeName: 'create',
      searchObj: {
        keyword: null,
        memberLabelId: null,
        createOrgId: null,
        memberGroupPublicRange: null,
        creatorId: null
      },
      collectSearchObj: {
        keyword: null,
        memberLabelId: null,
        createOrgId: null,
        memberGroupPublicRange: null,
        creatorId: null
      },
      createdList: [],
      collectList: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      collectQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      collectTotal: 0,

      // 我创建的客群
      events: {
        keyword: {
          change (val) {
            changeKeyword(val, 'create')
          }
        },
        memberLabelId: {
          select (val) {
            selectMemberLabelId(val, 'create')
          },
          clear (val) {
            clearMemberLabelId('create')
          }
        },
        createOrgId: {
          change (val) {
            changeOrg(val, 'create')
          }
        },
        memberGroupPublicRange: {
          change (val) {
            changeIsPublic(val, 'create')
          }
        }
      },
      // 我收藏的客群
      collectEvents: {
        keyword: {
          change (val) {
            changeKeyword(val, 'collect')
          }
        },
        memberLabelId: {
          select (val) {
            selectMemberLabelId(val, 'collect')
          },
          clear (val) {
            clearMemberLabelId('collect')
          }
        },
        createOrgId: {
          change (val) {
            changeOrg(val, 'collect')
          }
        },
        creatorId: {
          select (val) {
            selectCreatorId(val, 'collect')
          },
          clear () {
            clearCreatorId('collect')
          }
        }
      },
      // 我创建的客群
      createBtnOptions: {
        inquire: () => {
          this.getListData()
        },
        reset: () => {
          this.searchObj = null
          this.getListData()
        }
      },
      // 我收藏的客群
      collectBtnOptions: {
        inquire: () => {
          this.getCollectList()
        },
        reset: () => {
          this.searchObj = null
          this.getCollectList()
        }
      }
    }
  },
  created () {
    this.handleClick()
  },
  components: { CustomerList, CustomerPageSearch }

}
</script>

<style lang='scss' scoped>
</style>
