<template>
  <page title="报事详情"
        needPadding>
    <div class="activity-details-info center-align">
      <div>
        <div class="info-title"
             style="margin-left:-100px">基本信息</div>
        <div class="flex mt24">
          <div class="w98">报事人：</div>
          <div>{{wishDetail.memberName}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">问题描述：</div>
          <div class="w674">{{wishDetail.problemDesc}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">图片：</div>
          <div v-for="(item1,index1) in wishDetail.attachments"
               :key="index1">
            <img :src="$fileHost + item1.url"
                 class="mr16 "
                 style="width:120px;height:120px;border-radius:6px"
                 @click="lookBigPhoto(wishDetail.attachments,index1)" />
          </div>
        </div>
        <div class="flex mt24">
          <div class="w98">所在社区：</div>
          <div>{{wishDetail.communityOrgName + wishDetail.streetOrgName}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">联系电话：</div>
          <div>{{wishDetail.memberPhone}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">身份证号：</div>
          <div>{{wishDetail.memberIdCardNo}}</div>
        </div>
        <div class="flex mt24">
          <div class="w98">提交时间：</div>
          <div>
            {{$moment(wishDetail.createTime).format('YYYY-MM-DD HH:mm')}}
          </div>
        </div>

        <div class="t-border mt48"
             v-if="wishDetail.status!==0">
          <div class="w900">
            <div class="info-title mb32"
                 style="margin-left:-100px">跟进记录</div>
            <div class="ml130">
              <el-steps direction="vertical"
                        :active="1">
                <el-step finish-status="success"
                         v-if="wishDetail.status===2">
                  <div slot="title"
                       class="color-333 ft14 bold">
                    已完结
                  </div>
                  <div slot="icon"
                       class="is_active_icon">
                    <div class="line-icon"></div>
                  </div>
                  <div slot="description"
                       class="column pb32">
                    <div class="color-999 ft14 mt-3">{{$moment(wishDetail.finishTime).format('YYYY-MM-DD HH:mm:ss')}}
                    </div>
                    <div class="w670 line5 mt8 color-333 ft14">处理完成</div>
                  </div>
                </el-step>
                <el-step finish-status="success"
                         v-if="wishDetail.status!==0 ">
                  <div slot="title"
                       class="color-333 ft14 bold">
                    处理中
                  </div>
                  <div slot="icon"
                       class="is_active_icon">
                    <div class="line-icon"></div>
                  </div>
                  <div slot="description"
                       class="column pb32">
                    <div class="color-999 ft14 mt-3">{{$moment(wishDetail.dealTime).format('YYYY-MM-DD HH:mm:ss')}}
                    </div>
                    <div v-if="wishDetail.feedback"
                         class="w670 line5 mt8 color-333 ft14">{{wishDetail.feedback}}</div>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <page-handle @onConfirm="onHandle"
                     :config="pageHandleConfig"></page-handle>
      </div>
    </div>
    <HandleDialog ref="handle"
                  @success="getDetailData"></HandleDialog>
    <BigPictire ref="bigPicture"></BigPictire>
  </page>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPictire from '@/components/BigPictire'
import HandleDialog from './HandleDialog'

export default {

  data () {
    return {
      wishDetail: {}
    }
  },
  computed: {
    pageHandleConfig () {
      if (this.wishDetail.status !== 2) {
        return {
          btns: [
            {
              text: '返回',
              event: 'cancel'
            },
            {
              text: '处理',
              class: 'secondary-btn',
              event: 'onConfirm'
            }
          ]
        }
      } else {
        return {
          btns: [
            {
              text: '返回',
              event: 'cancel'
            }
          ]
        }
      }
    }
  },
  methods: {
    onHandle () {
      this.$refs.handle.show(this.wishDetail)
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      // const bigPicture = this.$refs.bigPicture
      // bigPicture.photoIndex = index
      // bigPicture.nowPhoto = imgList[index].url
      // bigPicture.photoList = imgList.map((item) => item.url)
      // bigPicture.showPicture = true
    },
    // 获取详情数据
    getDetailData () {
      const params = {
        id: this.$route.query.id
      }
      this.$api.findJourneyCommunityProblemById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.wishDetail = res.content
      })
    }
  },
  created () {
    this.getDetailData()
  },
  components: { PageHandle, BigPictire, HandleDialog }
}
</script>

<style lang="scss" scoped>
.w98 {
  width: 98px;
  color: #999999;
  margin-right: 8px;
}
.w674 {
  width: 674px;
}
.activity-details-info {
  margin-left: 421px;
  margin-top: 60px;
}
.apply-ing {
  width: 44px;
  height: 16px;
  line-height: 16px;
  background: #fa6400;
  color: #ffffff;
  border-radius: 2px;
}
.for-ing {
  width: 44px;
  height: 16px;
  line-height: 16px;
  background: #72b230;
  color: #ffffff;
  border-radius: 2px;
}
.flex-wrap {
  width: 700px;
  flex-wrap: wrap;
}
.affiche-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 16px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.landmark-img {
  width: 199px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
}
.line5 {
  line-height: 1.5;
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
