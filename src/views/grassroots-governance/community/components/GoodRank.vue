<template>
  <div class='good-rank-wrap'>
    <el-button type="primary"
               @click="onRank(1)">好支部评选</el-button>
    <el-button type="primary"
               @click="onRank(2)">好管家评选</el-button>
    <el-button type="primary"
               @click="onRank(3)">好邻里评选</el-button>

    <!-- 个人信息弹窗 -->
    <el-dialog :title="rankConfig.title"
               width="656px"
               :close-on-click-modal="false"
               :modal-append-to-body="false"
               :close-on-press-escape="false"
               :visible.sync="rankConfig.showDialog">

      <div class="rank-wrap between-row">
        <div v-for="(item, index) in rankConfig.list"
             class="mt16"
             :key="index">
          <span class="mr8">{{index + 1}}</span>
          <el-select v-model="item.id"
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

      <div slot="footer"
           class="mt8">
        <el-button type="primary"
                   @click="onConfirm">确定</el-button>
        <el-button @click="onCancel"
                   class="plain-btn">取消</el-button>
      </div>
    </el-dialog>

    <NRank ref="rank"></NRank>
  </div>
</template>

<script>
import NRank from '@/views/grassroots-governance/community/components/NRank'
const CONFIG = new Map([
  [1, { title: '好支部评选', apiName: 'findRankingJourneyCommunityPartyList', optionsApiName: 'findJourneyCommunityPartyList', batchApiName: 'batchUpdateJourneyCommunityPartyRanking', updateKey: 'journeyCommunityPartyRankings' }],
  [2, { title: '好管家评选', apiName: 'findRankingJourneyCommunityStewardList', optionsApiName: 'findJourneyCommunityStewardList', batchApiName: 'batchUpdateJourneyCommunityStewardRanking', updateKey: 'journeyCommunityStewardRankings' }]
])

let config = {}
export default {
  name: 'RankList',
  methods: {
    onRank (type) {
      if (type !== 3) {
        this.type = type
        config = CONFIG.get(type)
        this.rankConfig.showDialog = true
        this.rankConfig.title = config.title
        this.getData()
        this.getSelectOptions()
        return
      }
      this.$refs.rank.show()
    },
    getData (type) {
      const apiName = config.apiName
      this.$api[apiName]().then(res => {
        if (res.isError) return this.$message.error(res.message)
        const temArray = []
        if (!res.content) res.content = []
        for (let i = 0; i < 10; i++) {
          const item = res.content[i] || {}
          temArray.push(item)
        }
        this.rankConfig.list = temArray.sort(function (a, b) { return a.ranking - b.ranking })
      })
    },
    getSelectOptions () {
      const apiName = config.optionsApiName
      this.$api[apiName]().then(res => {
        if (res.isError) return this.$message.error(res.message)
        if (this.type === 3) {
          this.rankConfig.finishList = res.content.map(item => {
            item.name = item.plotOrgName
            return item
          })
          return
        }
        this.rankConfig.finishList = res.content || []
      })
    },
    onConfirm () {
      if (this.$isEmpty(this.rankConfig.list)) {
        this.rankConfig.showDialog = false
        return
      }
      const temArray = this.rankConfig.list.map((item, index) => {
        return {
          id: item.id,
          ranking: index + 1
        }
      })
      const params = {}
      params[config.updateKey] = temArray.filter(item => item.id)
      const apiName = config.batchApiName
      this.$api[apiName](params).then(res => {
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
  components: { NRank },
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
        finishList: []
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
}
</style>
