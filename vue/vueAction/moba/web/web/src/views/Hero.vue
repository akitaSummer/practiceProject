<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-dark-1 fs-xxs">攻略站</span>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <router-link to="/" tag="div">更多英雄&gt;</router-link>
    <h1>{{ model.name }}</h1>
  </div>
</template>

<script>
  export default {
    name: "Hero",
    props: {
      id: { required: true }
    },
    data() {
      return {
        model: null
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`heroes/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
