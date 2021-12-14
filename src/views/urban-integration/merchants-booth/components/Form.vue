<template>
  <div class='form-wrap pt28'>
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="pl40 pr40 pb8"
             label-position="left"
             label-width="90px">
      <div class="b-border">
        <div class="content-wrap pb16">
          <div class="info-title ml24 mb24">基本信息</div>
          <el-form-item label="展位标题"
                        class="ml80"
                        prop="title">
            <el-input v-model="form.data.title"
                      maxlength="15"
                      show-word-limit
                      class="w240 from-input"
                      placeholder="输入展位标题"></el-input>
          </el-form-item>
          <el-form-item label="适宜人群"
                        class="ml80"
                        prop="appropriateCrowd">
            <el-checkbox-group v-model="form.data.appropriateCrowd">
              <el-checkbox v-for="item in appropriateCrowdOptions"
                           :key="item.id"
                           :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="服务内容"
                        class="ml80"
                        prop="serviceContent">
            <el-checkbox-group v-model="form.data.serviceContent"
                               class="w644">
              <el-checkbox v-for="item in serviceContentOptions"
                           :key="item.id"
                           :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="地址"
                        class="ml80"
                        prop="address">
            <el-input v-model="form.data.address"
                      class="w360"
                      type="textarea"
                      maxlength="30"
                      show-word-limit
                      placeholder="输入地址"></el-input>
          </el-form-item>
          <el-form-item label="经纬度"
                        class="ml80"
                        required>
            <div class="row">
              <el-form-item prop="lng"
                            class="no-form-bottom">
                <el-input v-model="form.data.lng"
                          class="w120"
                          placeholder="输入经度"></el-input>
              </el-form-item>
              <el-form-item prop="lat"
                            class="ml16 no-form-bottom">
                <el-input v-model="form.data.lat"
                          class="w120"
                          placeholder="输入纬度"></el-input>
              </el-form-item>
            </div>

          </el-form-item>
          <el-form-item label="联系电话"
                        class="ml80"
                        prop="contactPhone">
            <el-input v-model="form.data.contactPhone"
                      class="w240"
                      placeholder="输入座机/手机号"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="content-wrap">
        <div class="info-title ml24 mb24">图文描述</div>
        <el-form-item label="展位图片"
                      class="ml80"
                      prop="productImages">
          <div class="flex flex-wrap"
               :class="form.data.images.length>5 ? 'w715' : 'w850'">
            <div v-for="(item,index) in form.data.images"
                 :key="index"
                 class="relative mt16">
              <div class="pointer"
                   @click="lookBigPhoto(form.data.images,index)">
                <img :src="$fileHost + item.url"
                     alt=""
                     class="product-img" />
              </div>
              <div class="flex center upload-again">
                <el-upload action=""
                           accept=".jpeg,.png,.jpg"
                           :before-upload="beforeHandleUpload"
                           :http-request="e => uploadMaterial(e, '2',index)"
                           :show-file-list="false">
                  <div class="pointer">重新上传</div>
                </el-upload>
                <div class="ml16 pointer"
                     @click="deleteImg(index)">删除</div>
              </div>
            </div>
            <div class="flex mt16"
                 v-if="form.data.images.length < 9">
              <el-upload action=""
                         multiple
                         :limit="9"
                         accept=".jpeg,.png,.jpg"
                         :before-upload="beforeHandleUpload"
                         :http-request="e => uploadMaterial(e,'2')"
                         :on-exceed="handleExceed"
                         :show-file-list="false"
                         :file-list="form.data.images">
                <div class="upload-img tc pointer">
                  <svg-icon icon="icon_tupian"
                            class="ft30 color-999 mt32" />
                  <div class="primary-color ft12 lineh1">上传图片</div>
                </div>
              </el-upload>
              <div class="color-999 ft12 ml16 center-justify column">
                <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                <div class="mt8 lineh1">图片大小：不大于2M</div>
                <div class="mt8 lineh1">不超过9张</div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="展位介绍"
                      class="ml80"
                      prop="introduction">
          <el-input v-model="form.data.introduction"
                    class="w690"
                    type="textarea"
                    maxlength="500"
                    show-word-limit
                    placeholder="输入展位介绍"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle :confirmText="$route.query.journeyMerchantBoothId ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import BigPicture from '@c/BigPictire'
export default {
  name: 'Form',
  methods: {
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form.data
          }
          params.images.map(item => {
            delete item.status
            delete item.uid
          })
          this.$deleteObjectEmptyAttr(params)
          this.modifyJourneyMerchantBoothById(params)
        }
      })
    },
    // 编辑展位
    modifyJourneyMerchantBoothById (params) {
      this.$api.modifyJourneyMerchantBoothById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑展位成功')
        this.$router.back()
      })
    },
    // 获取展位详情
    getJourneyMerchantBoothById (journeyMerchantBoothId) {
      this.$api.getJourneyMerchantBoothById({ journeyMerchantBoothId }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.form.data = res?.content ?? {}
        const { appropriateCrowd, serviceContent } = this.form.data
        this.form.data.appropriateCrowd = Array.from(appropriateCrowd, ({ type }) => type)
        this.form.data.serviceContent = Array.from(serviceContent, ({ type }) => type)
        this.form.data = JSON.parse(JSON.stringify(this.form.data))
      })
    },
    // 上传之前的限制 图片
    beforeHandleUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传图片只能是 png/jpeg/jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 2MB!')
      }
      // if (this.form.data.images.length >= 9) {
      //   this.$message.warning('最多只能上传9张')
      //   return false
      // }
      return isJPG && isLt2M
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传9张')
    },
    // 上传素材(图片和音频、视频)
    uploadMaterial (e, type, index) {
      const config = {
        uploadType: 'm',
        fileType: type,
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dealUploadData(res, index)
      })
    },
    // 处理上传的数据
    dealUploadData (res, index) {
      if (index >= 0) { // 重新上传
        const pointImages = [...this.form.data.images]
        pointImages[index].url = res[0]
        this.form.data.images = pointImages
      } else { // 上传图片
        const img = { sourceType: '01', url: res[0] }
        this.form.data.images.push(img)
      }
    },
    // 删除图片
    deleteImg (index) {
      this.form.data.images.splice(index, 1)
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
    const productImagesRules = (rule, value, callback) => {
      if (this.form.data.images.length === 0) return callback(new Error('请先上传图片'))
      callback()
    }
    return {
      form: {
        rules: {
          title: [
            { required: true, message: '请输入展位标题', trigger: 'blur' }
          ],
          appropriateCrowd: [
            { required: true, message: '请选择适宜人群', trigger: 'change' }
          ],
          serviceContent: [
            { required: true, message: '请选择服务内容', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          lng: [
            { required: true, message: '请输入经度', trigger: 'blur' }
          ],
          lat: [
            { required: true, message: '请输入纬度', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          productImages: [
            { required: true, validator: productImagesRules, trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入展位介绍', trigger: 'blur' }
          ],
        },
        data: {
          title: '',
          appropriateCrowd: [],
          serviceContent: [],
          address: '',
          lng: '',
          lat: '',
          contactPhone: '',
          introduction: '',
          images: []
        }
      },
      appropriateCrowdOptions: Object.freeze([
        {
          id: '01',
          name: '家庭游'
        },
        {
          id: '02',
          name: '亲子游'
        },
        {
          id: '03',
          name: '团建拓展'
        },
        {
          id: '04',
          name: '朋友聚会'
        },
        {
          id: '05',
          name: '情侣游'
        },
        {
          id: '06',
          name: '夕阳红'
        },
        {
          id: '07',
          name: '研学团队'
        },
        {
          id: '08',
          name: '散客'
        }
      ]),
      serviceContentOptions: Object.freeze([
        {
          id: '01',
          name: '吃饭'
        },
        {
          id: '02',
          name: '住宿'
        },
        {
          id: '03',
          name: '免费停车'
        },
        {
          id: '04',
          name: '烧烤'
        },
        {
          id: '05',
          name: '采摘'
        },
        {
          id: '06',
          name: '钓鱼'
        },
        {
          id: '07',
          name: '骑马'
        },
        {
          id: '08',
          name: '戏水'
        },
        {
          id: '09',
          name: '露营'
        },
        {
          id: '10',
          name: '摄影摄像'
        },
        {
          id: '11',
          name: '酒店服务'
        },
        {
          id: '12',
          name: '游乐设施'
        },
        {
          id: '13',
          name: '研学'
        },
        {
          id: '14',
          name: '森林疗愈'
        },
        {
          id: '15',
          name: '手工坊'
        },
        {
          id: '16',
          name: '酒吧'
        },
        {
          id: '17',
          name: '观影'
        },
        {
          id: '18',
          name: '草坪活动'
        },
        {
          id: '19',
          name: '体验'
        },
        {
          id: '20',
          name: '参观'
        }
      ])
    }
  },
  components: {
    pageHandle, BigPicture
  },
  created () {
    this.getJourneyMerchantBoothById(this.$route.query.journeyMerchantBoothId)
  }
}
</script>

<style lang='scss' scoped>
.flex-wrap {
  flex-wrap: wrap;
}
.w644 {
  width: 644px;
}
/deep/ .el-checkbox {
  color: #333;
  margin-right: 24px;
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #333;
  }
}
.form-wrap {
  .ml80 {
    margin-left: 80px;
  }
  .content-wrap {
    margin: 32px 0 0 166px;
  }
  .w690 {
    width: 690px !important;
    /deep/ textarea {
      height: 250px;
    }
  }
  .w850 {
    width: 850px !important;
    margin-top: -16px;
  }
  .w715 {
    width: 715px !important;
    margin-top: -16px;
  }
  .w360 {
    width: 360px !important;
  }
  .b-border {
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-form {
    .from-input .el-input__inner {
      padding: 0 48px 0 8px !important;
    }
    .no-form-bottom.el-form-item {
      margin-bottom: 0 !important;
    }
  }
  .lineh1 {
    line-height: 1;
  }
  .product-img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    margin-right: 16px;
    box-sizing: border-box;
  }
  .upload-img {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    border: 1px solid #dedede;
    box-sizing: border-box;
  }
  .upload-again {
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 24px;
    width: 120px;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 0 0 4px 4px;
    color: #ffffff;
  }
}
</style>
