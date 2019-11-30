<template>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="230">
    </el-table-column>
    <el-table-column prop="parent.name" label="parent" width="230">
    </el-table-column>
    <el-table-column prop="name" label="分类名称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
        <el-button @click="remove(scope.row)" type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "CategoryEdit",
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        const response = await this.$http.get('categories')
        this.items = response.data
      },
      async remove(row) {
        this.$confirm(`是否确定要删除分类“${row.name}”`, "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        this.fetch()
      }
    }
  }
</script>

<style scoped>

</style>
