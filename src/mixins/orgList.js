const orgList = {
  methods: {
    getOrgList () {
      this.$api.findOrganizationList().then(res => {
        if (res.isError) return this.$message.error(res.message)
        this.orgList = res.content || []
      })
    }
  },
  created () {
    this.getOrgList()
  }
}

export default orgList
