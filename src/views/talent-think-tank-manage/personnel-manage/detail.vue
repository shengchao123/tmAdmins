<template>
  <page title='人才详情'
        class="detail-wrap"
        needPadding>
    <div class="mt8">
      <el-tabs v-model="tabName">
        <el-tab-pane label="基础信息"
                     name="base">
          <div class="container pb24">
            <img v-if="detailInfo.status === 3"
                 class="delete-img"
                 :src="deleteImg(detailInfo)"
                 alt="">
            <template v-for="(item,index) in dataList">
              <div :key="index"
                   class="ft14 flex list-item"
                   v-if="!$isEmpty(detailInfo[item.keyName])">
                <span class="color-999 title i-block">{{item.title}}</span>
                <div class="content">
                  <div v-if="item.keyName === 'name'"
                       class="flex">
                    <span>{{detailInfo.name}}</span>
                    <span v-if="detailInfo.status === 2 "
                          class="label i-block ml8 ft12 tc">已隐藏</span>
                  </div>
                  <span v-else-if="item.keyName === 'titleList'">
                    {{detailInfo.titleList.join('、')}}
                  </span>
                  <div v-else-if="item.keyName === 'photo'"
                       class="flex">
                    <el-image class="img"
                              :src="$fileHost + detailInfo.photo"
                              fit="fit"></el-image>
                  </div>
                  <div v-else-if="item.keyName === 'serviceType'">
                    <span>{{detailInfo.serviceType.join('、')}}</span>
                  </div>
                  <span v-else
                        class="text i-block"
                        :style="{lineHeight: item.keyName === 'introduction' ? 1.5 : ''}">{{detailInfo[item.keyName]}}</span>
                </div>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评价信息"
                     name="comment">
          <div class="center-align mt24">
            <div class="center-align">
              <div class="color-999">服务次数： <span class="color-333">{{commentInfo.serviceTimes}}</span></div>
              <div class="ml56 color-999">
                评价：
              </div>
            </div>
            <div class="center-align">
              <el-rate v-model="commentInfo.score"
                       disabled
                       :colors="rateColors">
              </el-rate>
              <span>{{commentInfo.score}}分</span>
            </div>
          </div>
          <div>
            <page-table :data="table.data"
                        class="mt24"
                        :col-configs="table.colConfig"
                        :pageNumber.sync="search.pageNumber"
                        :pageSize.sync="search.pageSize"
                        :total="table.total"
                        :isShowIndex="table.isShowIndex"
                        :isLoading="table.isLoading">
              <el-table-column slot="nick"
                               label="昵称"
                               width="300">
                <template slot-scope="scope">
                  <div class="center-align">
                    <img :src="scope.row.avatar"
                         alt=""
                         class="comment-nick mr16">
                    <div>{{scope.row.nick}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column slot="score"
                               label="评价"
                               width="360">
                <template slot-scope="scope">
                  <div class="center-align">
                    <el-rate v-model="scope.row.score"
                             disabled
                             :colors="rateColors">
                    </el-rate>
                    <span>{{scope.row.score}}分</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column slot="operate"
                               label="操作"
                               width="65">
                <template slot-scope="scope">
                  <div class="flex">
                    <el-popconfirm title="要“删除”该评价?"
                                   cancelButtonType="取消"
                                   confirmButtonText="删除"
                                   hideIcon
                                   v-if="$hasAuth($urls.removeJourneyTalentsEvaluate)"
                                   @confirm="onDelete(scope.row)">
                      <span class="text-btn mr12"
                            slot="reference">删除</span>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </page-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <page-handle @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>
<script>
import PageHandle from '@/components/PageHandle'
import TableMixins from '@/mixins/table'
import PageTable from '@/components/PageTable'
import { weekOptions } from '@u/enum'
import { filterContinuousDate } from '@u/date.js'
import { timeFormat } from '@u/formatter'


export default {
  name: 'Detail',
  mixins: [TableMixins],
  methods: {
    onEdit () {
      this.$router.push({ name: 'EditPersonnel', query: { id: this.$route.query.id } })
    },
    getJourneyTalentsById () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.getJourneyTalentsById(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        const { isLeaveComments, isVisit, isTelephoneCommunication, openDayList, startTime, endTime, contactPhone } = res.content
        const serviceType = []
        if (isLeaveComments) {
          serviceType.push('留言回复')
        }
        if (isVisit) {
          serviceType.push('实地走访')
        }
        if (isTelephoneCommunication) {
          let weekList = []
          if (!this.$isEmpty(openDayList)) {
            if (openDayList + '' === '1,2,3,4,5,6,7') {
              weekList = '每天'
            } else {
              weekList = filterContinuousDate(openDayList).replace(/\s/g, '')
            }
          }
          serviceType.push('电话沟通（' + weekList + '，' + startTime + '～' + endTime + '），' + contactPhone + '（联系电话）')
        }
        this.detailInfo = {
          ...res.content,
          serviceType
        }
      })
    },
    // 获取评分信息接口
    getCommentInfo () {
      const params = {
        journeyTalentsId: this.$route.query.id
      }
      this.$api.getJourneyTalentsScore(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.commentInfo = res.content
      })
    },
    // 获取人才评价列表
    getCommentList () {
      this.table.isLoading = true
      const params = {
        journeyTalentsId: this.$route.query.id,
        ...this.search
      }
      this.$api.getJourneyTalentsEvaluatePage(params).then(res => {
        this.table.isLoading = false
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.table.total = res?.content?.count ?? 0
        // TODO: 待修改
        // this.table.data = res?.content?.items ?? []
      })
    },
    // 删除按钮
    onDelete (row) {
      const params = {
        id: row.id
      }
      this.$api.removeJourneyTalentsEvaluate(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('评价删除成功')
        this.getCommentList()
      })
    },
  },
  data () {
    return {
      weekOptions,
      detailInfo: {},
      dataList: Object.freeze([
        { title: '姓名：', keyName: 'name' },
        { title: '手机号', keyName: 'phone' },
        { title: '头衔：', keyName: 'titleList' },
        { title: '人物图片：', keyName: 'photo' },
        { title: '类型：', keyName: 'type' },
        { title: '擅长：', keyName: 'specialty' },
        { title: '服务方式：', keyName: 'serviceType' },
        { title: '个人简介：', keyName: 'introduction' }
      ]),
      tabName: 'base',
      commentInfo: {},
      rateColors: ['#F74B0A', '#F74B0A', '#F74B0A'],
      table: {
        colConfig: Object.freeze([
          {
            slot: 'nick'
          },
          {
            slot: 'score'
          },
          {
            prop: 'content',
            label: '评语',
            minWidth: 200
          },
          {
            prop: 'createTime',
            label: '发布时间',
            width: 286,
            formatter: timeFormat
          },
          {
            slot: 'operate'
          }
        ]),
        isShowIndex: true,
        total: 0,
        data: []
      }
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
      if (this.detailInfo.status !== 3 && this.tabName === 'base') {
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
    this.getJourneyTalentsById()
    this.getCommentInfo()
    this.getCommentList()
  },
  components: {
    PageHandle,
    PageTable
  }
}
</script>
<style lang='scss' scoped>
.detail-wrap {
  .container {
    width: 752px;
    margin: 0 auto;
    padding-top: 60px;
    .delete-img {
      position: absolute;
      top: 136px;
      right: 390px;
      width: 80px;
      height: 80px;
    }
    .list-item + .list-item {
      margin-top: 30px;
    }
    .title {
      min-width: 70px;
    }
    .content {
      width: 674px;
      .label {
        width: 44px;
        height: 16px;
        line-height: 16px;
        border: 1px solid #e02020;
        border-radius: 2px;
        color: #e02020;
      }
      .img {
        width: 120px;
        height: 168px;
      }
      .text {
        text-align: justify;
        text-align-last: left;
      }
    }
  }
}
.comment-nick {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 16px 0;
}
.ml56 {
  margin-left: 56px;
}
</style>
