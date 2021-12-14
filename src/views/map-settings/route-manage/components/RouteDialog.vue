<template>
  <div>
    <el-dialog title="选择地标"
               width="1020px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="show"
               :before-close="cancelRoute">
      <div class="pt16 pl24 pr24 pb24">
        <div class="ml60">
          <div class="flex center-align">
            <div class="mr8">行政区域</div>
            <el-select v-model="journeyIndex"
                       class="w120"
                       clearable
                       placeholder="全部区域"
                       @change="selectRegion">
              <el-option v-for="(item,index) in administrativeOptions"
                         :key="index"
                         :label="item.regionsName"
                         :value="index"></el-option>
            </el-select>
          </div>
        </div>
        <div class="flex center mt16">
          <div class="transfer left relative">
            <div class="title">可选地标</div>
            <div class="center-align ml16 mt16">
              <el-select v-model="pType"
                         class=" search"
                         clearable
                         placeholder="类型选择"
                         @change="searchArea">
                <el-option v-for="item in pointType"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
              <el-input placeholder="输入行政区域名称"
                        class="ml16 search"
                        @clear="searchArea"
                        clearable
                        @keyup.enter.native="searchArea"
                        @blur="searchArea"
                        v-model="keyword">
                <i slot="suffix"
                   class="el-input__icon el-icon-search pointer"
                   @click="searchArea"></i>
              </el-input>
            </div>
            <el-checkbox-group v-model="selectAreaList"
                               :max="10"
                               class="searchList pl16">
              <div class="item pt16 flex"
                   v-for="(item, index) of areaListData"
                   :key="index">
                <el-checkbox :label="item"></el-checkbox>
                <div class="info pb16">
                  <p class="mb8 ft14 color-333">{{item.name}}({{item.code}})</p>
                  <div>
                    <span class="label">行政区域：</span>
                    <span class="value mr40">{{item.regionsName}}</span>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
            <div v-if="areaListData.length === 0"
                 class="no-data color-999">未搜到相关地标</div>
          </div>
          <svg-icon class="icon color-999 ml8 mr8"
                    icon="icon_cujiantou">
          </svg-icon>
          <div class="transfer right relative">
            <div class="title">已选地标 ({{selectAreaList.length}}/10)</div>
            <div class="selectList"
                 v-if="selectAreaList.length !== 0">
              <div v-for="(item, index) of selectAreaList"
                   :key="index"
                   class="item pt16 pb16 between-row">
                <div>
                  <div class="mb8">{{item.name}} ({{item.code}})</div>
                  <div>
                    <span class="color-999">行政区域：</span> {{item.name}}
                  </div>
                </div>
                <div @click="deleteLandmark(index)">
                  <svg-icon icon="icon_cha"
                            class="color-999 ft10 ml32 pointer"></svg-icon>
                </div>
              </div>
            </div>
            <div v-if="selectAreaList.length === 0"
                 class="no-data color-999">暂无地标，请在左侧进行勾选</div>
          </div>
        </div>
        <div slot="footer"
             class="center mt24">
          <el-button type="primary"
                     @click="sureRoute">确定</el-button>
          <el-button @click="cancelRoute"
                     class="plain-btn">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { pointType } from '@/utils/enum'

export default {
  data () {
    return {
      pointType,
      show: false,
      type: '',
      administrativeOptions: [],
      journeyIndex: null,
      areaListData: [],
      selectAreaList: [],
      keyword: '',
      pType: ''
    }
  },
  methods: {
    // 确定按钮
    sureRoute () {
      this.$emit('getRouteData', this.selectAreaList)
      this.show = false
      this.selectAreaList = []
    },
    // 取消按钮
    cancelRoute () {
      this.show = false
      this.selectAreaList = []
    },
    // 获取行政区域列表
    getAdministrativeList () {
      const params = {
        type: this.type
      }
      this.$api.getJourneyPointList(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.administrativeOptions = res.content
        this.filterScenicSpot()
      })
    },
    // 筛选出所有景点列表
    filterScenicSpot () {
      this.areaListData = []
      this.administrativeOptions.forEach(item => {
        this.areaListData = this.areaListData.concat(item.journeyPointList)
        this.oldList = this.areaListData
      })
    },
    // 选择区域
    selectRegion () {
      this.pType = ''
      this.keyword = ''
      const journeyIndex = this.journeyIndex
      if (!this.$isEmpty(journeyIndex)) {
        this.areaListData = this.administrativeOptions[journeyIndex].journeyPointList
        this.oldList = this.areaListData
      } else {
        this.filterScenicSpot()
      }
    },
    // 删除地标
    deleteLandmark (index) {
      this.selectAreaList.splice(index, 1)
    },
    // 搜索区域名称
    searchArea () {
      const keyword = this.keyword
      const type = this.pType
      const arr = []
      console.log(this.keyword, this.pType)
      if (!keyword && !type) return this.selectRegion
      this.oldList.forEach(item => {
        const hasType = type === item.type
        const hasKeyword = item.name.includes(keyword)
        const hasAll = type && keyword && item.name.includes(keyword) && type === item.type
        if (hasAll) arr.push(item)
        if (type && !keyword && hasType) arr.push(item)
        if (!type && keyword && hasKeyword) arr.push(item)
      })
      this.areaListData = arr
    }
  }
}
</script>
<style lang="scss" scoped>
.transfer {
  width: 42%;
  height: 468px;
  border: 1px solid #dedede;
  border-radius: 4px;
}
.left {
  .search {
    width: 180px;
    height: 32px;
  }
  .searchList {
    height: 381px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    .item {
      width: 101%;
      /deep/ .el-checkbox__label {
        display: none;
      }
      .el-checkbox {
        vertical-align: top;
      }
      .info {
        vertical-align: top;
        display: inline-block;
        width: 350px;
        padding-right: 10px;
        box-sizing: border-box;
        margin-left: 8px;
        border-bottom: solid 1px #dedede;
        .label {
          font-size: 14px;
          color: #999;
        }
        .value {
          font-size: 14px;
          color: #333;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none !important;
    }
  }
}
.right {
  overflow: hidden;
  .selectList {
    width: 100%;
    height: 428px;
    padding: 0px 16px 0;
    box-sizing: border-box;
    overflow-y: scroll;
    .item {
      border-bottom: solid 1px #dedede;
      .info {
        width: 90%;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        .label {
          font-size: 14px;
          color: #999;
        }
        .value {
          font-size: 14px;
          color: #333;
        }
      }
      .ico {
        vertical-align: middle;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    &::-webkit-scrollbar {
      display: none !important;
    }
  }
}
.title {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 40px;
  border-bottom: solid 1px #dedede;
  background: #f9f9f9;
  border-radius: 4px 4px 0 0;
}
.no-data {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ml60 {
  margin-left: 60px;
}
.ft10 {
  font-size: 10px;
}
</style>
