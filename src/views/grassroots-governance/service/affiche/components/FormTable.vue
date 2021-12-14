<template>
  <div class="activity-details-info pb8">
    <el-form class="base-info mt24"
             :rules="rules"
             :model="formData"
             label-width="100px"
             label-position="left"
             ref="formData">
      <el-form-item label="公告标题"
                    prop="title">
        <el-input v-model="formData.title"
                  class="w380 limit"
                  maxlength="30"
                  show-word-limit
                  placeholder="请输入公告标题"></el-input>
      </el-form-item>

      <el-form-item label="图片"
                    prop="imgUrl">
        <page-upload-img :imgUrl.sync="formData.imgUrl"
                         :config="pageUploadImgConfig"></page-upload-img>
      </el-form-item>
      <el-form-item label="公告内容"
                    prop="content">
        <el-input v-model="formData.content"
                  class="w690"
                  type="textarea"
                  rows="5"
                  maxlength="500"
                  show-word-limit
                  placeholder="输入简介内容，不超过500个字"></el-input>
      </el-form-item>
      <el-form-item label="组织单位"
                    prop="name"
                    class="org-name form-pl">
        <div>{{orgName}}</div>
      </el-form-item>
      <el-form-item label="展示位置"
                    prop="advPositionId">
        <el-select v-model="formData.advPositionId"
                   @change="changePoistion"
                   class="w240"
                   placeholder="请选择显示顺序">
          <el-option v-for="item in positionOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示时间"
                    prop="afficheTime">
        <el-date-picker class="w360"
                        clearable
                        v-model="formData.afficheTime"
                        type="datetimerange"
                        @change="getAfficheTime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        prefix-icon="el-icon-date"
                        value-format="timestamp"
                        format="yyyy-MM-dd HH:mm"
                        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>

    </el-form>
    <page-handle @onConfirm="onSure"
                 :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
import PageUploadImg from '@c/PageUploadImg'
export default {
  methods: {
    changePoistion () {
      this.formData.afficheTime = ''
    },
    getAfficheTime () {
      if (!this.formData.advPositionId) {
        this.$message.warning('请先选择展示位置')
        return
      }
      const params = {
        advPositionId: this.formData.advPositionId,
        endTime: this.formData.afficheTime[1],
        startTime: this.formData.afficheTime[0]
      }
      this.$api.checkJourneyAdvertisementByTime(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        if (res.subCode === 'CHECK_FAIL') {
          this.showErrorTime = true
          return
        }
        this.showErrorTime = false
      })
    },
    onSure () { // 保存、确定按钮
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    // 保存、确定接口
    save () {
      const params = JSON.parse(JSON.stringify(this.formData))
      if (params.afficheTime) {
        params.startTime = params.afficheTime[0]
        params.endTime = params.afficheTime[1]
        delete params.afficheTime
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.insertJourneyAdvertisement(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增成功')
        this.$router.back()
        this.$store.dispatch('tags/delView', this.$route) // 删除当前tab标签页
      })
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
        this.formData.imgUrl = res[0]
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
      return isJPG && isLt2M
    },
    // 查看大图
    lookBigPhoto (imgList, index) {
      const bigPicture = this.$refs.bigPicture
      bigPicture.photoIndex = index
      bigPicture.nowPhoto = imgList[index].url
      bigPicture.photoList = imgList.map((item) => item.url)
      bigPicture.showPicture = true
    }
  },
  data () {
    const checkTime = (rule, value, callback) => {
      const { afficheTime } = this.formData
      if (this.showErrorTime) {
        return callback(new Error('设置时间有重叠，请先修改其他公告时间'))
      }
      if (!afficheTime) return callback(new Error('请选择公告时间'))
      callback()
    }
    return {
      pageUploadImgConfig: {
        width: 224,
        height: 112,
        sizeRoom: [0, 2],
        accept: '.jpeg, .png, .jpg',
        uploadFileParams: { uploadType: 'm', fileType: 2 },
        iconSize: 30,
        sizeText: '不大于2M',
        descriptionList: [
          { label: '尺寸大小', text: '686*340px' },
          { label: '宽高比例', text: '2:1' }
        ]
      },
      positionOptions: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        }
      ],
      formData: {
        title: '',
        content: '',
        afficheTime: [],
        orgName: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        afficheTime: [
          { required: true, message: '请选择展示时间', trigger: 'change' },
          { required: true, validator: checkTime, trigger: 'change' }
        ],
        advPositionId: [
          { required: true, message: '请选择位置', trigger: 'change' }
        ]

      },
      pageHandleConfig: {
        btns: [
          {
            text: '确定',
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
      deliveryOptions: [{ name: '所有用户', id: '01' }, { name: '特定用户', id: '02' }],
      labelOptions: [],
      photoData: {
        imgs: '',
        index: 0
      },
      isPircture: false
    }
  },
  computed: {
    orgName () {
      return localStorage.getItem('orgName') || this.$store.state.app.currentOrg.name
    }
  },
  components: { PageHandle, BigPicture, PageUploadImg }
}
</script>
<style lang='scss' scoped>
.mb2 {
  margin-bottom: 2px;
}
.w380 {
  width: 380px;
}
.w690 {
  width: 690px;
}
.ml176 {
  margin-left: 176px;
}
.w855 {
  width: 855px;
  flex-wrap: wrap;
}
.landmark-img {
  width: 320px;
  height: 112px;
  border-radius: 4px;
  margin-right: 16px;
  margin-bottom: 16px;
}
.lineh1 {
  line-height: 1;
}
.upload-img {
  width: 320px;
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
.activity-details-info {
  margin-left: 111px !important;
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
.label-item {
  margin-left: 16px;
  /deep/.el-checkbox-button__inner {
    background: #f9f9f9;
    border: 1px solid #dedede;
    border-radius: 4px !important;
    padding: 7px 8px;
  }
}
.check-label {
  /deep/.el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #666666;
    background: rgba(83, 139, 253, 0.08);
  }
}
.org-name {
  /deep/.el-form-item__label {
    color: #999999 !important;
  }
}
.form-pl {
  /deep/.el-form-item__label {
    padding-left: 10px;
  }
}
</style>
