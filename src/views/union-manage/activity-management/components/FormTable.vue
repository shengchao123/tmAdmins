<template>
  <div class="activity-details-info pb8">
    <el-form class="base-info mt24"
             :rules="rules"
             :model="formData"
             label-width="100px"
             label-position="left"
             ref="formData">
      <el-form-item label="活动类型"
                    prop="type">
        <el-radio-group v-model="formData.type">
          <div class="mt8">
            <el-radio label="01">联盟活动
              <span class="color-999 ml8">联盟内日常活动，只展示在联盟互动活动板块</span>
            </el-radio>
          </div>
          <div class="center-align mt16 restrict">
            <el-radio label="02">特色活动
              <span class="color-999 ml8">联盟大型特色活动，比如民俗体验节，只展示在城乡融合的特色活动板块</span>
            </el-radio>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动名称"
                    prop="name">
        <el-input v-model="formData.name"
                  class="w380"
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <div class="attach-img"
           v-if="formData.type === '02'">
        <el-form-item label="图片"
                      prop="attachmentList">
          <div class="flex">
            <div class="flex">
              <div class="flex w855">
                <div v-for="(item,index) in formData.attachmentList"
                     :key="index"
                     class="relative">
                  <img :src="$fileHost + item.url"
                       alt=""
                       class="landmark-img mb16"
                       @click="lookBigPhoto(formData.attachmentList,index)" />
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
                <div class="flex mb16"
                     v-if="formData.attachmentList.length < 5">
                  <el-upload action=""
                             multiple
                             :limit="5"
                             accept=".jpeg,.png,.jpg"
                             :before-upload="e=>beforeHandleUpload(e,2)"
                             :http-request="e => uploadMaterial(e,'2')"
                             :on-exceed="handleExceed"
                             :show-file-list="false"
                             :file-list="formData.attachmentList">
                    <div class="upload-img tc pointer">
                      <svg-icon icon="icon_tupian"
                                class="ft30 color-999 mt32" />
                      <div class="primary-color ft12 lineh1">上传图片</div>
                    </div>
                  </el-upload>
                  <div class="color-999 ft12 ml16">
                    <div class="mt8 lineh1">支持图片格式：JPEG/JPG/PNG</div>
                    <div class="mt8 lineh1">尺寸大小：750*422px</div>
                    <div class="mt8 lineh1">宽高比例：16:9</div>
                    <div class="mt8 lineh1">图片大小：不大于2M</div>
                    <div class="mt8 lineh1">不超过5张</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </div>
      <el-form-item label="活动简介"
                    prop="introduction">
        <el-input v-model="formData.introduction"
                  class="w690"
                  type="textarea"
                  maxlength="200"
                  rows="5"
                  show-word-limit
                  placeholder="输入简介内容，不超过200个字"></el-input>
      </el-form-item>
      <el-form-item label="组织单位:"
                    prop="orgName"
                    class="org-name form-pl">
        <div>{{orgName(formData.orgName)}}</div>
      </el-form-item>
      <el-form-item label="联系电话"
                    prop="phone">
        <el-input v-model="formData.phone"
                  class="w240"
                  placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="活动地点"
                    prop="address">
        <el-input v-model="formData.address"
                  class="w360"
                  maxlength="20"
                  show-word-limit
                  placeholder="请输入地点"></el-input>
      </el-form-item>
      <el-form-item label="人数限制"
                    prop="num"
                    class="form-pl">
        <div class="flex">
          <el-radio-group v-model="isLimit">
            <div class="mt12">
              <el-radio :label="1">不限制</el-radio>
            </div>
            <div class="center-align mt12 restrict">
              <el-radio :label="2">限制</el-radio>
              <el-input v-model="formData.numberLimit"
                        placeholder="输入人数"></el-input>
            </div>
          </el-radio-group>
          <div class="unit ml8">人</div>
        </div>
      </el-form-item>
      <el-form-item label="活动时间"
                    prop="activityTime">
        <el-date-picker class="w360"
                        clearable
                        v-model="formData.activityTime"
                        type="datetimerange"
                        @change="getActivityTime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        prefix-icon="el-icon-date"
                        value-format="timestamp"
                        format="yyyy-MM-dd HH:mm"
                        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报名截止时间:"
                    prop="activityEndTime"
                    class="org-name ml10">
        <div class="color-999"
             v-if="!formData.activityTime">请先选择活动时间</div>
        <div v-else>
          {{$moment(formData.activityEndTime).format('YYYY-MM-DD HH:mm')}}
        </div>
      </el-form-item>
      <el-form-item label="活动链接"
                    class="ml10">
        <el-input v-model="formData.hrefUrl"
                  class="w240"
                  placeholder="输入活动跳转链接地址"></el-input>
      </el-form-item>
    </el-form>
    <big-picture ref="bigPicture"></big-picture>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'

export default {
  data () {
    const attachImagesRules = (rule, value, callback) => {
      if (this.formData.attachmentList.length === 0) return callback(new Error('请先上传图片'))
      callback()
    }
    return {
      formData: {
        type: '01',
        name: '',
        attachmentList: [],
        introduction: '',
        orgName: '',
        phone: '',
        address: '',
        activityTime: null,
        activityEndTime: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        attachmentList: [
          { required: true, validator: attachImagesRules, trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入活动简介', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        activityTime: [
          { required: true, message: '请输入活动时间', trigger: 'change' }
        ]
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
        ],
        backRouteName: this.$route.query.id ? '' : ''
      },
      isLimit: 2
    }
  },
  methods: {
    onSure () { // 保存、确定按钮
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
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
      this.formData = {
        type: '01',
        name: '',
        attachmentList: [],
        introduction: '',
        orgName: '',
        phone: '',
        address: '',
        activityTime: null,
        activityEndTime: ''
      }
    },
    // 保存、确定接口
    save () {
      const params = this.formData
      params.startTime = params.activityTime[0]
      params.endTime = params.activityTime[1]
      delete params.activityTime
      const talentId = this.$route.query.id
      const apiName = talentId ? 'modifyJourneyActivity' : 'createJourneyActivity'
      if (talentId) {
        params.id = talentId
      }
      if (this.isLimit === 1) { // 不限制人数
        params.numberLimit = -1
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(talentId ? '编辑成功' : '新增成功')
        this.$refs.formData.resetFields()
        this.resetData()
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
    },
    getDetailData () { // 获取详情接口
      const params = {
        id: this.$route.query.id
      }
      const that = this
      this.$api.getJourneyActivityById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        res.content.attachmentList = res.content.activityAttachmentList
        const content = res.content
        that.formData = {
          ...content,
          activityTime: [content.startTime, content.endTime]
        }
        if (content.numberLimit > 0) {
          that.isLimit = 2
        } else {
          that.isLimit = 1
          that.formData.numberLimit = ''
        }
        that.formData.activityEndTime = content.startTime
      })
    },
    // 获取活动时间
    getActivityTime () {
      const activityTime = this.formData.activityTime
      this.formData.activityEndTime = activityTime ? activityTime[0] : null
    },
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
      if (this.formData.attachmentList.length >= 5 && count > 1) {
        this.$message.warning('最多只能上传5张')
        return false
      }
      return isJPG && isLt2M
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
        this.dealUploadData(res, index)
      })
    },
    // 处理上传的数据
    dealUploadData (res, index) {
      if (index >= 0) { // 重新上传
        const pointImages = [...this.formData.attachmentList]
        pointImages[index].url = res[0]
        this.formData.attachmentList = pointImages
      } else { // 上传图片
        const img = { sourceType: '01', url: res[0] }
        this.formData.attachmentList.push(img)
      }
    },
    // 删除图片
    deleteImg (index) {
      this.formData.attachmentList.splice(index, 1)
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传5张')
    }
  },
  computed: {
    orgName () {
      return (name) => {
        return name || localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getDetailData()
    }
  },
  components: { PageHandle, BigPicture }
}
</script>
<style lang='scss' scoped>
.mb2 {
  margin-bottom: 2px;
}
.ml-10 {
  margin-left: -12px;
}
.ml10 {
  margin-left: 10px;
}
.w360 {
  width: 360px;
}
.w380 {
  width: 380px;
}
.w690 {
  width: 690px;
}
.org-name {
  /deep/.el-form-item__label {
    color: #999999 !important;
  }
}
.activity-details-info {
  margin-left: 421px !important;
  margin-top: 60px;
  .base-info {
    margin-left: 70px;
    /deep/ .el-form-item__error {
      padding-top: 0px;
    }
    .activity-cover {
      position: relative;
      margin-right: 16px;
      .delete_icon {
        position: absolute;
        color: #fff;
        bottom: 0;
        right: 0;
        width: 75px;
        z-index: 2;
        p {
          line-height: 24px;
          text-align: right;
        }
      }
      .re-upload {
        box-sizing: border-box;
        width: 100%;
        border-radius: 0 0 4px 4px;
        background: rgba($color: #000000, $alpha: 0.5);
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        height: 24px;
        line-height: 24px;
        text-align: left;
        p {
          color: #fff;
        }
      }
      /deep/ .el-upload {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 80px;
        border: 1px solid #dedede;
        border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
.restrict {
  /deep/.el-radio {
    margin-right: 8px !important;
  }
}
.unit {
  align-self: flex-end;
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
.upload-img {
  width: 199px;
  height: 112px;
  border-radius: 4px;
  border: 1px solid #dedede;
}
.lineh1 {
  line-height: 1;
}
.upload-again {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 199px;
  background: rgba($color: #000000, $alpha: 0.5);
  border-radius: 0 0 4px 4px;
  color: #ffffff;
}
.attach-img {
  /deep/.el-form-item {
    margin-bottom: 0px !important;
  }
}
.form-pl {
  /deep/.el-form-item__label {
    padding-left: 10px;
  }
}
</style>
