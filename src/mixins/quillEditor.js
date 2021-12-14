
const quillEditor = {
  data () {
    return {
      editorOption: {
        placeholder: '输入正文',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image']
          ]
        }
      }
    }
  },
  methods: {
    editorUploadImg (e) { // 富文本编辑框 图片上传
      const params = {
        uploadType: 'm',
        fileType: 2,
        file: e.file
      }
      this.$api.uploadFile(params).then(res => {
        if (res.isError) return this.$message.error(res.message) // 失败提醒
        const url = this.$fileHost + res[0]
        // 将文件上传后的URL地址插入到编辑器文本中
        if (url != null && url.length > 0) {
          // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，调用编辑器的 insertEmbed(length, 'image', imageUrl)，插入图片
          this.addRange = this.$refs.quillEditor.quill.getSelection()
          this.$refs.quillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', url)
          // this.$refs.quillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', url, Quill.sources.USER)
        } else {
          this.$message.error('图片插入失败')
        }
        this.$refs.editorUpload.clearFiles() // 插入成功后清除input的内容
      })
    },
    imgHandler (state) { // 富文本框 图片上传按钮事件
      this.addRange = this.$refs.quillEditor.quill.getSelection()
      if (state) {
        const fileInput = document.getElementById('editorUploadBtn')
        fileInput.click()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.$refs.quillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    })
  },
  computed: {

  }
}

export default quillEditor
