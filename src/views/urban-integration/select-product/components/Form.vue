<template>
  <div class='form-wrap pt28'>
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="pl40 pr40"
             label-position="left"
             label-width="76px">
      <div class="b-border">
        <div class="content-wrap pb16">
          <div class="info-title ml24 mb24">基本信息</div>
          <el-form-item label="产品名称"
                        class="ml80"
                        prop="name">
            <el-input v-model="form.data.name"
                      maxlength="20"
                      show-word-limit
                      class="w360 from-input"
                      placeholder="输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="荣誉"
                        class="ml80 pl12"
                        prop="honor">
            <el-input v-model="form.data.honor"
                      maxlength="20"
                      show-word-limit
                      class="w360 ml-12 from-input"
                      placeholder="输入荣誉"></el-input>
          </el-form-item>
          <el-form-item label="品牌"
                        class="ml80 pl12"
                        prop="brand">
            <el-input v-model="form.data.brand"
                      maxlength="20"
                      show-word-limit
                      class="w360 ml-12 from-input"
                      placeholder="输入品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="分类"
                        class="ml80"
                        prop="classification">
            <el-select v-model="form.data.classification"
                       class="w240"
                       placeholder="请选择">
              <el-option v-for="item in classificationOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产地"
                        class="ml80"
                        prop="origin">
            <el-input v-model="form.data.origin"
                      class="w360"
                      type="textarea"
                      maxlength="30"
                      show-word-limit
                      placeholder="输入产地"></el-input>
          </el-form-item>
          <el-form-item label="联系人"
                        class="ml80"
                        prop="contactPerson">
            <el-input v-model="form.data.contactPerson"
                      maxlength="10"
                      show-word-limit
                      class="w240 from-input"
                      placeholder="输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话"
                        class="ml80"
                        prop="contactPhone">
            <el-input v-model="form.data.contactPhone"
                      class="w240"
                      placeholder="输入座机/手机号"></el-input>
          </el-form-item>
          <el-form-item label="线上店铺"
                        class="ml80 pl12"
                        prop="storeName">
            <div class="row">
              <el-input v-model="form.data.storeName"
                        @change="changeStoreName"
                        class="w240 ml-12 from-input"
                        placeholder="输入店铺名称"></el-input>
              <el-form-item prop="firstStoreUrl"
                            class="ml8 no-form-bottom">
                <el-input v-model="form.data.firstStoreUrl"
                          class="w240"
                          placeholder="输入店铺链接"></el-input>
              </el-form-item>
              <el-form-item prop="secondStoreUrl"
                            class="ml8 no-form-bottom">
                <el-input v-model="form.data.secondStoreUrl"
                          class="w240"
                          placeholder="输入店铺链接"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <div class="ft12 color-999 ml156 pb16">*当需要唤起app时，需要配置两个链接，第一个为安卓，第二个为ios，如不需要则配置一个即可</div>
          <el-form-item label="选送单位"
                        class="ml80"
                        prop="publishingDepartment">
            <!-- <span class="ml-12">{{form.data.orgName}}</span> -->
            <el-input v-model="form.data.publishingDepartment"
                      maxlength="10"
                      show-word-limit
                      class="w240 from-input"
                      placeholder="输入选送单位"></el-input>
          </el-form-item>
          <el-form-item label="平台优惠"
                        class="ml80 pl12"
                        prop="platformOffers">
            <el-input v-model="form.data.platformOffers"
                      class="w360 ml-12 form-textarea"
                      type="textarea"
                      maxlength="50"
                      show-word-limit
                      placeholder="输入优惠内容"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="content-wrap">
        <div class="info-title ml24 mb24">图文描述</div>
        <el-form-item label="产品图片"
                      class="ml80"
                      prop="productImages">
          <div class="flex">
            <div v-for="(item,index) in form.data.images"
                 :key="index"
                 class="relative">
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
            <div class="flex"
                 v-if="form.data.images.length < 5">
              <el-upload action=""
                         multiple
                         :limit="5"
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
              <div class="color-999 ft12 ml16">
                <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                <div class="mt8 lineh1">尺寸大小：750*562px</div>
                <div class="mt8 lineh1">宽高比例：4:3</div>
                <div class="mt8 lineh1">图片大小：不大于2M</div>
                <div class="mt8 lineh1">不超过5张</div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="产品详情"
                      class="ml80 h460 product-content"
                      prop="content">
          <quill-editor v-model="form.data.content"
                        :options="editorOption"
                        ref="quillEditor"
                        class="quill-wrap">
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
    </el-form>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle :confirmText="$route.query.journeyProductId ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import pageHandle from '@/components/PageHandle'
import quillEditor from '@/mixins/quillEditor'

import { editorTitleConfig } from './config'
import BigPicture from '@c/BigPictire'
export default {
  name: 'Form',
  mixins: [quillEditor],
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
          this.$route.query.journeyProductId ? this.modifyJourneyProductById(params) : this.createJourneyProduct(params)
        }
      })
    },
    // 新增产品
    createJourneyProduct (params) {
      this.$api.createJourneyProduct(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增产品成功')
        this.$router.back()
      })
    },
    // 编辑产品
    modifyJourneyProductById (params) {
      this.$api.modifyJourneyProductById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑产品成功')
        this.$router.back()
      })
    },
    // 获取分类列表
    findProductClassification () {
      this.$api.findProductClassification().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.classificationOptions = res?.content ?? []
      })
    },
    // 获取产品详情
    getJourneyProductByIdReq (journeyProductId) {
      this.$api.getJourneyProductByIdReq({ journeyProductId }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.form.data = res?.content ?? {}
      })
    },
    // 线上店铺
    changeStoreName () {
      this.form.data.firstStoreUrl = ''
      this.form.data.secondStoreUrl = ''
      this.form.data = JSON.parse(JSON.stringify(this.form.data))
    },

    autotip () { // 符文编辑框的功能显示提示文字
      document.getElementsByClassName('ql-editor')[0].dataset.placeholder = ''
      for (const item of editorTitleConfig) {
        const tip = document.querySelector('.quill-editor ' + item.Choice)
        if (!tip) continue
        tip.setAttribute('title', item.title)
      }
    },
    // 初始化数据
    initData () {
      // this.form.data.orgName = this.orgName
      // this.form.data = JSON.parse(JSON.stringify(this.form.data))
      setTimeout(this.autotip, 400)
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
      // if (this.form.data.images.length >= 5) {
      //   this.$message.warning('最多只能上传5张')
      //   return false
      // }
      return isJPG && isLt2M
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传5张')
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
    }
  },
  data () {
    const validateFirstStoreUrl = (rule, value, callback) => {
      if (!this.$isEmpty(this.form.data.storeName) && this.$isEmpty(value)) {
        return callback(new Error('请输入店铺链接'))
      }
      callback()
    }
    const productImagesRules = (rule, value, callback) => {
      if (this.form.data.images.length === 0) return callback(new Error('请先上传图片'))
      callback()
    }
    return {
      form: {
        rules: {
          name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' }
          ],
          origin: [
            { required: true, message: '请输入产地', trigger: 'blur' }
          ],
          contactPerson: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          classification: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          // firstStoreUrl: [
          //   { validator: validateFirstStoreUrl, trigger: 'blur' }
          // ],
          publishingDepartment: [
            { required: true, message: '请输入选送单位', trigger: 'blur' }
          ],
          productImages: [
            { required: true, validator: productImagesRules, trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入产品详情', trigger: 'change' }
          ]
        },
        data: {
          name: '',
          origin: '',
          contactPerson: '',
          contactPhone: '',
          classification: '',
          firstStoreUrl: '',
          secondStoreUrl: '',
          publishingDepartment: '',
          platformOffers: '',
          images: []
        }
      },
      editorOption: {
        placeholder: '输入正文',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image']
          ]
        }
      },
      addRange: {},
      classificationOptions: []
    }
  },
  components: {
    pageHandle, BigPicture
  },
  created () {
    this.findProductClassification()
    this.initData()
    this.$route.query.journeyProductId && this.getJourneyProductByIdReq(this.$route.query.journeyProductId)
  },
  computed: {
    orgName () {
      return localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
    }
  }
}
</script>

<style lang='scss' scoped>
.form-wrap {
  .ml80 {
    margin-left: 80px;
  }
  .ml156 {
    margin-left: 156px;
  }
  .content-wrap {
    margin: 32px 0 0 166px;
  }
  .h460 {
    height: 450px !important;
  }
  .w360 {
    width: 360px !important;
  }
  .b-border {
    border-bottom: 1px solid #eee;
  }
  .ml-12 {
    margin-left: -12px;
  }
  /deep/ .el-form {
    .from-input .el-input__inner {
      padding: 0 48px 0 8px !important;
    }
    .no-form-bottom.el-form-item {
      margin-bottom: 0 !important;
    }
    .label-color .el-form-item__label {
      color: #999;
    }
    .product-content .el-form-item__content {
      height: 444px;
    }
    .form-textarea textarea {
      height: 82px;
    }
  }
  .lineh1 {
    line-height: 1;
  }
  .product-img {
    width: 150px;
    height: 112px;
    border-radius: 4px;
    margin-right: 16px;
    box-sizing: border-box;
  }
  .upload-img {
    width: 150px;
    height: 112px;
    border-radius: 4px;
    border: 1px solid #dedede;
    box-sizing: border-box;
  }
  .upload-again {
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 24px;
    width: 150px;
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 0 0 4px 4px;
    color: #ffffff;
  }
  .quill-wrap {
    width: 658px;
    height: 362px;
  }
}
</style>
