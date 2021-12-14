<template>
  <div class='community-wrap'>
    <div class="info-title">物业</div>
    <div class="content">
      <div class="center-align mb16"
           v-for="(item, index) in dataList"
           :key="index">
        <div class="mb16 community-item-wrap">
          <div class="item center-align mt16">
            <div class="label">
              <span style="color:#ff0000">*</span>
              <span>小区名称</span>
            </div>
            <el-select v-model="item.plotOrgId"
                       class="w240"
                       placeholder="选择小区，可多选">
              <el-option v-for="plot in plotOptions"
                         :key="plot.orgId"
                         :label="plot.orgName"
                         :value="plot.orgId">
              </el-option>
            </el-select>
            <div class="label ml32">
              <span style="color:#ff0000">*</span>
              <span>负责人</span>
            </div>
            <el-input v-model="item.headName"
                      placeholder="输入姓名"
                      maxlength="5"
                      show-word-limit></el-input>
            <div class="label ml32">
              <span style="color:#ff0000">*</span>
              <span>联系电话</span>
            </div>
            <el-input v-model="item.phone"
                      placeholder="输入电话号"></el-input>
          </div>
          <div class="mt16">
            <div class="ml8">文件上传（物业/业委会经费公开等）</div>
            <el-upload class="upload-demo mt16 ml8"
                       action=""
                       :before-upload="beforeUpload"
                       :http-request="e => uploadFileList(e, index)"
                       :on-preview="e => handlePreview(e, index)"
                       :on-remove="e => handleRemove(e, index)"
                       multiple
                       :file-list="item.attachments">
              <div class="center-align ml-12">
                <el-button class="secondary-btn">上传文件</el-button>
                <div class="tl column color-999 ft12 ml16">
                  <p class="lineh1">支持文件格式：word/excel/pdf</p>
                  <p class="lineh1 mt8">文件大小：不超过5M</p>
                </div>
              </div>
            </el-upload>
          </div>
        </div>
        <div>
          <span @click="onAddCommunity(index)">
            <SvgIcon icon="icon_tianjia"
                     v-show="index === dataList.length - 1"
                     class="text-btn ml16 mr8"></SvgIcon>
          </span>
          <span @click="onSubCommunity(index)">
            <SvgIcon icon="icon_jianshao"
                     class="text-btn ml16"
                     v-show="dataList.length >= 2"></SvgIcon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkInput } from '@/utils/validate.js'
import { onShowPreview } from '@v/talent-think-tank-manage/urlPreview.js'
export default {
  name: 'community',
  methods: {
    onShowPreview,
    handleRemove (file, index) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      const attachments = temArr[index].attachments
      attachments.splice(attachments.findIndex(item => item.uid === file.id), 1)
      temArr[index].attachments = attachments
      this.dataList = temArr
    },
    // 预览
    handlePreview (file, index) {
      const url = this.dataList[index].attachments.filter(item => item.uid === file.uid)[0].url
      this.onShowPreview(url)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isTxt = file.type === 'text/plain'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (isJPG) {
        this.$message.warning('上传附件不能是图片格式!')
      }
      if (isTxt) {
        this.$message.warning('上传附件不能是TXT格式!')
      }
      if (!isLt5M) {
        this.$message.warning('上传图片大小不能超过5MB!')
      }
      return !isJPG && !isTxt && isLt5M
    },
    uploadFileList (e, index) {
      const config = {
        uploadType: 'e',
        file: e.file || e
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const obj = {
          name: e.file.name,
          uid: e.file.uid,
          url: res[0],
          sourceType: '04'
        }
        const temArr = JSON.parse(JSON.stringify(this.dataList))
        console.log(this.dataList)
        temArr[index].attachments.push(obj)
        this.dataList = temArr
      })
    },
    onConfirm () {
      for (const i in this.dataList) {
        const item = this.dataList[i]
        if (!item.plotOrgId) {
          return this.showMessage('请选择小区')
        }
        if (!item.headName) {
          return this.showMessage('请填写负责人姓名')
        }
        if (!checkInput(item.phone, 'phone') && !checkInput(item.phone, 'tel')) {
          return this.showMessage('电话信息错误，请检查')
        }
      }
      this.updateJourneyCommunityProperty()
    },
    showMessage (msg) {
      this.$message.warning(msg)
    },
    updateJourneyCommunityProperty () {
      const params = {
        communityOrgId: this.communityOrgId,
        communityProperties: this.dataList
      }
      delete params.plots
      this.$api.updateJourneyCommunityProperty(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('保存成功')
      })
    },
    getList () {
      if (!this.communityOrgId) return
      const params = {
        communityOrgId: this.communityOrgId
      }
      this.$api.findJourneyCommunityPropertyList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        !this.$isEmpty(res.content) ? this.dataList = res.content : this.initDataList()
      })
    },

    initDataList () {
      this.dataList = [
        {
          headName: '',
          name: '',
          phone: '',
          attachments: []
        }
      ]
    },
    onAddCommunity () {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.push({
        name: ''
      })
      this.dataList = temArr
    },
    onSubCommunity (index) {
      const temArr = JSON.parse(JSON.stringify(this.dataList))
      temArr.splice(index, 1)
      this.dataList = temArr
    },

    initRequest () {
      this.getList()
    }
  },
  data () {
    return {
      dataList: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  props: {
    communityOrgId: String,
    orgOptions: {
      type: Array,
      default: () => []
    },
    plotOptions: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.initDataList()
    this.initRequest()
  }
}
</script>

<style lang='scss' scoped>
.community-wrap {
  padding: 70px 100px;
  .content {
    padding: 32px 100px;
  }
  .el-input {
    width: 240px;
  }
  .label {
    width: 70px;
  }
  .community-item-wrap {
    min-width: 1030px;
    padding: 24px;
    background: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
  }
}
/deep/ .el-upload-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .el-upload-list__item {
    width: 30%;
    margin-right: 3%;
  }
}
</style>
