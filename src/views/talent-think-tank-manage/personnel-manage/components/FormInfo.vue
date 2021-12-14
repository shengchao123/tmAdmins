<template>
  <div class="container mt60">
    <el-form ref="form"
             class="form"
             :rules="form.rules"
             :model="form.data"
             label-width="80px"
             label-position="left">
      <el-form-item label="姓名"
                    prop="name">
        <el-input class="w240"
                  v-model="form.data.name"
                  maxlength="5"
                  show-word-limit
                  placeholder="输入人才姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input-number class="w240"
                         v-model="form.data.phone"
                         :controls="false"
                         placeholder="输入手机号"
                         :disabled="type === 'edit'"></el-input-number>
        <span class="ft12 color-999 ml8">*用于用户登录</span>
      </el-form-item>
      <el-form-item label="头衔"
                    class="pl12">
        <div v-for="(item,index) in form.data.titleList"
             :key="item.id"
             class="ml-12 center-align"
             :style="{marginTop: index === 0 ? '' :'16px'}">
          <el-input v-model="item.value"
                    class="w240 "
                    type="textarea"
                    :rows="2"
                    maxlength="35"
                    show-word-limit
                    placeholder="输入头衔名称">
          </el-input>
          <!-- 最多添至3项 -->
          <span v-show="index !== 2 && index === form.data.titleList.length - 1 "
                @click="onAddTitleItem">
            <svg-icon class="ft16 ml16 primary-color pointer"
                      icon="icon_tianjia">
            </svg-icon>
          </span>
          <span v-show="form.data.titleList.length !== 1"
                @click="onDelTitleItem(item.id)">
            <svg-icon class="ft16 ml16 primary-color pointer"
                      icon="icon_jianshao">
            </svg-icon>
          </span>
        </div>
      </el-form-item>
      <!-- 头像 -->
      <el-form-item label="人物图片"
                    prop="photo">
        <div class="relative">
          <span class="ft12 color-999 tips">建议上传1寸照</span>
          <page-upload-img class="upload-img"
                           :imgUrl.sync="form.data.photo"
                           :config="uploadImgConfig"></page-upload-img>
        </div>
      </el-form-item>
      <el-form-item label="类型"
                    prop="type">
        <el-select class="w240"
                   v-model="form.data.type"
                   placeholder="输入或选择类型"
                   filterable
                   allow-create>
          <el-option v-for="item in personnelTypeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="擅长"
                    prop="specialty">
        <el-input class="w360"
                  v-model="form.data.specialty"
                  type="textarea"
                  :rows="2"
                  maxlength="50"
                  show-word-limit
                  placeholder="比如：蜜桔大棚种植等较为具体的擅长事项"></el-input>
      </el-form-item>
      <el-form-item label="服务方式"
                    prop="serviceType">
        <div class="column">
          <el-checkbox v-model="form.data.isLeaveComments"
                       :disabled="true">
            留言回复<span class="color-999 ft12 ml8">对用户留言进行回复</span>
          </el-checkbox>
          <el-checkbox v-model="form.data.isVisit"
                       class="mt16">
            实地走访<span class="color-999 ft12 ml8">实地上门解决问题，具体事宜需要和用户协商</span>
          </el-checkbox>
          <el-checkbox v-model="form.data.isTelephoneCommunication"
                       class="mt16"
                       @change="changeCheckbox">
            电话沟通<span class="color-999 ft12 ml8">在设置时间内，用户可以拨打您的电话进行沟通</span>
          </el-checkbox>
          <div v-if="form.data.isTelephoneCommunication"
               class="column mt16">
            <div class="flex">
              <span>服务时间</span>
              <div class="flex ml8">
                <el-select class="w120"
                           v-model="contactTimeType"
                           @change="changeSelectType">
                  <el-option label="周一至周五"
                             value="01"></el-option>
                  <el-option label="每天"
                             value="02"></el-option>
                  <el-option label="自定义选择"
                             value="03"></el-option>
                </el-select>
                <div class="ml16"
                     v-if="contactTimeType === '03'">
                  <el-checkbox-group v-model="form.data.openDayList">
                    <el-checkbox v-for="(item,index) in checkboxList"
                                 :key="index"
                                 :label="item.value">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <div class="select-time mt16">
              <div>
                <el-time-select class="w120"
                                placeholder="开始时间"
                                v-model="form.data.startTime"
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
                                v-model="form.data.endTime"
                                prefix-icon="el-icon-date"
                                :picker-options="{
                                  start: '00:00',
                                  step: '00:15',
                                  end: '23:59',
                                  minTime: form.data.startTime
                                }">
                </el-time-select>
              </div>
              <el-form-item label="联系电话"
                            prop="contactPhone"
                            class="mt16"
                            style="margin-bottom: 0px !important">
                <el-input class="w240"
                          v-model="form.data.contactPhone"
                          placeholder="输入电话"></el-input>
                <span class="ft12 color-999 ml8">*用于电话沟通</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="个人简介"
                    prop="introduction"
                    class="introduction">
        <el-input class="w690"
                  v-model="form.data.introduction"
                  type="textarea"
                  :rows="8"
                  maxlength="500"
                  show-word-limit
                  placeholder="请输入介绍文字"></el-input>
      </el-form-item>
    </el-form>
    <page-handle :confirmText="$route.query.id ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import PageHandle from '@/components/PageHandle'
import PageUploadImg from '@/components/PageUploadImg'
import { personnelTypeOptions } from '@u/enum'
import { checkInput } from '@u/validate.js'
export default {
  name: 'Form',
  methods: {
    changeCheckbox (val) {
      if (val) {
        this.form.data.openDayList = [1, 2, 3, 4, 5]
      } else {
        this.form.data.openDayList = []
      }
    },
    changeSelectType (val) {
      this.form.data.openDayList = this.typeTimeMap.get(val)
    },
    // 添加头衔的input项
    onAddTitleItem () {
      const lastItem = this.form.data.titleList[this.form.data.titleList.length - 1]
      const obj = { id: lastItem.id + 1, value: null }
      this.form.data.titleList.push(obj)
    },
    // 删除头像项
    onDelTitleItem (id) {
      const newItem = this.form.data.titleList.filter(item => item.id !== id)
      this.form.data.titleList = newItem
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { isTelephoneCommunication, openDayList, startTime, endTime, titleList } = this.form.data
          if (isTelephoneCommunication) {
            if (this.$isEmpty(openDayList)) {
              this.$message.info('请勾选服务时间')
              return
            }
            if (!startTime || !endTime) {
              this.$message.info('请选择起始时间')
              return
            }
          }
          const { apiName, msg } = this.actionMap.get(!!this.$route.query.id)
          const formData = JSON.parse(JSON.stringify(this.form.data))
          formData.titleList = titleList.map(item => item.value)
          formData.startTime = this.$moment('2021-06-01 ' + startTime).valueOf()
          formData.endTime = this.$moment('2021-06-01 ' + endTime).valueOf()
          delete formData.startTimeStamp
          delete formData.endTimeStamp
          const params = {
            id: this.$route.query.id,
            ...formData
          }
          this.$deleteObjectEmptyAttr(params)
          this.$api[apiName](params).then(res => {
            if (res.isError) {
              this.$message.error(res.message)
              return
            }
            this.$message.success(msg + '人才成功')
            this.$router.back()
          })
        }
      })
    },
    echoTimeType (content) {
      const { isTelephoneCommunication, openDayList } = content
      const newOpenDayList = openDayList + ''
      if (isTelephoneCommunication) {
        if (newOpenDayList === '1,2,3,4,5') {
          this.contactTimeType = '01'
          return
        }
        if (newOpenDayList === '1,2,3,4,5,6,7') {
          this.contactTimeType = '02'
          return
        }
        this.contactTimeType = '03'
      }
    },
    // 根据id获取人才详情
    getJourneyTalentsById (id) {
      this.$api.getJourneyTalentsById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const content = JSON.parse(JSON.stringify(res?.content ?? {}))
        const titleList = []
        res.content.titleList.forEach((item, index) => {
          const obj = {
            id: index,
            value: item
          }
          titleList.push(obj)
        })
        content.titleList = titleList
        this.form.data = content
        this.echoTimeType(content)
      })
    }
  },
  props: {
    type: String
  },
  data () {
    const checkType = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入或选择类型'))
      if (value.length > 10) {
        return callback(new Error('最多输入10个字'))
      }
      callback()
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) return callback(new Error('请输入手机号'))
      if (!checkInput(value, 'phone')) {
        return callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    const checkServiceType = (rule, value, callback) => {
      const { isLeaveComments, isVisit, isTelephoneCommunication } = this.form.data
      if (!isLeaveComments && !isVisit && !isTelephoneCommunication) return callback(new Error('请勾选服务方式'))
      callback()
    }
    const checkContactPhone = (rule, value, callback) => {
      const { isTelephoneCommunication, contactPhone } = this.form.data
      if (isTelephoneCommunication) {
        if (this.$isEmpty(contactPhone)) return callback(new Error('请输入联系电话'))
        if (!checkInput(contactPhone, 'phone') && !checkInput(value, 'tel')) {
          return callback(new Error('请输入正确的联系电话'))
        }
      }
      callback()
    }
    return {
      typeTimeMap: Object.freeze(new Map([
        ['01', [1, 2, 3, 4, 5]],
        ['02', [1, 2, 3, 4, 5, 6, 7]],
        ['03', []]
      ])),
      contactTimeType: '01',
      // 上传头像配置
      uploadImgConfig: Object.freeze({
        width: 120,
        height: 168,
        type: 'medium',
        uploadIcon: 'icon_touxiang',
        iconSize: 32,
        sizeRoom: [0, '2M'],
        sizeText: '不大于2M',
        descriptionList: [
          {
            label: '宽高比例',
            text: '2.5:3.5'
          }
        ],
        iconText: '个人形象照'
      }),
      // 开放日 (1:周一; 2:周二; 3:周三; 4:周四; 5:周五; 6:周六; 7:周日)
      checkboxList: Object.freeze([
        {
          label: '周一',
          value: 1
        },
        {
          label: '周二',
          value: 2
        },
        {
          label: '周三',
          value: 3
        },
        {
          label: '周四',
          value: 4
        },
        {
          label: '周五',
          value: 5
        },
        {
          label: '周六',
          value: 6
        },
        {
          label: '周日',
          value: 7
        }
      ]),
      personnelTypeOptions,
      actionMap: Object.freeze(new Map([
        [true, { apiName: 'modifyJourneyTalents', msg: '修改' }],
        [false, { apiName: 'createJourneyTalents', msg: '新增' }]
      ])),
      form: {
        rules: Object.freeze({
          name: [
            { required: true, message: '请输入人才姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          photo: [
            { required: true, message: '请上传人物图片', trigger: 'change' }
          ],
          type: [
            { required: true, validator: checkType, trigger: 'change' }
          ],
          specialty: [
            { required: true, message: '请输入擅长事项', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, validator: checkServiceType, trigger: 'change' }
          ],
          contactPhone: [
            { required: true, validator: checkContactPhone, trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入个人简介', trigger: 'blur' }
          ]
        }),
        data: {
          name: '',
          phone: undefined,
          photo: '',
          titleList: [
            {
              id: 1,
              value: null
            }
          ],
          type: '',
          specialty: '',
          isLeaveComments: true,
          isVisit: false,
          isTelephoneCommunication: false,
          openDayList: [],
          startTime: '',
          endTime: '',
          contactPhone: undefined,
          introduction: ''
        }
      }
    }
  },
  components: {
    PageHandle,
    PageUploadImg
  },
  created () {
    this.$route.query.id && this.getJourneyTalentsById(this.$route.query.id)
  }
}
</script>
<style lang='scss' scoped>
.w690 {
  width: 690px;
}
.w120 {
  width: 120px !important;
}
.w360 {
  width: 360px;
}
.ml-12 {
  margin-left: -12px;
}
.container {
  .form {
    margin-left: 20%;
    .introduction {
      /deep/ .el-textarea__inner {
        text-align: justify;
        text-align-last: left;
      }
    }
    .upload-img {
      /deep/ .upload-icon {
        color: #eee;
      }
    }
    .tips {
      position: absolute;
      left: 136px;
      top: 22px;
    }

    .select-time {
      margin-left: 64px;
    }
    /deep/ .el-input__inner {
      text-align: left;
    }
  }
}
</style>
