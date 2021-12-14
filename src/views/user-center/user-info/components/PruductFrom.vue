<template>
  <div class="ml65 mt60 mr40">
    <div>
      <el-form ref="productForm"
               :rules="productForm.rules"
               :model="productForm.data"
               label-position="left"
               label-width="105px">
        <div class="bb pl252">
          <div class="info-title ml12">基本信息</div>
          <div class="pb16 mt24 ml65">
            <el-form-item label="产品名称"
                          prop="name">
              <el-input v-model="productForm.data.name"
                        class="w240"
                        maxlength="20"
                        show-word-limit
                        placeholder="输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="商家名称"
                          prop="merchantName">
              <el-input v-model="productForm.data.merchantName"
                        class="w240"
                        maxlength="20"
                        show-word-limit
                        placeholder="输入商家名称"></el-input>
            </el-form-item>
            <el-form-item label="地址"
                          prop="address">
              <el-input v-model="productForm.data.address"
                        class="w240"
                        maxlength="30"
                        show-word-limit
                        placeholder="输入地址"></el-input>
            </el-form-item>
            <el-form-item label="经纬度"
                          prop="lngAndLat">
              <el-input v-model="productForm.data.lng"
                        class="w120"
                        placeholder="输入经度"></el-input>
              <el-input v-model="productForm.data.lat"
                        class="w120 ml16"
                        placeholder="输入纬度"></el-input>
            </el-form-item>
            <el-form-item label="联系人"
                          prop="contactPerson"
                          maxlength="5"
                          show-word-limit
                          class="form-pl">
              <el-input v-model="productForm.data.contactPerson"
                        class="w240"
                        maxlength="15"
                        placeholder="输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话"
                          prop="contactPhone"
                          class="form-pl">
              <el-input v-model="productForm.data.contactPhone"
                        class="w240"
                        placeholder="输入座机/手机号"></el-input>
            </el-form-item>
            <el-form-item label="所需红心值"
                          prop="redHeart"
                          class="form-pl">
              <el-input v-model="productForm.data.redHeart"
                        class="w240"
                        placeholder="输入所需红心值"></el-input>
            </el-form-item>
            <el-form-item label="兑换数量限制"
                          prop="limitNum"
                          class="form-pl">
              <el-input v-model="productForm.data.limitNum"
                        class="w240"
                        placeholder="输入数字"></el-input>
            </el-form-item>
            <el-form-item label="有效期"
                          prop="effectiveTime">
              <el-date-picker class="w240"
                              clearable
                              v-model="effectiveTime"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              prefix-icon="el-icon-date"
                              value-format="timestamp"
                              format="yyyy-MM-dd"
                              :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              <!-- <el-date-picker v-model="effectiveTime"
                              type="daterange"
                              value-format="timestamp"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="节假日配置"
                          prop="useType"
                          class="form-pl">
              <el-radio-group v-model="productForm.data.useType"
                              size="small">
                <el-radio label="01">周末、节假日通用</el-radio>
                <el-radio label="02">周末可用，节假日不可用</el-radio>
                <el-radio label="03">周末，节假日不可用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="pl252">
          <div class="info-title ml12 mt32">图文描述</div>
          <div class="ml65 mt24">
            <div class="landmark-style">
              <el-form-item label="产品图片"
                            prop="images">
                <div class="flex">
                  <div class="flex">
                    <div class="flex w855">
                      <div v-for="(item,index) in productForm.data.images"
                           :key="index"
                           class="relative">
                        <img :src="$fileHost + item.url"
                             alt=""
                             class="landmark-img"
                             @click="lookBigPhoto(productForm.data.images,index)" />
                        <div class="flex center upload-again">
                          <el-upload action=""
                                     accept=".jpeg,.png,.jpg"
                                     :before-upload="e=>beforeHandleUpload(e,1)"
                                     :http-request="e => uploadMaterial(e, '2',index)"
                                     :show-file-list="false">
                            <div class="pointer">重新上传</div>
                          </el-upload>
                          <div class="ml16 pointer"
                               @click="deleteImg(index)">删除</div>
                        </div>
                      </div>
                      <div class="flex"
                           v-if="productForm.data.images.length < 5">
                        <el-upload action=""
                                   multiple
                                   :limit="5"
                                   accept=".jpeg,.png,.jpg"
                                   :before-upload="e=>beforeHandleUpload(e,2)"
                                   :http-request="e => uploadMaterial(e,'2')"
                                   :on-exceed="handleExceed"
                                   :show-file-list="false"
                                   :file-list="productForm.data.images">
                          <div class="upload-img tc pointer">
                            <svg-icon icon="icon_tupian"
                                      class="ft30 color-999 mt32" />
                            <div class="primary-color ft12 lineh1">上传图片</div>
                          </div>
                        </el-upload>
                        <div class="color-999 ft12 ml16">
                          <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                          <div class="mt8 lineh1">尺寸大小：750*562px</div>
                          <div class="mt8 lineh1">宽高比例：4:3</div>
                          <div class="mt8 lineh1">图片大小：不大于2M</div>
                          <div class="mt8 lineh1">不超过5张</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="产品详情"
                            class="pl10 main-text pt16"
                            prop="content">
                <quill-editor v-model="productForm.data.content"
                              :options="editorOption"
                              ref="quillEditor"
                              class="width658 height362">
                </quill-editor>
                <el-upload v-show="false"
                           action=""
                           accept=".jpeg,.png,.jpg,.bmp"
                           ref="editorUpload"
                           :http-request="editorUploadImg"
                           :show-file-list="false">
                  <div id="editorUploadBtn">富文本图片上传</div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <page-handle @onConfirm="confirmHandle"
                 :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
import quillEditor from '@/mixins/quillEditor'
export default {
  data () {
    const lngAndLatRules = (rule, value, callback) => {
      if (!this.productForm.data.lng) return callback(new Error('请输入经度'))
      if (!this.productForm.data.lat) return callback(new Error('请输入纬度'))
      callback()
    }
    const timeRules = (rule, value, callback) => {
      if (!this.effectiveTime) return callback(new Error('请选择日期'))
      callback()
    }
    return {
      productForm: {
        data: {
          name: '',
          merchantName: '',
          address: '',
          lng: '',
          lat: '',
          contactPerson: '',
          contactPhone: '',
          redHeart: '',
          limitNum: '',
          useType: '01',
          images: [],
          content: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          merchantName: [
            { required: true, message: '请输入商家名称', trigger: 'blur' }
          ],
          lngAndLat: [
            { required: true, validator: lngAndLatRules, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          contactPerson: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          redHeart: [
            { required: true, message: '请输入所需红心值', trigger: 'blur' }
          ],
          limitNum: [
            { required: true, message: '请输入兑换数量', trigger: 'blur' }
          ],
          effectiveTime: [
            { required: true, validator: timeRules, trigger: 'change' }
          ],
          useType: [
            { required: true, message: '请选择节假日配置', trigger: 'change' }
          ],
          images: [
            { required: true, message: '请上传产品图片', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入产品详情', trigger: 'blur' }
          ]
        }
      },
      pageHandleConfig: {
        btns: [
          {
            text: this.$route.query.id ? '保存' : '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      },
      effectiveTime: []
    }
  },
  mixins: [quillEditor],
  methods: {
    // 上传之前的限制 图片
    beforeHandleUpload (file, count) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.warning('上传图片只能是 png/jpeg/jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 2MB!')
      }
      if (this.productForm.data.images.length >= 5 && count > 1) {
        this.$message.warning('最多只能上传5张')
        return false
      }
      return isJPG && isLt2M
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传5张')
    },
    // 上传素材(图片)
    uploadMaterial (e, type, index) {
      const config = {
        uploadType: 'm',
        fileType: type,
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.dealUploadData(type, res, index, e.file.name)
      })
    },
    // 处理上传的数据
    dealUploadData (type, res, index, name) {
      if (type === '2') { // 图片
        if (index >= 0) { // 重新上传
          const pointImages = [...this.productForm.data.images]
          pointImages[index].url = res[0]
          pointImages[index].name = name
          this.productForm.data.images = pointImages
        } else { // 上传图片
          const img = { sourceType: '01', name, url: res[0] }
          this.productForm.data.images.push(img)
        }
      }
    },
    // 删除图片
    deleteImg (index) {
      this.productForm.data.images.splice(index, 1)
    },
    // 获取产品详情(编辑接口)
    getPointDetail () {
      const params = {
        journeyRedHeartProductId: this.$route.query.id
      }
      this.$api.getJourneyProductById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.editPointData(res.content)
      })
    },
    // 编辑状态数据处理
    editPointData (res) {
      this.productForm.data = { ...res }
      this.effectiveTime = [res.startTime, res.endTime]
    },
    // 新增、修改产品事件
    confirmHandle () {
      this.$refs.productForm.validate(valid => {
        if (valid) {
          this.savePointData()
        }
      })
    },
    // 保存、修改接口
    savePointData () {
      const journeyRedHeartProductId = this.$route.query.id
      let apiName = 'createJourneyRedHeartProduct'
      const params = this.dealParams()
      if (journeyRedHeartProductId) { // 编辑状态
        apiName = 'modifyJourneyRedHeartProductById'
        params.journeyRedHeartProductId = journeyRedHeartProductId
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(journeyRedHeartProductId ? '编辑成功' : '新增成功')
        this.resetData()
      })
    },
    // 处理数据
    dealParams () {
      const productData = this.productForm.data
      const params = {
        ...productData,
        lng: String(productData.lng).trim(),
        lat: String(productData.lat).trim(),
        startTime: this.effectiveTime[0],
        endTime: this.effectiveTime[1]
      }
      delete params.effectiveTime
      return params
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    },
    // 重置数据
    resetData () {
      this.productForm.data = {
        name: '',
        type: '01',
        lng: '',
        lat: '',
        regionsCode: '',
        address: '',
        contactPerson: '',
        phone: '',
        openDay: [],
        images: [],
        introduction: '',
        journeyScenicSpotAttachmentVoice: { // 音频
          sourceType: '03',
          type: '03',
          url: ''
        },
        journeyScenicSpotAttachmentVR: { // VR链接
          sourceType: '03',
          type: '04',
          url: ''
        }
      }
      this.$store.dispatch('tags/delView', this.$route)
      this.$router.back()
    },
    // 跳转产品详情
    onDetail (row) {
      this.$router.push({ name: 'ProductDetail', query: { journeyProductId: row.journeyProductId } })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getPointDetail()
    }
  },
  components: { PageHandle, BigPicture }
}
</script>
<style lang="scss" scoped>
.pl252 {
  padding-left: 252px;
}
.w690 {
  width: 690px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.w360 {
  width: 360px;
}
.ml65 {
  margin-left: 65px;
}
.mt10 {
  margin-top: 10px;
}
.ml90 {
  margin-left: 90px;
}
.mt60 {
  margin-top: 60px;
}
.lineh1 {
  line-height: 1;
}
.landmark-style {
  /deep/.el-form-item {
    margin-bottom: 0 !important;
  }
  /deep/.el-form-item__error {
    padding-top: 0px;
  }
}
.landmark-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.upload-img {
  width: 150px;
  height: 112px;
  border-radius: 4px;
  border: 1px solid #dedede;
}
.upload-again {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 150px;
  background: rgba($color: #000000, $alpha: 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.voice-setting {
  /deep/.el-radio {
    margin-right: 8px;
  }
  /deep/.el-upload-list {
    width: 400px;
  }
}
.audio-style {
  width: 240px;
  height: 40px;
}
.video-wrap {
  width: 240px;
  height: 135px;
}
.delete-icon {
  align-self: flex-end;
  line-height: 1;
}
.form-pl {
  /deep/.el-form-item__label {
    // padding-left: 10px;
  }
}
.table-box {
  width: 840px;
}
.journey-img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin: 16px 0;
}
.w120 {
  width: 120px !important;
}
.width658 {
  width: 658px;
}
.height362 {
  height: 362px;
  margin-bottom: 75px;
}
</style>
