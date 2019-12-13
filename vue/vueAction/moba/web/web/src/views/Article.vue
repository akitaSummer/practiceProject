<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-Back text-blue"></i>
      <strong class="flex-1 text-blue pl-3">
        {{ model.title }}
      </strong>
      <div class="text-grey fs-xs">
        2019-06-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="icon icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link class="py-1" tag="div" to="`/article/${item._id}`" v-for="item in model.related" :key="item.title">
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        require: true
      }
    },
    data() {
      return {
        model: null
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`articles/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.fetch()
    },
     watch: {
      id() {
        this.fetch()
      }
     }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .page-article {
    .icon-Back {
      font-size: 1.6923rem;
    }
    .body {
      img {
        max-height: 100%;
        height: auto;
      }
      iframe {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
