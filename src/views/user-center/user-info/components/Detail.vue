<template>
  <div>
    <div class="mt60 ml307">
      <div class="info-title bold ft16 mb24">基本信息</div>
      <img :src="noteStatus(productData)"
           alt=""
           class="note-status"
           v-if="isShowStatus(productData)">
      <div class="ml65">
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">产品名称：</div>
          <div>{{productData.name}}</div>
          <div class="error-color ml16"
               v-if="productData.status === 2">已隐藏</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">商家名称：</div>
          <div>{{productData.merchantName}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">地址：</div>
          <div>{{productData.address}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">经纬度：</div>
          <div>{{productData.lng}},{{productData.lat}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">联系人：</div>
          <div>{{productData.contactPerson}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">联系电话：</div>
          <div>{{productData.contactPhone}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">所需红心值：</div>
          <div>{{productData.redHeart}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">兑换数量限制：</div>
          <div>{{productData.limitNum}}</div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">有效期：</div>
          <div>
            {{$moment(productData.startTime).format('YYYY-MM-DD')}} 至
            {{$moment(productData.endTime).format('YYYY-MM-DD')}}
          </div>
        </div>
        <div class="center-align mb24">
          <div class="color-999 w70 mr8">节假日配置：</div>
          <div>{{productData.useTypeName}}</div>
        </div>
      </div>
      <div class="pl252">
        <div class="info-title ml12 mt32">图文描述</div>
        <div class="ml65 mt24">
          <div class="flex mb24">
            <div class="color-999 w70 mr8">产品图片:</div>
            <div class="w700 f-wrap">
              <div v-for="(item,index) in productData.images"
                   :key="index">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="issue-img mr16 mb24"
                     @click="lookImage(productData.images,index)">
              </div>
            </div>
          </div>
          <div class="flex mb32">
            <div class="color-999 w70 mr8">产品详情：</div>
            <div class="w760 lheight"
                 v-html="productData.content">
            </div>
          </div>
        </div>
      </div>
    </div>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle @onConfirm="onConfirm"
                 :config="pageHandleConfig"></page-handle>
  </div>
</template>
<script>
import BigPicture from '@c/BigPictire'
import PageHandle from '@c/PageHandle'

export default {
  data () {
    return {
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
      },
    }
  },
  methods: {
    onConfirm () {
      console.log('shuchu')
      this.$router.push({ name: 'ShopProductEdit', query: { id: this.$route.query.id } })
    },
    // 查看大图
    lookImage (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      let imgs = imgList.map(item => item.url)
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgs[index]
      bigPicture.photoList = imgs
      bigPicture.showPicture = true
    }
  },
  props: {
    productData: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    // 展示已隐藏或者已删除的图片
    noteStatus () {
      return (val) => {
        if (val.status === 3) return require('@/assets/noteManage/deleted.png')
      }
    },
    // 是否展示已删除图片
    isShowStatus () {
      return (val) => {
        return val.status === 3
      }
    }
  },
  components: { BigPicture, PageHandle }
}
</script>
<style lang="scss" scoped>
.note-status {
  position: absolute;
  top: 140px;
  right: 550px;
  width: 60px;
  height: 60px;
}
.mt60 {
  margin-top: 60px;
}
.ml65 {
  margin-left: 65px;
}
.ml307 {
  margin-left: 307px;
}
.mr60 {
  margin-right: 60px;
}
.w170 {
  width: 170px;
}
.w760 {
  width: 760px;
}
.w70 {
  width: 105px;
}
.head-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
.goods-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
.issue-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}
.designation {
  font-size: 10px;
  transform: scale(0.9);
  background: #fc8d11;
  color: #ffffff;
  padding: 4px;
  border-radius: 2px;
}
.w700 {
  width: 700px;
}
.lheight {
  line-height: 1.5;
}
</style>
