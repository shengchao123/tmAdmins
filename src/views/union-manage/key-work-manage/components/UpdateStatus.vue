<template>
  <el-dialog :title="dialog.title"
             width="456px"
             :close-on-click-modal="false"
             :modal-append-to-body="false"
             @close="onCancel"
             :close-on-press-escape="false"
             :visible.sync="dialog.show">
    <el-form ref="form"
             :model="form.data"
             :rules="form.rules"
             class="ml70 pb8"
             label-position="left"
             label-width="76px">
      <div class="row mt24 mb24 pl12">
        <div class="w70 color-999">当前状态：</div>
        <div>{{form.data.statusName}}</div>
      </div>
      <el-form-item prop="newStatus"
                    label="新状态"
                    v-if="form.data.status === 1">
        <el-select v-model="form.data.newStatus"
                   placeholder="请选择"
                   @change="changeNewStatus"
                   class="w240">
          <el-option v-for="item in newStatusOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="row mt24 mb24 pl12"
           v-else>
        <div class="w70 color-999">新状态：</div>
        <div>已完成</div>
      </div>
      <el-form-item label="开始时间"
                    prop="startDate"
                    v-if="form.data.newStatus === 2">
        <el-date-picker v-model="form.data.startDate"
                        type="date"
                        class="w240"
                        value-format="timestamp"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="完成时间"
                    prop="endDate"
                    v-else>
        <el-date-picker v-model="form.data.endDate"
                        type="date"
                        class="w240"
                        value-format="timestamp"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary"
                 @click="onConfirm">确定</el-button>
      <el-button @click="onCancel"
                 class="plain-btn">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateStatus',
  methods: {
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.modifyJourneyKeyWorkStatus()
        }
      })
    },
    // 取消
    onCancel () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 修改重点工作状态
    modifyJourneyKeyWorkStatus () {
      const params = {
        ...this.form.data
      }
      params.status = params.newStatus
      this.$deleteObjectEmptyAttr(params)
      delete params.statusName
      delete params.newStatus
      this.$api.modifyJourneyKeyWorkStatus(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('更新状态成功')
        this.onCancel()
        this.$emit('getTableData')
      })
    },
    changeNewStatus () {
      this.form.data = JSON.parse(JSON.stringify(this.form.data))
    },
    // 打开弹窗
    show (id) {
      this.getJourneyKeyWorkById(id)
      this.dialog.show = true
    },
    // 根据id获取重点工作
    getJourneyKeyWorkById (id) {
      this.$api.getJourneyKeyWorkById({ id }).then(res => {
        if (res.isError) return this.$message.error(res.message)
        const content = res.content
        this.form.data = content
        this.form.data.newStatus = content.status === 1 ? 2 : 3
        this.$refs.form.resetFields()
        delete this.form.data.content
        delete this.form.data.year
      })
    }
  },
  data () {
    return {
      dialog: {
        title: '更新状态',
        show: false
      },
      form: {
        rules: Object.freeze({
          newStatus: [
            { required: true, message: '请选择新状态', trigger: 'change' }
          ],
          startDate: [
            { required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          endDate: [
            { required: true, message: '请选择完成时间', trigger: 'change' }
          ]
        }),
        data: {
          newStatus: '',
          startDate: '',
          endDate: ''
        }
      },
      newStatusOptions: Object.freeze([
        {
          id: 2,
          name: '进行中'
        },
        {
          id: 3,
          name: '已完成'
        }
      ]),
      pickerOptions: {
        disabledDate: (time) => {
          const { startDate } = this.form.data
          return startDate && time.getTime() < startDate
        }
      }

    }
  }
}
</script>

<style lang='scss' scoped>
.w70 {
  width: 72px;
}
.ml70 {
  margin-left: 70px;
}
</style>
