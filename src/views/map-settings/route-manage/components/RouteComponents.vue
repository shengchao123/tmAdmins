<template>
  <div>
    <div class="ml560 mt60">
      <el-form ref="routeDataForm"
               :rules="routeDataForm.rules"
               :model="routeDataForm.data"
               class="mt24"
               label-position="left"
               label-width="75px">
        <div class="ml65">
          <el-form-item label="名称"
                        prop="name">
            <el-input v-model="routeDataForm.data.name"
                      class="w240"
                      maxlength="15"
                      show-word-limit
                      placeholder="输入路线名称"></el-input>
          </el-form-item>
          <el-form-item label="游玩时长"
                        prop="playTime">
            <el-select v-model="routeDataForm.data.playTime"
                       class="w120"
                       placeholder="请选择">
              <el-option v-for="item in VisitRouteOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路地标"
                        prop="visitData">
            <div class="steps"
                 v-if="routeDataForm.data.journeyPointList.length > 0">
              <div v-for="(item,index) in routeDataForm.data.journeyPointList"
                   :key="index"
                   class="flex steps-item">
                <div class="mr24 relative">
                  <div class="step color-999 relative">{{index + 1}}</div>
                  <div class="line"
                       v-if="routeDataForm.data.journeyPointList.length > (index + 1)"></div>
                </div>
                <div class="w387">
                  <div class="between-row lineh1">
                    <div>{{item.name}}({{item.code}})</div>
                    <div class="primary-color flex">
                      <div class="flex tl w36">
                        <div class="color-999 ft20 mr16 pointer"
                             v-if="routeDataForm.data.journeyPointList.length > (index + 1)"
                             @click="onDemotion(index,routeDataForm.data.journeyPointList)">↓</div>
                        <div class="color-999 ft20 pointer"
                             v-if="index > 0"
                             @click="onUpgrade(index,routeDataForm.data.journeyPointList)">↑</div>
                      </div>
                      <div @click="addRoute(index)"
                           class="ml32 pointer">
                        <svg-icon icon="icon_tianjia"
                                  class="primary-color ft16"></svg-icon>
                      </div>
                      <div @click="deleteRoute(index)"
                           v-if="routeDataForm.data.journeyPointList.length > 1"
                           class="ml32 pointer">
                        <svg-icon icon="icon_jianshao"
                                  class="primary-color ft16"></svg-icon>
                      </div>
                    </div>
                  </div>
                  <div class="color-999 mt8 lineh1">行政区域：{{item.regionsName}}</div>
                </div>
              </div>
            </div>
            <div class="primary-color pointer"
                 v-else>
              <el-button class="secondary-btn"
                         v-if="$hasAuth($urls.getJourneyPointList)"
                         @click="addRoute">选择地标</el-button>
            </div>
          </el-form-item>
          <el-form-item label="行政区域"
                        prop="regionsCode">
            <el-select v-model="routeDataForm.data.regionsCode"
                       class="w240"
                       placeholder="请选择">
              <el-option v-for="item in regionsCodeOptions"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <div class="color-999 mt8 ml75">*若是跨多区域的可以选择自定义</div>
        </div>
      </el-form>
    </div>
    <route-dialog ref="routeDialog"
                  @getRouteData="getRouteData"></route-dialog>
    <page-handle @onConfirm="confirmHandle"
                 :config="pageHandleConfig"></page-handle>
  </div>
</template>
<script>
import { VisitRouteOptions } from '@u/enum'
import RouteDialog from './RouteDialog'
import PageHandle from '@c/PageHandle'

export default {
  data () {
    const visutRules = (rule, value, callback) => {
      if (this.routeDataForm.data.journeyPointList.length === 0) return callback(new Error('请选择景点'))
      callback()
    }
    return {
      VisitRouteOptions: VisitRouteOptions,
      regionsCodeOptions: [],
      routeDataForm: {
        data: {
          name: '',
          playTime: '',
          journeyPointList: [],
          regionsCode: ''
        },
        rules: {
          name: [
            { required: true, message: '请路线名称', trigger: 'blur' }
          ],
          playTime: [
            { required: true, message: '请选择游玩时长', trigger: 'change' }
          ],
          visitData: [
            { required: true, validator: visutRules, trigger: ['blur', 'change'] }
          ],
          regionsCode: [
            { required: true, message: '请选择行政区域', trigger: 'change' }
          ]
        }
      },
      pageHandleConfig: {
        btns: [
          {
            text: this.$route.query.journeyLineId ? '保存' : '确定',
            type: 'primary',
            event: 'onConfirm'
          },
          {
            text: '取消',
            event: 'cancel'
          }
        ]
      },
      addIndex: null
    }
  },
  methods: {
    // 保存、确定按钮
    confirmHandle () {
      this.$refs.routeDataForm.validate(valid => {
        if (valid) {
          this.saveRouteData()
        }
      })
    },
    // 保存、确定接口
    saveRouteData () {
      let apiName = 'createJourneyLine'
      const lineId = this.$route.query.journeyLineId
      const params = {
        journeyPointIds: this.routeDataForm.data.journeyPointList.map((item) => item.journeyPointId),
        ...this.routeDataForm.data,
        type: '01'
      }
      if (params.regionsCode === 'custom') delete params.regionsCode
      delete params.journeyPointList
      if (lineId) {
        apiName = 'modifyJourneyLine'
      }
      this.$api[apiName](params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success(lineId ? '编辑成功' : '新增成功')
        this.resetData()
      })
    },
    // 重置数据
    resetData () {
      this.routeDataForm.data = {
        name: '',
        playTime: '',
        journeyPointList: [],
        regionsCode: 'custom'
      }
      this.$store.dispatch('tags/delView', this.$route)
      this.$router.back()
    },
    // 获取路线详情接口
    getRouteDetail () {
      const params = {
        journeyLineId: this.$route.query.journeyLineId
      }
      this.$api.getJourneyLineById(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.routeDataForm.data = { ...res.content }
        if (res.content.regionsCode === '') this.routeDataForm.data.regionsCode = 'custom'
        this.routeDataForm.data = JSON.parse(JSON.stringify(this.routeDataForm.data))
      })
    },
    // 删除路线
    deleteRoute (index) {
      this.routeDataForm.data.journeyPointList.splice(index, 1)
    },
    // 添加路线
    addRoute (index) {
      const routeDialog = this.$refs.routeDialog
      routeDialog.show = true
      routeDialog.type = this.routeDataForm.data.type
      routeDialog.getAdministrativeList()
      this.addIndex = index
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
    // 获取选中的路线
    getRouteData (data) {
      const arrayList = JSON.parse(JSON.stringify(this.routeDataForm.data.journeyPointList))
      const len = this.routeDataForm.data.journeyPointList.length
      const residue = len - (this.addIndex + 1)// 剩余的数组数量
      const beforeArray = arrayList.slice(0, this.addIndex + 1).concat(data)
      const afterArray = arrayList.splice(-residue, residue) // 取后几位
      this.routeDataForm.data.journeyPointList = beforeArray.concat(afterArray)
    },
    // 获取行政区域列表
    getJourneyRegionsList () {
      this.$api.getJourneyRegionsList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temItem = {
          code: 'custom',
          name: '自定义'
        }
        const content = res?.content ?? []
        this.regionsCodeOptions = [temItem, ...content]
      })
    }
  },
  created () {
    this.getJourneyRegionsList()
    if (this.$route.query.journeyLineId) {
      this.getRouteDetail()
    }
  },
  components: { RouteDialog, PageHandle }
}
</script>
<style lang="scss" scoped>
.w120 {
  width: 120px;
}
.w36 {
  width: 36px;
}
.ml560 {
  margin-left: 560px;
}
.ml75 {
  margin-left: 75px;
}
.mt60 {
  margin-top: 60px;
}
.lineh1 {
  line-height: 1;
}
.steps {
  .step {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid;
    border-radius: 50%;
    background: #fff;
    z-index: 1;
  }
  .line {
    position: absolute;
    border-left: 1px dashed #999999;
    top: 0;
    bottom: 0;
    left: 12px;
    z-index: 0;
  }
  .w387 {
    width: 387px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 28px;
  }
  .steps-item:last-child .w387 {
    margin-bottom: 0px;
  }
}
</style>
