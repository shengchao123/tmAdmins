<template>
  <div class='customer-page-search-wrap'>
    <page-search :formOptions="searchOptions"
                 :btnItems="btnItems"
                 @onInquire="onInquire"
                 @onReset="onReset" />
  </div>
</template>

<script>
import PageSearch from '@c/PageSearch/index.vue'

export default {
  name: 'CustomerPageSearch',
  methods: {
    // 查询
    onInquire () {
      this.btnOptions.inquire && this.btnOptions.inquire()
    },
    onReset () {
      this.btnOptions.reset && this.btnOptions.reset()
    },
    // 获取
    getUserList (params, cb) {
      const query = {
        ...params
      }
      this.$api.getListByKeyword(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        const userList = JSON.parse(JSON.stringify(res.content).replace(/name/g, 'value')) || []
        //  cb:调用 callback 返回建议列表的数据
        cb(userList)
      })
    },
    getUserSearch (queryString, cb) {
      this.getUserList({ keyword: queryString }, cb)
    },
    // 根据关键字获取会员标签列表
    getLabelList (params, cb) {
      const query = {
        ...params
      }
      this.$api.getMemberLabelListByKeyword(query).then(res => {
        if (res.isError) {
          this.$message.error(res.message) // 失败提醒
          return
        }
        const labelList = JSON.parse(JSON.stringify(res.content).replace(/name/g, 'value')) || []
        //  cb:调用 callback 返回建议列表的数据
        cb(labelList)
      })
    },
    getLabelSearch (queryString, cb) {
      this.getLabelList({ keyword: queryString }, cb)
    }
  },
  props: {
    events: { // 控制需要显示项
      type: Object,
      default () {
        return []
      }
    },
    btnOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    // const isPublicOptions = Object.freeze([
    //   {
    //     name: '不公开',
    //     id: '01'
    //   },
    //   {
    //     name: '本组织公开',
    //     id: '02'
    //   },
    //   {
    //     name: '融合体系内公开',
    //     id: '03'
    //   },
    //   {
    //     name: '自定义',
    //     id: '04'
    //   }
    // ])
    // const cascaderProps = {
    //   value: 'id',
    //   children: 'child',
    //   label: 'name',
    //   checkStrictly: true
    // }
    return {
      searchOptions: [
        {
          label: '客群信息',
          placeholder: '名称/关键词',
          prop: 'keyword',
          element: 'el-input',
          events: this.events.keyword,
          clearable: true
        },
        {
          label: '客群标签',
          placeholder: '输入客群标签',
          prop: 'memberLabelId',
          element: 'el-autocomplete',
          fetchSuggestions: this.getLabelSearch, // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
          triggerOnFocus: false, // 是否在输入框 focus 时显示建议列表
          clearable: true,
          events: this.events.memberLabelId
        },
        // {
        //   label: '创建组织',
        //   placeholder: '请选择',
        //   prop: 'createOrgId',
        //   element: 'el-cascader',
        //   showAllLevels: false,
        //   options: this.organizationTree,
        //   props: cascaderProps,
        //   events: this.events.createOrgId
        // },
        // {
        //   show: !!this.events.memberGroupPublicRange,
        //   label: '是否公开',
        //   placeholder: '请选择',
        //   prop: 'memberGroupPublicRange',
        //   element: 'el-select',
        //   options: isPublicOptions,
        //   events: this.events.memberGroupPublicRange
        // },
        {
          show: !!this.events.creatorId,
          label: '创建人',
          placeholder: '输入姓名',
          prop: 'creatorId',
          element: 'el-autocomplete',
          fetchSuggestions: this.getUserSearch,
          triggerOnFocus: false,
          clearable: true,
          events: this.events.creatorId
        }
      ]
    }
  },
  computed: {
    btnItems () {
      return Object.keys(this.btnOptions).join(',')
    },
    organizationTree () {
      return this.$store.state.app.orgs
    }
  },
  components: {
    PageSearch
  }
}
</script>

<style lang='scss' scoped>
</style>
