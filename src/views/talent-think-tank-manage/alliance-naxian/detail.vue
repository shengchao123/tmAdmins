<template>
  <page title='职位详情'
        class="detail-wrap"
        needPadding>
    <div class="detail-container">
      <div class="detail-box pb10"
           v-for="(item,index) in dataList"
           :key="index">
        <div class="info-title ml12 mb24">{{item.name}}</div>
        <div v-for="(child,childIndex) in item.infoList"
             :key="childIndex"
             class="ft14 ml80 flex"
             :style="{marginBottom: child.keyName === 'responsibilities' || child.keyName === 'qualifications' ? '20px' : '24px' }">
          <span class="color-999 w70 i-block"
                :style="{marginTop: child.keyName === 'responsibilities' || child.keyName === 'qualifications' ? '4px' : ''}">{{child.title}}</span>
          <span v-if="child.keyName === 'responsibilities' || child.keyName === 'qualifications'"
                class="color-333 ml4 flex1 lineh24"
                v-html="detailInfo[child.keyName]"></span>
          <div v-else
               class="color-333 ml4 flex1">
            <div v-if="child.keyName === 'annualSalary' ">
              <span v-if="detailInfo.isNegotiableSalary">面议</span>
              <div v-else>
                <span>{{detailInfo[child.keyName]}}</span>
                <span v-show="child.keyName === 'annualSalary'">万/年</span>
              </div>
            </div>
            <div v-else>
              <span>{{detailInfo[child.keyName]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-handle @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@/components/PageHandle'
import { weekOptions } from '@u/enum'
export default {
  name: 'Detail',
  methods: {
    onEdit () {
      this.$router.push({ name: 'EditPosition', query: { id: this.$route.query.id } })
    },
    getJourneyPostById () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyPostById(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        const { responsibilities, qualifications } = res.content
        const content = JSON.parse(JSON.stringify(res.content))
        content.responsibilities = responsibilities.replace(/\n/g, '<br/>')
        content.qualifications = qualifications.replace(/\n/g, '<br/>')
        this.detailInfo = content
      })
    }
  },
  data () {
    return {
      weekOptions,
      detailInfo: {},
      dataList: Object.freeze([
        {
          name: '职位信息',
          infoList: [
            { title: '职位名称：', keyName: 'name' },
            { title: '经验：', keyName: 'workExperienceName' },
            { title: '学历：', keyName: 'educationName' },
            { title: '薪资待遇：', keyName: 'annualSalary' },
            { title: '发布单位：', keyName: 'publishingDepartment' }
          ]
        },
        {
          name: '联系信息',
          infoList: [
            { title: '单位名称：', keyName: 'companyName' },
            { title: '地址：', keyName: 'workAddress' },
            { title: '联系人：', keyName: 'contactPerson' },
            { title: '联系电话：', keyName: 'contactPhone' },
            { title: '电子邮箱：', keyName: 'contactEmail' }
          ]
        },
        {
          name: '职位描述',
          infoList: [
            { title: '职位职责：', keyName: 'responsibilities' },
            { title: '任职资格：', keyName: 'qualifications' }
          ]
        }
      ])
    }
  },
  computed: {
    pageHandleConfig () {
      let obj = {}
      obj = {
        btns: [
          {
            text: '返回',
            event: 'cancel'
          }
        ]
      }
      if (this.detailInfo.status !== 3) {
        obj.btns.push({
          text: '编辑',
          class: 'secondary-btn',
          event: 'onEdit'
        })
      }
      return obj
    },
    // 展示已删除的图片
    deleteImg () {
      return (val) => {
        if (val.status === 3) return require('@/assets/noteManage/deleted.png')
      }
    }
  },
  created () {
    this.getJourneyPostById()
  },
  components: {
    PageHandle
  }
}
</script>
<style lang='scss' scoped>
.lineh24 {
  line-height: 24px;
}
.pb10 {
  padding-bottom: 10px;
}
.ml80 {
  margin-left: 80px;
}
.w70 {
  width: 70px;
}
.detail-wrap {
  .detail-container {
    padding-top: 60px;
    margin: 0 40px;
    .detail-box {
      border-bottom: 1px solid #eeeeee;
      padding-left: 348px;
      margin-bottom: 32px;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
