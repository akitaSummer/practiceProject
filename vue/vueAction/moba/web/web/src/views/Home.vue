<template>
  <div>
    <swiper :options="swiperOption" ref="list" @click="replace($refs.list.swiper.realIndex)">
      <swiper-slide v-for="ad in adCats" :key="ad._id">
        <img class="w-100" :src="ad.image">
      </swiper-slide>
      <div class="swiper-pagination pagination-home px-3 pb-1" style="text-align: right" slot="pagination"></div>
    </swiper>
    <!--end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item" v-for="(value, key) in sprite" :key="key">
          <i :class="`sprite sprite-${key}`"></i>
          <div>{{value}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="navClick">
        <i :class="`sprite sprite-${Object.keys(this.sprite).length === 10 ? 'arrow' : 'open'} mr-1`"></i>
        {{Object.keys(this.sprite).length === 10 ? '收起' : '展开'}}
      </div>
    </div>
    <!--end of nav icons-->
    <m-list-card icon="" title="" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="新闻资讯"></m-card>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        swiperOption: {
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".pagination-home"
          }
        },
        newsCats: [
          {
            name: '热门',
            newsList: [
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
            ]
          },
          {
            name: '新闻',
            newsList: [
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
              {
                categoryName: '公告',
                title: 'asdklfjasd;',
                date: '06/01'
              },
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables';
  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 2px;
      background: #fff;
      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'info')
      }
    }
  }

  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
</style>
