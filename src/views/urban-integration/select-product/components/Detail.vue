<template>
  <page title="产品详情"
        needPadding>
    <div class="pl40 pr40">
      <div class="content-wrap pt28">
        <div class="info-title ml24 mb24">基本信息</div>
        <div class="pb16 ml80 relative">
          <div class="delete-product"
               v-if="detailData.status === 3">
            <img :src="deleteImg"
                 alt=""
                 class="delete-img" />
          </div>
          <template v-for="item in basicProp">
            <div v-if="!$isEmpty(detailData[item.prop])"
                 :key="item.prop"
                 class="row mb16">
              <div class="color-999 w70 line-h32">{{item.name}}：</div>
              <div class="w700 line-h32 ml8"
                   :class="item.prop === 'name' ? 'row' :'column'">
                <div>{{detailData[item.prop]}}</div>
                <div v-if="item.prop === 'name' && detailData.status === 2"
                     class="hide-status">已隐藏</div>
                <div class="mt8 h22"
                     v-if="item.prop === 'storeName'">{{detailData.storeUrl}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="t-border">
        <div class="content-wrap">
          <div class="info-title ml24 mb24">图文描述</div>
          <div class="ml80">
            <div class="row mb16">
              <div class="color-999 w70 line-h32">产品图片：</div>
              <div class="flex ml8">
                <div v-for="(item,index) in detailData.images"
                     :key="index">
                  <img :src="$fileHost + item.url"
                       alt=""
                       class="product-img pointer"
                       @click="lookBigPhoto(detailData.images,index)" />
                </div>
              </div>
            </div>
            <div class="row pb32">
              <div class="color-999 w70 line-h22">产品详情：</div>
              <div class="rich-text ml8"
                   v-html="detailData.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle @onConfirm="onEdit"
                 :config="detailData.status === 3 ? {btns: [{ text: '返回', event: 'cancel' }]} : pageHandleConfig">
    </page-handle>
  </page>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import BigPicture from '@c/BigPictire'
export default {
  name: 'Detail',
  methods: {
    // 编辑
    onEdit () {
      this.$router.push({ name: 'EditProduct', query: { journeyProductId: this.$route.query.journeyProductId } })
    },
    // 根据id获取联盟信息
    getJourneyProductByIdReq () {
      this.$api.getJourneyProductByIdReq({ journeyProductId: this.$route.query.journeyProductId }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.detailData = res?.content ?? {}
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
      detailData: {},
      basicProp: Object.freeze([
        {
          prop: 'name',
          name: '产品名称'
        },
        {
          prop: 'honor',
          name: '荣誉'
        },
        {
          prop: 'brand',
          name: '品牌'
        },
        {
          prop: 'classificationName',
          name: '分类'
        },
        {
          prop: 'origin',
          name: '产地'
        },
        {
          prop: 'contactPerson',
          name: '联系人'
        },
        {
          prop: 'contactPhone',
          name: '联系电话'
        },
        {
          prop: 'storeName',
          name: '线上店铺'
        },
        {
          prop: 'publishingDepartment',
          name: '选送单位'
        },
        {
          prop: 'platformOffers',
          name: '平台优惠'
        }
      ]),
      pageHandleConfig: {
        btns: [
          {
            text: '返回',
            event: 'cancel'
          },
          {
            text: '编辑',
            class: 'secondary-btn',
            event: 'onConfirm'
          }
        ]
      }
    }
  },
  created () {
    this.getJourneyProductByIdReq()
  },
  computed: {
    deleteImg () {
      return require('@/assets/noteManage/deleted.png')
    }
  },
  components: {
    pageHandle, BigPicture
  }
}
</script>

<style lang='scss' scoped>
.content-wrap {
  margin: 32px 0 0 282px;
}
.t-border {
  border-top: 1px solid #eee;
}
.w70 {
  width: 70px;
  height: 32px;
}
.w700 {
  width: 700px;
}
.ml80 {
  margin-left: 80px;
}
.line-h32 {
  line-height: 32px;
}
.line-h22 {
  line-height: 22px;
}
.h22 {
  line-height: 22px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.product-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
  box-sizing: border-box;
}
.rich-text {
  width: 514px;
  max-height: 620px;
  overflow-y: auto;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  /deep/img {
    max-width: 496px !important;
  }
}
.hide-status {
  font-size: 12px;
  color: #e02020;
  border: 1px solid #e02020;
  border-radius: 2px;
  width: 48px;
  height: 18px;
  line-height: 16px;
  text-align: center;
  margin-top: 6px;
  margin-left: 8px;
}
.delete-product {
  position: absolute;
  top: 0;
  left: 754px;
  .delete-img {
    width: 80px;
    height: 80px;
  }
}
</style>
