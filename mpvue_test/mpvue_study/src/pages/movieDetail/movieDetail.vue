<template>
  <div class="movieDetailContainer">
    <img :src="movieDetail.images.large" alt="">
    <p class="movie_name">{{movieDetail.original_title}}</p>
    <div class="detail_content">
      <span>评分: {{movieDetail.rating.average}}</span>
      <span>导演: {{movieDetail.directors[0].name}}</span>
      <span>主演: {{movieDetail.casts[0].name}} {{movieDetail.casts[1].name}} {{movieDetail.casts[2].name}}</span>
    </div>
    <button>我要观影</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "movieDetail",
    data() {
      return {
        moviesDetail: {}
      }
    },
    computed: {
      ...mapState(['moviesArr'])
    },
    beforeMount() {
      this.index = this.$mp.query.index
      this.moviesDetail = this.moviesArr[this.index]
    }
  }
</script>

<style scoped>
  .movieDetailContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .movie img {
    width: 70%;
    height: 700rpx;
    margin: 20rpx 0;
  }

  .movie_name {
    font-size: 40rpx;
    font-weight: bold;
  }

  .detail_content {
    display: flex;
    flex-direction: column;
    font-size: 32rpx;
  }

  button {
    width: 70%;
    height: 80rpx;
    background: green;
    color: #fff;
    line-height: 80rpx;
    margin-top: 50rpx;
  }
</style>
