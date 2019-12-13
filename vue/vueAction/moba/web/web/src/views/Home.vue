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
    <m-list-card icon="menu1" title="新闻列表" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fl-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!--end of news-->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <dis class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="whith: 20%l" v-for="(hero, i) in category.herosList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{ hero.name }}</div>
          </router-link>
        </dis>
      </template>
    </m-list-card>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: "Home",
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
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
        newsCats: [],
        heroCats: []
      }
    },
    method: {
      async fetchNewsCat() {
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCat() {
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
    },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
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
