<template>
  <div class='message-item-wrap'>
    <section class="item-header pl24">
      <div v-for="header in itemHeaders"
           :key="header.prop"
           class="i-block ft12 mr40">
        <span class="color-999">{{header.name}}</span>
        <span class="color-666">{{messageInfo[header.prop]}}</span>
      </div>
    </section>

    <section class="item-info center-align line-h22 pl24 pt16 pb16">
      <div v-for="(info,index) in itemInfos"
           :key="index"
           :class="index === 2 ? 'flex1' : index === 1 ? 'pr24' :''"
           :style="{width: tableHeaders[index].width + 'px',minWidth:tableHeaders[index].minWidth + 'px'}">

        <div v-if="index !== 4">
          <div>{{messageInfoText(info.prop)}}</div>
          <div v-if="!$isEmpty(messageInfo.attachments) && index === 1"
               class="mt8">
            <img :src="$fileHost + item.url"
                 width="64px"
                 height="64px"
                 style="border-radius:8px;margin-right:24px"
                 v-for="(item, index1) in messageInfo.attachments"
                 :key="index1">
          </div>
        </div>
        <div v-else>
          <span class="text-btn mr16"
                v-if="$hasAuth($urls.replyJourneyCommunityMessage)"
                @click="openDialog(messageInfo)">{{messageInfo.status === 1 ? '回复' : '查看回复'}}</span>
          <el-popconfirm title="要删除该留言？"
                         cancelButtonType="取消"
                         confirmButtonText="删除"
                         hideIcon
                         @confirm="onDelete(messageInfo)"
                         v-if="$hasAuth($urls.removeJourneyCommunityMessage)">
            <span class="text-btn mr12"
                  v-if="$hasAuth($urls.removeJourneyCommunityMessage)"
                  slot="reference">删除</span>
          </el-popconfirm>
        </div>
      </div>
    </section>
    <!-- 处理 -->
    <handle-dialog ref="handleDialog"
                   @reply="$emit('reply')"></handle-dialog>

  </div>
</template>

<script>
import HandleDialog from './HandleDialog.vue'
export default {
  name: 'MessageItem',
  methods: {
    openDialog (messageInfo) {
      this.$refs.handleDialog.show(messageInfo)
    },
    onDelete (row) {
      const params = { id: row.id }
      this.$api.removeJourneyCommunityMessage(params).then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.$message.success('删除成功')
        this.$emit('reply')
      })
    }
  },
  data () {
    return {
      itemHeaders: Object.freeze([
        {
          name: '留言编号：',
          prop: 'id'
        }
      ]),
      itemInfos: Object.freeze([
        {
          prop: 'memberNick'
        },
        {
          prop: 'content'
        },
        {
          prop: 'contentTime'
        },
        {
          prop: 'statusName'
        },
        {
          prop: 'opreate'
        }
      ])
    }
  },
  props: {
    messageInfo: Object,
    tableHeaders: Array
  },
  computed: {
    messageInfoText () {
      return (val) => {
        const { contentTime } = this.messageInfo
        if (val === 'contentTime') return this.$moment(contentTime).format('YYYY-MM-DD HH:mm:ss')
        return this.messageInfo[val]
      }
    }
  },
  components: {
    HandleDialog
  }
}
</script>

<style lang='scss' scoped>
$headerHeight: 48px;
.line-h22 {
  line-height: 22px;
}
.message-item-wrap {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  .item-header {
    height: $headerHeight;
    background: #f0f7ff;
    line-height: $headerHeight;
    border-radius: 4px 4px 0 0;
  }
  .item-info {
    background: #ffffff;
    border-radius: 0 0 4px 4px;
  }
}
</style>
