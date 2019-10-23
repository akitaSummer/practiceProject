<template>
  <div class="listContainer">
    <swiper indicator-dots indicator-color="pink" indicator-active-color="green">
      <swiper-item>
        <img src="/static/images/detail/carousel/01.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/02.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/03.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/images/detail/carousel/04.jpg" alt="">
      </swiper-item>
    </swiper>
    <div>
      <ListTmp :item="item" :index="index" v-for="(item, index) in listTmp" :key="index"></ListTmp>
    </div>
  </div>
</template>

<script>
  import ListTmp from '../list_template/list_template'
  import {mapState} from 'vuex'
  export default {
    name: "index",
    components: {
      ListTmp
    },
    beforeMount() {
      // 分发action修改状态
      this.$store.dispatch('getList')
    },
    computed: {
        // 映射状态到本组件
      ...mapState(['listTmp'])
    }
  }
</script>

<style scoped>
  .listContainer swiper {
    width: 100%;
    height: 400rpx;
  }
  .listContainer swiper image {
    width: 100%;
    height: 100%;
  }
</style>
