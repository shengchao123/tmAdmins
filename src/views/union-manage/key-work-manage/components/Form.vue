<template>
  <div class="mt60 center-justify">
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="w552"
             label-position="left"
             label-width="76px">
      <el-form-item label="党建联盟"
                    prop="journeyAllianceId">
        <el-select v-model="form.data.journeyAllianceId"
                   class="w240"
                   placeholder="选择党建联盟">
          <el-option v-for="item in journeyAllianceOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年度"
                    prop="year">
        <el-date-picker v-model="form.data.year"
                        type="year"
                        class="w240"
                        format="yyyy"
                        value-format="yyyy"
                        placeholder="选择年">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作内容"
                    prop="content"
                    v-if="$route.query.id">
        <el-input v-model="form.data.content"
                  class="w400"
                  type="textarea"
                  maxlength="100"
                  show-word-limit
                  :rows="4"
                  placeholder="输入工作内容"></el-input>
      </el-form-item>
      <el-form-item label="工作内容"
                    required
                    v-else>
        <div class="row"
             v-for="(item,index) in form.data.contentArr"
             :key="index">
          <el-form-item :prop="`contentArr.${index}.content`"
                        :rules="form.rules.content">
            <el-input v-model="item.content"
                      class="w400"
                      type="textarea"
                      maxlength="100"
                      show-word-limit
                      :rows="4"
                      placeholder="输入工作内容"></el-input>
          </el-form-item>
          <div class="ml16">
            <span @click="addOneContent"
                  v-show="index === form.data.contentArr.length-1">
              <svg-icon icon="icon_tianjia"
                        class="primary-color mr32"></svg-icon>
            </span>
            <span @click="delOneContent(index)"
                  v-show="index!==0 || form.data.contentArr.length !== 1">
              <svg-icon icon="icon_jianshao"
                        class="primary-color"></svg-icon>
            </span>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <page-handle :confirmText="$route.query.id ? '保存':'确定'"
                 @onConfirm="onConfirm"></page-handle>
  </div>
</template>

<script>
import pageHandle from '@/components/PageHandle'
export default {
  name: 'Form',
  methods: {
    // 新增一条工作内容
    addOneContent () {
      const temItem = {
        content: ''
      }
      this.form.data.contentArr.push(temItem)
    },
    // 删除一条工作内容
    delOneContent (index) {
      this.form.data.contentArr.splice(index, 1)
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$route.query.id ? this.modifyJourneyKeyWork() : this.createJourneyKeyWork()
        }
      })
    },
    // 新增工作
    createJourneyKeyWork () {
      const params = {
        ...this.form.data
      }
      params.contents = Array.from(params.contentArr, ({ content }) => content)
      delete params.contentArr
      this.$api.createJourneyKeyWork(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('新增工作成功')
        this.$router.back()
      })
    },
    // 编辑工作
    modifyJourneyKeyWork () {
      const params = {
        ...this.form.data
      }
      this.$api.modifyJourneyKeyWork(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('编辑工作成功')
        this.$router.back()
      })
    },
    // 根据id获取重点工作
    getJourneyKeyWorkById (id) {
      this.$api.getJourneyKeyWorkById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const { id, content, year, journeyAllianceId } = res.content
        this.form.data = {
          id,
          content,
          journeyAllianceId,
          year: year + ''
        }
      })
    },
    // 获取联盟列表
    getJourneyAllianceList () {
      this.$api.getJourneyAllianceList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.journeyAllianceOptions = res?.content ?? []
      })
    }
  },
  data () {
    return {
      journeyAllianceOptions: [],
      form: {
        rules: {
          journeyAllianceId: [
            { required: true, message: '请选择党建联盟', trigger: 'change' }
          ],
          year: [
            { required: true, message: '请选择年', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入工作内容', trigger: 'blur' }
          ]
        },
        data: {
          journeyAllianceId: '',
          year: new Date().getFullYear() + '',
          contentArr: [{
            content: ''
          }]
        }
      }
    }
  },
  components: {
    pageHandle
  },
  created () {
    this.getJourneyAllianceList()
    this.$route.query.id && this.getJourneyKeyWorkById(this.$route.query.id)
  }
}
</script>

<style lang='scss' scoped>
.w552 {
  width: 552px !important;
}
.w400 {
  width: 400px !important;
}
</style>
