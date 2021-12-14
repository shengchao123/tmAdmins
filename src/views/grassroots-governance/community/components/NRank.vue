<template>
  <div class='good-rank-wrap'>

    <!-- 个人信息弹窗 -->
    <el-dialog :title="rankConfig.title"
               width="656px"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               :visible.sync="rankConfig.showDialog">

      <div class="row between-row mt32 pb32">

        <div class="left column  rb ">
          <div class="ml16"
               style="color:#518cfc">业委会</div>
          <div v-for="(item, index) in rankConfig.list"
               class="mt16"
               :key="index">
            <span class="mr8">{{index + 1}}</span>
            <el-select v-model="item.id"
                       v-if="type !== 3"
                       clearable
                       class="w240"
                       placeholder="请选择">
              <el-option v-for="(line,lineIndex) in rankConfig.finishList"
                         :key="lineIndex"
                         :label="line.name"
                         :disabled="selectedIdsList.includes(line.id)"
                         :value="line.id"></el-option>
            </el-select>
          </div>
        </div>

        <div class="right column">
          <div class="ml16"
               style="color:#518cfc">楼栋长</div>
          <div v-for="(item, index) in rankConfig.list1"
               class="mt16"
               :key="index">
            <span class="mr8">{{index + 1}}</span>
            <el-cascader v-model="item.id"
                         clearable
                         placeholder="请选择"
                         class="w240"
                         :options="rankConfig.finishList1"
                         :props="cascaderProps"></el-cascader>
          </div>
        </div>

      </div>

      <div slot="footer"
           class="mt8">
        <el-button type="primary"
                   @click="onConfirm">确定</el-button>
        <el-button @click="onCancel"
                   class="plain-btn">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'RankList',
  methods: {
    show () {
      this.rankConfig.showDialog = true
      this.rankConfig.title = '好邻里评选'
      this.getData()
      this.getSelectOptions()
    },
    getData () {
      this.$api.findRankingJourneyCommunityOwnerList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temArray = []
        if (!res.content) res.content = []
        for (let i = 0; i < 5; i++) {
          const item = res.content[i] || {}
          temArray.push(item)
        }
        this.rankConfig.list = temArray.sort(function (a, b) { return a.ranking - b.ranking })
      })

      this.$api.findRankingJourneyCommunityBuildingList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temArray = []
        if (!res.content) res.content = []
        for (let i = 0; i < 5; i++) {
          const item = res.content[i] || {}
          temArray.push(item)
        }
        this.rankConfig.list1 = temArray.sort(function (a, b) { return a.ranking - b.ranking })
      })
    },
    getSelectOptions () {
      this.$api.findJourneyCommunityOwnerList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.rankConfig.finishList = res.content.map(item => {
          item.name = item.plotOrgName
          return item
        })
      })

      this.$api.findJourneyCommunityBuildingList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.rankConfig.finishList1 = res.content.map(item => {
          item.name = item.plotOrgName
          return item
        })
      })
    },
    onConfirm () {
      const temArray = this.rankConfig.list.map((item, index) => {
        return {
          id: item.id,
          ranking: index + 1
        }
      })
      const params = {}
      params.journeyCommunityOwnerRankings = temArray.filter(item => item.id)

      this.$api.batchUpdateJourneyCommunityOwnerRanking(params).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.rankConfig.showDialog = false
      })

      const temArray1 = this.rankConfig.list1.map((item, index) => {
        return {
          id: item.id,
          ranking: index + 1
        }
      })

      const params1 = {}
      params1.journeyCommunityBuildingRankings = temArray1.filter(item => item.id)
      this.$api.batchUpdateJourneyCommunityBuildingRanking(params1).then(res => {
        if (res.isError) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('提交成功')
        this.rankConfig.showDialog = false
      })
    },
    onCancel () {
      this.rankConfig.showDialog = false
    }
  },
  computed: {
    selectedIdsList () {
      return this.rankConfig.list.map(item => item.id)
    }
  },
  data () {
    return {
      cascaderProps: {
        value: 'id',
        children: 'buildingContacts',
        label: 'name',
        emitPath: false
      },
      rankConfig: {
        showDialog: false,
        title: '',
        list: [],
        list1: [],
        finishList: [],
        finishList1: []
      },
      communityOrgIdTree: [],
      type: 1
    }
  }
}
</script>

<style lang='scss' scoped>
.good-rank-wrap {
  .rank-wrap {
    padding: 8px 40px 24px 40px;
    flex-wrap: wrap;
  }
  .left {
    padding-left: 30px;
    padding-right: 45px;
    padding-bottom: 15px;
  }
  .right {
    padding-right: 30px;
  }
}
</style>
