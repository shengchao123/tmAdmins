<template>
  <div>
    <el-dialog title="选择农产品"
               width="1020px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="show"
               :before-close="cancelRoute">
      <div class="pt16 pl24 pr24 pb24">
        <div class="flex center mt16">
          <div class="transfer left relative">
            <div class="title">可选农产品</div>
            <el-input placeholder="输入农产品名称"
                      class="search"
                      @clear="searchArea"
                      @keyup.enter.native="searchArea"
                      @blur="searchArea"
                      v-model="keyword">
              <i slot="suffix"
                 class="el-input__icon el-icon-search pointer"
                 @click="searchArea"></i>
            </el-input>
            <el-checkbox-group v-model="selectAreaList"
                               :max="3"
                               class="searchList pl16">
              <div class="item pt16 flex"
                   v-for="(item, index) of areaListData"
                   :key="index">
                <el-checkbox :label="item"></el-checkbox>
                <div class="info pb16">
                  <p class="mb8 ft14 color-333">{{item.journeyProductName}}</p>
                  <div>
                    <span class="value ft12">{{item.orgName}}</span>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
            <div v-if="areaListData.length === 0"
                 class="no-data color-999">未搜到相关农产品</div>
          </div>
          <svg-icon class="icon color-999 ml8 mr8"
                    icon="icon_cujiantou">
          </svg-icon>
          <div class="transfer right relative">
            <div class="title">已选农产品 ({{selectAreaList.length}}/3)</div>
            <div class="selectList"
                 v-if="selectAreaList.length !== 0">
              <div v-for="(item, index) of selectAreaList"
                   :key="index"
                   class="item pt16 pb16 between-row">
                <div>
                  <div class="mb8">{{item.journeyProductName}}</div>
                  <div>
                    <span class="color-666 ft12">{{item.orgName}}</span>
                  </div>
                </div>
                <div @click="deleteLandmark(index)">
                  <svg-icon icon="icon_cha"
                            class="color-999 ft10 ml32 pointer"></svg-icon>
                </div>
              </div>
            </div>
            <div v-if="selectAreaList.length === 0"
                 class="no-data color-999">暂无农产品，请在左侧进行勾选</div>
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
export default {
  data () {
    return {
      show: false,
      administrativeOptions: [],
      areaListData: [],
      selectAreaList: [],
      keyword: ''
    }
  },
  methods: {
    // 确定按钮
    sureRoute () {
      this.$emit('getJourneyData', this.selectAreaList)
      this.show = false
      this.selectAreaList = []
    },
    // 取消按钮
    cancelRoute () {
      this.show = false
      this.selectAreaList = []
    },
    // 获取农产品列表
    getJourneyProductList () {
      this.$api.getJourneyProductList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.administrativeOptions = res.content
        this.areaListData = res.content
      })
    },
    // 筛选出所有农产品列表
    filterScenicSpot () {
      this.areaListData = []
      this.administrativeOptions.forEach(item => {
        this.areaListData = this.areaListData.concat(item)
      })
    },
    // 删除农产品
    deleteLandmark (index) {
      this.selectAreaList.splice(index, 1)
    },
    // 搜索农产品名称
    searchArea () {
      const list = this.administrativeOptions
      const keyword = this.keyword
      const arr = []
      if (this.keyword === '') {
        this.filterScenicSpot()
        return
      }
      list.forEach(item => {
        if (item.journeyProductName.includes(keyword)) {
          arr.push(item)
        }
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
    width: 240px;
    height: 32px;
    margin: 16px 0 0 16px;
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
          color: #666;
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
