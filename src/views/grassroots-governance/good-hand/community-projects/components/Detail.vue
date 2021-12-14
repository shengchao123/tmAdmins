<template>
  <page title="项目详情"
        needPadding>
    <div class="pl40 pr40">
      <div class="pt28">
        <div class="w900">
          <div class="info-title ml24 mb24">基本信息</div>
          <div class="pb8 ml80">
            <template v-for="item in infoProp">
              <div v-if="!$isEmpty(getJourneyHelperData[item.prop]) && (item.prop === 'leadTime' ? getJourneyHelperData.status !== 1 : true)"
                   :key="item.prop"
                   class="row mb20">
                <span class="color-999 w70 line5">{{item.name}}：</span>
                <span class="w670 line5">{{detailText(item.prop)}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="t-border"
           v-if="getJourneyHelperData.status !== 1">
        <div class="w900">
          <div class="info-title ml24 mb24">跟进记录</div>
          <div class="ml130"
               v-if="!$isEmpty(journeyHelperProjectList)">
            <el-steps direction="vertical"
                      :active="1">
              <template v-for="(item,index) in journeyHelperProjectList">
                <el-step :key="index"
                         finish-status="success">
                  <div slot="title"
                       class="color-333 ft14"
                       :class="index===0 && 'bold'">
                    {{item.statusName}}
                  </div>
                  <div slot="icon"
                       :class="index===0 && 'is_active_icon'">
                    <div :class="index===0 && 'line-icon'"></div>
                  </div>
                  <div slot="description"
                       class="column pb32">
                    <div class="color-999 ft14 mt-3">{{$moment(item.recordTime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                    <div v-if="item.description"
                         class="w670 line5 mt8 color-333 ft14">{{item.description}}</div>
                    <div class="flex mt8"
                         v-if="item.attachmentDTOList">
                      <div v-for="(img,imgIndex) in item.attachmentDTOList"
                           :key="imgIndex">
                        <img :src="$fileHost + img.url"
                             alt=""
                             class="product-img pointer"
                             @click="lookBigPhoto(item.attachmentDTOList,imgIndex)" />
                      </div>
                    </div>
                  </div>
                </el-step>
              </template>
            </el-steps>
          </div>
          <div v-else
               class="color-999 ml80">暂无跟进记录</div>
        </div>
      </div>
    </div>
    <big-picture ref="bigPicture"></big-picture>
    <form-dialog ref="formDialog"
                 @getTableData="getJourneyHelperProject"></form-dialog>
    <page-handle @onConfirm="onConfirm"
                 @onEdit="onEdit"
                 :config="pageHandleConfig"></page-handle>
  </page>
</template>

<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
import FormDialog from './FormDialog.vue'
export default {
  name: 'CommunityProjectDetail',
  methods: {
    // 返回
    onConfirm () {
      this.$router.back()
    },
    // 编辑
    onEdit () {
      this.$refs.formDialog.show('edit', this.$route.query.id)
    },
    // 根据id获取联盟信息
    getJourneyHelperProject () {
      this.$api.getJourneyHelperProject({ id: this.$route.query.id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.getJourneyHelperData = res?.content?.getJourneyHelperProjectRespDTO ?? {}
        this.journeyHelperProjectList = res?.content?.journeyHelperProjectScheduleCompleteDTOList ?? []
      })
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const temImages = Array.from(imgList, ({ url }) => url)
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = temImages[index]
      bigPicture.photoList = temImages
      bigPicture.showPicture = true
    }
  },
  data () {
    return {
      getJourneyHelperData: {},
      journeyHelperProjectList: [],
      infoProp: Object.freeze([
        {
          prop: 'name',
          name: '项目名称'
        },
        {
          prop: 'description',
          name: '背景描述'
        },
        {
          prop: 'communityOrgName',
          name: '发布社区'
        },
        {
          prop: 'createTime',
          name: '发布时间'
        },
        {
          prop: 'statusName',
          name: '状态'
        },
        {
          prop: 'journeyHelperProjectTypeName',
          name: '类型'
        },
        {
          prop: 'journeyCoConstructionUnitNameList',
          name: '领办单位'
        },
        {
          prop: 'leadTime',
          name: '领办时间'
        }
      ])

    }
  },
  computed: {
    detailText () {
      return (val) => {
        const detailData = this.getJourneyHelperData
        if (val === 'createTime' || val === 'leadTime') {
          return this.$moment(detailData[val]).format('YYYY-MM-DD HH:mm:ss')
        }
        if (val === 'journeyCoConstructionUnitNameList') {
          return detailData.journeyCoConstructionUnitNameList && detailData.journeyCoConstructionUnitNameList.join('、')
        }
        return detailData[val]
      }
    },
    pageHandleConfig () {
      const obj = {
        btns: [
          {
            text: '返回',
            event: 'onConfirm'
          }
        ]
      }
      if (this.getJourneyHelperData.status !== 3 && this.$hasAuth(this.$urls.modifyJourneyHelperProject)) {
        const temItem = {
          text: '编辑',
          class: 'secondary-btn',
          event: 'onEdit'
        }
        obj.btns.push(temItem)
      }
      return obj
    }
  },
  components: { PageHandle, BigPicture, FormDialog },
  created () {
    this.getJourneyHelperProject()
  }
}
</script>

<style lang='scss' scoped>
.w900 {
  width: 900px;
  margin: 32px auto 0;
}
.product-img {
  width: 150px;
  height: 150px;
  border-radius: 4px;
  margin-right: 16px;
  box-sizing: border-box;
}
.t-border {
  border-top: 1px solid #eee;
}
.w70 {
  width: 70px;
}
.w670 {
  width: 670px;
}
.ml80 {
  margin-left: 80px;
}
.ml130 {
  margin-left: 130px;
}
.line-h20 {
  display: inline-block;
  line-height: 20px;
}
.line5 {
  line-height: 1.5;
}
.mt-3 {
  margin-top: -2px;
}
/deep/ .el-step {
  position: relative;

  .el-step__title {
    position: absolute;
    font-weight: initial;
    left: -50px;
    top: -10px;
  }
  .el-step__line {
    width: 1px !important;
    background-color: #d8d8d8 !important;
  }

  .el-step__icon {
    width: 5px;
    height: 5px;
    position: absolute;
    left: 9px;
    border-radius: 10px;
    border: none;
    background-color: #d8d8d8;
  }
  .line-icon {
    width: 9px;
    height: 9px;
    position: absolute;
    left: -3px;
    top: -3px;
    border-radius: 18px;
    border: 1px solid #00c06d;
  }
  .is_active_icon {
    width: 5px;
    height: 5px;
    position: absolute;
    border-radius: 10px;
    border: none;
    background-color: #00c06d !important;
  }
}
/deep/.el-step :first-child .el-step__line {
  top: 8px !important;
}
</style>
