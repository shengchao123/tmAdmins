<template>
  <page title="展位详情"
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
              <div class="w674 line-h32 ml8 row">
                <div>{{detailText(item.prop)}}</div>
                <div v-if="item.prop === 'title' && detailData.status === 2"
                     class="hide-status">已隐藏</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="t-border">
        <div class="content-wrap">
          <div class="info-title ml24 mb24">图文描述</div>
          <div class="ml80">
            <div class="row">
              <div class="color-999 w70 line-h32">展位图片：</div>
              <div class="w674 flex ml8 flex-wrap">
                <div v-for="(item,index) in detailData.images"
                     :key="index"
                     class="product-img-box">
                  <img :src="$fileHost + item.url"
                       alt=""
                       class="product-img pointer"
                       @click="lookBigPhoto(detailData.images,index)" />
                </div>
              </div>
            </div>
            <div class="row pb32">
              <div class="color-999 w70 line-h22">展位介绍：</div>
              <div class="w674 line-h22 ml8 row">{{detailData.introduction}}</div>
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
      this.$router.push({ name: 'EditBooth', query: { journeyMerchantBoothId: this.$route.query.journeyMerchantBoothId } })
    },
    // 根据id获取联盟信息
    getJourneyMerchantBoothById () {
      this.$api.getJourneyMerchantBoothById({ journeyMerchantBoothId: this.$route.query.journeyMerchantBoothId }).then(res => {
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
    },
  },
  data () {
    return {
      detailData: {},
      basicProp: Object.freeze([
        {
          prop: 'title',
          name: '展位标题'
        },
        {
          prop: 'appropriateCrowd',
          name: '适宜人群'
        },
        {
          prop: 'serviceContent',
          name: '服务内容'
        },
        {
          prop: 'address',
          name: '地址'
        },
        {
          prop: 'lng',
          name: '经纬度'
        },
        {
          prop: 'contactPhone',
          name: '联系电话'
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
    this.getJourneyMerchantBoothById()
  },
  computed: {
    deleteImg () {
      return require('@/assets/noteManage/deleted.png')
    },
    detailText () {
      return (val) => {
        const detailData = this.detailData
        if (val === 'appropriateCrowd' || val === 'serviceContent') {
          return Array.from(detailData[val], ({ typeName }) => typeName).join('、')
        }
        if (val === 'lng') {
          return `${detailData.lng}，${detailData.lat}`
        }
        return detailData[val]
      }
    }
  },
  components: {
    pageHandle, BigPicture
  },
}
</script>

<style lang='scss' scoped>
.content-wrap {
  margin: 32px 0 0 282px;
}
.t-border {
  border-top: 1px solid #eee;
}
.ml80 {
  margin-left: 80px;
}
.w70 {
  width: 70px;
  height: 32px;
}
.w674 {
  width: 674px;
}
.line-h32 {
  line-height: 32px;
}
.line-h22 {
  line-height: 22px;
}
.flex-wrap {
  flex-wrap: wrap;
}
.product-img {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
}
.product-img-box:nth-of-type(5n) .product-img {
  margin-right: 0px;
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
  top: 48px;
  left: 715px;
  .delete-img {
    width: 80px;
    height: 80px;
  }
}
</style>
