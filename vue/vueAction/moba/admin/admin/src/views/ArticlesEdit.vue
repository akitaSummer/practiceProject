<template>
  <div class="about">
    <h1>
      {{id ? '编辑' : '新建'}}文章
    </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <VueEditor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  export default {
    name: "ArticlesEdit",
    props: {
      id: String
    },
    components: {
      VueEditor
    },
    data() {
      return {
        model: {
          title: '',
          body: '',
          categories: []
        },
        categories: []
      }
    },
    methods: {
      async save() {
        if (this.id) {
          await this.$http.put(`rest/articles/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/articles', this.model)
        }
        this.$router.replace('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const response = await this.$http.get(`rest/articles/${this.id}`)
        this.model = response.data
      },
      async fetchCategories() {
        const response = await this.$http.get(`rest/categories`)
        this.categories = response.data
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, 'image', response.data.url)
        resetUploader()
      }
    },
    created() {
      this.fetchCategories()
      this.id && this.fetch()
    },
    watch: {
      $route: function() {
        if (this.id === undefined) {
          this.model = {
            name: '',
            parent: ''
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
