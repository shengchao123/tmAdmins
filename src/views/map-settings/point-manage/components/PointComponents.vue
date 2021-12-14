<template>
  <div class="ml65 mt60 mr40">
    <div>
      <el-form ref="pointDataForm"
               :rules="pointDataForm.rules"
               :model="pointDataForm.data"
               label-position="left"
               label-width="90px">
        <div class="bb pl252">
          <div class="info-title ml12">基本信息</div>
          <div class="pb16 mt24 ml65">
            <el-form-item label="名称"
                          prop="name">
              <el-input v-model="pointDataForm.data.name"
                        class="w240"
                        maxlength="15"
                        show-word-limit
                        placeholder="输入点位名称"></el-input>
            </el-form-item>
            <el-form-item label="功能分类"
                          prop="type">
              <el-select v-model="pointDataForm.data.type"
                         class="w240"
                         placeholder="选择">
                <el-option v-for="item in functionType"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经纬度"
                          prop="lngAndLat">
              <el-input v-model="pointDataForm.data.lng"
                        class="w120"
                        placeholder="输入经度"></el-input>
              <el-input v-model="pointDataForm.data.lat"
                        class="w120 ml16"
                        placeholder="输入纬度"></el-input>
            </el-form-item>
            <el-form-item label="行政区域"
                          prop="regionsCode">
              <el-select v-model="pointDataForm.data.regionsCode"
                         class="w240"
                         placeholder="选择">
                <el-option v-for="item in areaOptions"
                           :key="item.code"
                           :label="item.name"
                           :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址"
                          prop="address">
              <el-input v-model="pointDataForm.data.address"
                        class="w240"
                        placeholder="输入地址"></el-input>
            </el-form-item>
            <el-form-item label="联系人"
                          prop="contactPerson"
                          class="form-pl">
              <el-input v-model="pointDataForm.data.contactPerson"
                        class="w240"
                        maxlength="15"
                        placeholder="输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话"
                          prop="phone"
                          class="form-pl">
              <el-input v-model="pointDataForm.data.phone"
                        class="w240"
                        placeholder="输入座机/手机号"></el-input>
            </el-form-item>
            <el-form-item label="开放时间"
                          prop="openDay">
              <div class="flex">
                <el-select class="w120"
                           v-model="openTimeType"
                           @change="changeSelectType">
                  <el-option label="周一至周五"
                             value="01"></el-option>
                  <el-option label="每天"
                             value="02"></el-option>
                  <el-option label="自定义选择"
                             value="03"></el-option>
                </el-select>
                <div class="ml16"
                     v-if="openTimeType === '03'">
                  <el-checkbox-group v-model="pointDataForm.data.openDay">
                    <el-checkbox v-for="(item,index) in weekList"
                                 :key="index"
                                 :label="item.id">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div>
                <el-time-select class="w120 mt16"
                                placeholder="开始时间"
                                v-model="pointDataForm.data.startTime"
                                prefix-icon="el-icon-date"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:15',
                                  end: '23:59'
                                }">
                </el-time-select>
                <span class="ml8 mr8">至</span>
                <el-time-select class="w120"
                                placeholder="结束时间"
                                v-model="pointDataForm.data.endTime"
                                prefix-icon="el-icon-date"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:15',
                                  end: '23:59',
                                  minTime: pointDataForm.data.startTime
                                }">
                </el-time-select>
              </div>
            </el-form-item>
            <el-form-item label="农产品展示"
                          prop="farmProducts"
                          v-if="pointDataForm.data.type === '03'">
              <div>
                <el-button class="secondary-btn"
                           v-if="$hasAuth($urls.getJourneyProductList)"
                           @click="onAddProduct">选择</el-button>
                <span class="color-999 ml8">限选3个</span>
              </div>
              <div>
                <page-table :data="table.data"
                            isShowIndex
                            :col-configs="table.colConfig"
                            class="table-box mt16"
                            v-if="table.data.length > 0">
                  <el-table-column slot="production"
                                   label="农产品"
                                   min-width="300">
                    <template slot-scope="scope">
                      <div class="center-align">
                        <img :src="$fileHost + scope.row.journeyProductImage"
                             mode="scaleToFill"
                             class="journey-img" />
                        <div class="text-btn ml16"
                             @click="onDetail(scope.row)">{{scope.row.journeyProductName}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column slot="sort"
                                   label="排序"
                                   width="80">
                    <div slot-scope="scope"
                         class="flex">
                      <div class="color-999 ft20 mr16 pointer"
                           v-if="table.data.length > (scope.$index + 1)"
                           @click="onDemotion(scope.$index,table.data)">↓</div>
                      <div class="color-999 ft20 pointer"
                           v-if="scope.$index > 0"
                           @click="onUpgrade(scope.$index,table.data)">↑</div>
                    </div>
                  </el-table-column>
                  <el-table-column slot="operate"
                                   label="操作"
                                   width="85">
                    <template slot-scope="scope">
                      <span class="text-btn"
                            @click="onDelete(scope)">删除</span>
                    </template>
                  </el-table-column>
                </page-table>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="pl252">
          <div class="info-title ml12 mt32">地标详情</div>
          <div class="ml65 mt24">
            <el-form-item label="地标视频"
                          prop="videoUrl"
                          class="form-pl">
              <div class="voice-setting">
                <div>
                  <el-upload action=""
                             accept=".mp4,.mpeg,.avi,.navi,.asf,.wmv,.mov,.3gp"
                             :before-upload="beforeUploadVideo"
                             :http-request="e => uploadMaterial(e,'3')"
                             :show-file-list="true"
                             ref="uploadVideo">
                    <div class="flex">
                      <el-button class="secondary-btn">
                        {{pointDataForm.data.journeyScenicSpotAttachmentVideo?'重新上传':'上传视频'}}</el-button>
                      <div class="ft12 color-999 ml8 tl">
                        <div class="lineh1">1. 建议尺寸比例：16:9，大小不超过500M</div>
                        <div class="lineh1 mt4">2. MP4、MPEG、AVI、nAVI、ASF、WMV、MOV、3GP</div>
                      </div>
                    </div>
                  </el-upload>
                  <div v-if="pointDataForm.data.journeyScenicSpotAttachmentVideo"
                       class="flex">
                    <video :src="$fileHost + pointDataForm.data.journeyScenicSpotAttachmentVideo.url"
                           class="video-wrap mt8 b"
                           controls="controls">您的浏览器不支持视频播放</video>
                    <div class="delete-icon mt8"
                         @click="deleteVideo">
                      <svg-icon icon="icon_shanchu"
                                slot="reference"
                                class="ft16 color-999 pointer ml12"></svg-icon>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <div class="landmark-style">
              <el-form-item label="地标图片"
                            prop="pointImages">
                <div class="flex">
                  <div class="flex">
                    <div class="flex w855">
                      <div v-for="(item,index) in pointDataForm.data.journeyScenicSpotAttachmentImagesList"
                           :key="index"
                           class="relative">
                        <img :src="$fileHost + item.url"
                             alt=""
                             class="landmark-img"
                             @click="lookBigPhoto(pointDataForm.data.journeyScenicSpotAttachmentImagesList,index)" />
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
                           v-if="pointDataForm.data.journeyScenicSpotAttachmentImagesList.length < 9">
                        <el-upload action=""
                                   multiple
                                   :limit="9"
                                   accept=".jpeg,.png,.jpg"
                                   :before-upload="e=>beforeHandleUpload(e,2)"
                                   :http-request="e => uploadMaterial(e,'2')"
                                   :on-exceed="handleExceed"
                                   :show-file-list="false"
                                   :file-list="pointDataForm.data.journeyScenicSpotAttachmentImagesList">
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
                          <div class="mt8 lineh1">不超过9张</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="介绍"
                          prop="introduction">
              <el-input v-model="pointDataForm.data.introduction"
                        type="textarea"
                        rows="6"
                        maxlength="1500"
                        show-word-limit
                        class="w690"
                        placeholder="输入介绍文字"></el-input>
            </el-form-item>
            <el-form-item label="语音导览"
                          prop="voiceUrl">
              <div class="voice-setting">
                <div>
                  <el-radio v-model="pointDataForm.data.journeyScenicSpotAttachmentVoice.type"
                            label="03">配置链接</el-radio>
                  <el-input v-model="settingLink"
                            class="w360"
                            placeholder="输入配置链接"></el-input>
                </div>
                <div class="mt16">
                  <div class="flex">
                    <el-radio v-model="pointDataForm.data.journeyScenicSpotAttachmentVoice.type"
                              label="02"
                              class="mt10">上传音频</el-radio>
                    <div class="flex">
                      <el-upload action=""
                                 accept=".mp3,.wav,.wma,.amr"
                                 :before-upload="beforeUploadVoice"
                                 :http-request="e => uploadMaterial(e,'4')"
                                 :show-file-list="true"
                                 ref="uploadAudio">
                        <div class="flex">
                          <el-button class="secondary-btn">{{uploadVoiceLink?'重新上传':'上传音频'}}</el-button>
                          <div class="ft12 color-999 ml8 tl">
                            <div class="lineh1">大小不超过2M；播放长度不超过60s</div>
                            <div class="lineh1 mt4">仅支持mp3/wma/wav/amr格式</div>
                          </div>
                        </div>
                      </el-upload>
                    </div>
                  </div>
                  <div class="center-align"
                       v-if="uploadVoiceLink">
                    <audio :src="$fileHost + uploadVoiceLink"
                           controls
                           class="audio-style ml90 mt8" />
                    <div class="mt8"
                         @click="deleteAudio">
                      <svg-icon icon="icon_shanchu"
                                slot="reference"
                                class="ft16 color-999 pointer ml12"></svg-icon>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="VR链接"
                          prop="VRUrl"
                          class="form-pl">
              <el-input v-model="pointDataForm.data.journeyScenicSpotAttachmentVR.url"
                        class="w360"
                        placeholder="输入链接"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <page-handle @onConfirm="confirmHandle"
                 :config="pageHandleConfig"></page-handle>
    <big-picture ref="bigPicture"></big-picture>
    <journey-dialog ref="journeyDialog"
                    @getJourneyData="getJourneyData"></journey-dialog>
  </div>
</template>
<script>
import PageHandle from '@c/PageHandle'
import BigPicture from '@c/BigPictire'
import PageTable from '@c/PageTable'
import JourneyDialog from './JourneyDialog'
import { journeyProduct, pointType } from '@u/enum.js'
const typeTimeMap = Object.freeze(new Map([
  ['01', [1, 2, 3, 4, 5]],
  ['02', [1, 2, 3, 4, 5, 6, 7]],
  ['03', []]
]))
export default {
  data () {
    const lngAndLatRules = (rule, value, callback) => {
      if (!this.pointDataForm.data.lng) return callback(new Error('请输入经度'))
      if (!this.pointDataForm.data.lat) return callback(new Error('请输入纬度'))
      callback()
    }
    const voiceUrlRules = (rule, value, callback) => {
      if (this.pointDataForm.data.journeyScenicSpotAttachmentVoice.type === '03') {
        if (!this.settingLink) return callback(new Error('请输入配置链接'))
      } else {
        if (!this.uploadVoiceLink) return callback(new Error('请上传音频'))
      }
      callback()
    }
    const pointImagesRules = (rule, value, callback) => {
      if (this.pointDataForm.data.journeyScenicSpotAttachmentImagesList.length === 0) return callback(new Error('请先上传图片'))
      callback()
    }
    const openDayRules = (rule, value, callback) => {
      const { openDay, startTime, endTime } = this.pointDataForm.data
      if (openDay.length === 0) return callback(new Error('请选择开放的时间'))
      if (!(startTime && endTime)) return callback(new Error('请选择具体的时间点'))
      callback()
    }
    const productRules = (rule, value, callback) => {
      if (this.table.data.length === 0) return callback(new Error('请选择农产品'))
      callback()
    }
    return {
      pointDataForm: {
        data: {
          name: '',
          type: '01',
          lng: '',
          lat: '',
          regionsCode: '',
          address: '',
          contactPerson: '',
          phone: '',
          openDay: [],
          startTime: '08:30',
          endTime: '17:00',
          journeyScenicSpotAttachmentImagesList: [],
          introduction: '',
          journeyScenicSpotAttachmentVoice: {
            sourceType: '03',
            type: '03',
            url: ''
          }, // 音频
          journeyScenicSpotAttachmentVR: {}, // VR链接
          journeyScenicSpotAttachmentVideo: null// 视频
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择名称', trigger: 'change' }
          ],
          lngAndLat: [
            { required: true, validator: lngAndLatRules, trigger: 'blur' }
          ],
          regionsCode: [
            { required: true, message: '请选择行政区域', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          openDay: [
            { required: true, validator: openDayRules, trigger: 'change' }
          ],
          farmProducts: [
            { required: true, validator: productRules, trigger: 'change' }
          ],
          pointImages: [
            { required: true, validator: pointImagesRules, trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入介绍文字', trigger: 'blur' }
          ],
          voiceUrl: [
            { required: true, validator: voiceUrlRules, trigger: 'blur' }
          ]
        }
      },
      functionType: pointType,
      areaOptions: [],
      pageHandleConfig: {
        btns: [
          {
            text: this.$route.query.journeyPointId ? '保存' : '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      },
      settingLink: '',
      uploadVoiceLink: '',
      weekList: Object.freeze([
        { name: '周一', id: 1 },
        { name: '周二', id: 2 },
        { name: '周三', id: 3 },
        { name: '周四', id: 4 },
        { name: '周五', id: 5 },
        { name: '周六', id: 6 },
        { name: '周日', id: 7 }
      ]),
      table: {
        data: [],
        colConfig: journeyProduct
      },
      openTimeType: null
    }
  },
  methods: {
    // 选择开放时间
    changeSelectType (val) {
      this.pointDataForm.data.openDay = typeTimeMap.get(val)
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
      if (this.pointDataForm.data.journeyScenicSpotAttachmentImagesList.length >= 9 && count > 1) {
        this.$message.warning('最多只能上传9张')
        return false
      }
      return isJPG && isLt2M
    },
    // 上传之前的限制 视频
    beforeUploadVideo (file) {
      const videoList = ['video/mpeg', 'video/avi', 'video/asf', 'video/wmv', 'video/mov', 'video/3gp', 'video/mp4', 'video/quicktime', 'video/x-ms-asf', 'video/x-ms-wmv', 'video/3gpp']
      const isVideo = videoList.includes(file.type)
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isVideo) {
        this.$message.warning('上传视频只能是 MP4、MPEG、AVI、nAVI、ASF、WMV、MOV、3GP格式!')
        return false
      }
      if (!isLt500M) {
        this.$message.warning('上传视频大小不能超过 500MB!')
      }
      return isVideo && isLt500M
    },
    // 上传之前的限制 音频
    beforeUploadVoice (file) {
      const isVoice = file.type === 'audio/mp3' || file.type === 'audio/wav' || file.type === 'audio/wma' || file.type === 'audio/amr' || file.type === 'audio/mpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isVoice) {
        this.$message.warning('上传音频只能是 mp3/wma/wav/amr 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.warning('上传音频大小不能超过 2MB!')
        return false
      }
      return isVoice && isLt2M
    },
    // 超出限制的回调
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传9张')
      // const imgs = Array.from(files).slice(0, 9)
      // imgs.forEach(item => {
      //   this.uploadImg(item)
      // })
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
        this.dealUploadData(type, res, index)
      })
    },
    // 处理上传的数据
    dealUploadData (type, res, index) {
      if (type === '2') { // 图片
        if (index >= 0) { // 重新上传
          const pointImages = [...this.pointDataForm.data.journeyScenicSpotAttachmentImagesList]
          pointImages[index].url = res[0]
          this.pointDataForm.data.journeyScenicSpotAttachmentImagesList = pointImages
        } else { // 上传图片
          const img = { sourceType: '01', type: '01', url: res[0] }
          this.pointDataForm.data.journeyScenicSpotAttachmentImagesList.push(img)
        }
      } else if (type === '3') { // 视频
        const video = { sourceType: '02', type: '05', url: res[0] }
        this.pointDataForm.data.journeyScenicSpotAttachmentVideo = video
      } else { // 音频
        this.uploadVoiceLink = res[0]
      }
    },
    // 删除图片
    deleteImg (index) {
      this.pointDataForm.data.journeyScenicSpotAttachmentImagesList.splice(index, 1)
    },
    // 删除视频
    deleteVideo () {
      this.$refs.uploadVideo.clearFiles()
      this.pointDataForm.data.journeyScenicSpotAttachmentVideo = null
    },
    // 删除音频
    deleteAudio () {
      this.$refs.uploadAudio.clearFiles()
      this.uploadVoiceLink = null
    },
    // 获取行政区域列表
    getRegionsList () {
      this.$api.getJourneyRegionsList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.areaOptions = res.content ?? []
      })
    },
    // 获取点位详情(编辑接口)
    getPointDetail () {
      const params = {
        journeyPointId: this.$route.query.journeyPointId
      }
      this.$api.getJourneyPointById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.editPointData(res.content)
      })
    },
    // 编辑状态数据处理
    editPointData (res) {
      this.pointDataForm.data = { ...res }
      const pointData = this.pointDataForm.data
      this.table.data = pointData.journeyProductList
      const voiceData = pointData.journeyScenicSpotAttachmentVoice
      const vr = pointData.journeyScenicSpotAttachmentVR
      if (voiceData.type === '02') { // 上传语音链接
        this.uploadVoiceLink = voiceData.url
      } else { // 配置链接
        this.settingLink = voiceData.url
      }
      if (!vr) {
        this.pointDataForm.data.journeyScenicSpotAttachmentVR = {
          sourceType: '03',
          type: '04',
          url: ''
        }
      }
      this.getOpenTime(res)
    },
    // 处理开放时间下拉框数据
    getOpenTime (content) {
      const { openDay } = content
      const newOpenDayList = openDay + ''
      if (openDay.length > 0) {
        if (newOpenDayList === '1,2,3,4,5') {
          this.openTimeType = '01'
          return
        }
        if (newOpenDayList === '1,2,3,4,5,6,7') {
          this.openTimeType = '02'
          return
        }
        this.openTimeType = '03'
      }
    },
    // 新增、修改点位事件
    confirmHandle () {
      this.$refs.pointDataForm.validate(valid => {
        if (valid) {
          this.savePointData()
        }
      })
    },
    // 保存、修改接口
    savePointData () {
      const pointId = this.$route.query.journeyPointId
      let apiName = 'createJourneyPoint'
      const params = this.dealParams()
      if (pointId) { // 编辑状态
        apiName = 'modifyJourneyPoint'
        params.journeyPointId = pointId
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(pointId ? '编辑成功' : '新增成功')
        this.resetData()
      })
    },
    // 处理数据
    dealParams () {
      const pointData = this.pointDataForm.data
      const params = {
        ...pointData,
        lng: String(pointData.lng).trim(),
        lat: String(pointData.lat).trim()
      }
      params.journeyProductIds = this.table.data.map((item) => item.journeyProductId)
      if (params.journeyScenicSpotAttachmentVoice.type === '02') { // 上传音频文件
        const voice = { sourceType: '03', type: '02', url: this.uploadVoiceLink }
        params.journeyScenicSpotAttachmentVoice = voice
      } else { // 配置链接
        const link = { sourceType: '03', type: '03', url: this.settingLink }
        params.journeyScenicSpotAttachmentVoice = link
      }
      if (!params.journeyScenicSpotAttachmentVR.url) {
        params.journeyScenicSpotAttachmentVR = {}
      }
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
      this.pointDataForm.data = {
        name: '',
        type: '01',
        lng: '',
        lat: '',
        regionsCode: '',
        address: '',
        contactPerson: '',
        phone: '',
        openDay: [],
        journeyScenicSpotAttachmentImagesList: [],
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
    // 获取勾选的农产品
    getJourneyData (productList) {
      this.table.data = productList
    },
    // 农产品弹窗
    onAddProduct () {
      const table = this.table.data
      const journeyDialog = this.$refs.journeyDialog
      if (table.length === 0 || this.$route.query.journeyPointId) {
        journeyDialog.getJourneyProductList()
      }
      journeyDialog.selectAreaList = table
      journeyDialog.show = true
    },
    // 删除农产品按钮
    onDelete (row) {
      this.table.data.splice(row.$index, 1)
    },
    // 向上排序
    onUpgrade (index, list) {
      if (index !== 0) {
        list[index] = list.splice(index - 1, 1, list[index])[0]
      } else {
        list.push(list.shift())
      }
    },
    // 向下排序
    onDemotion (index, list) {
      if (index !== list.length - 1) {
        list[index] = list.splice(index + 1, 1, list[index])[0]
      } else {
        list.unshift(list.splice(index, 1)[0])
      }
    },
    // 跳转产品详情
    onDetail (row) {
      this.$router.push({ name: 'ProductDetail', query: { journeyProductId: row.journeyProductId } })
    }
  },
  created () {
    this.getRegionsList()
    if (this.$route.query.journeyPointId) {
      this.getPointDetail()
    }
  },
  components: { PageHandle, BigPicture, JourneyDialog, PageTable }
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
    padding-left: 10px;
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
</style>
