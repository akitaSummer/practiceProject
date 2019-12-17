<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header d-flex ai-center pb-3" :class="{'border-bottom': !plain}">
      <i class="iconfont" :class=`icon-${icon}`></i>
      <div class="fs-xxl flex-1 px-2">
        <strong>
          {{title}}
        </strong></div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      plain: {
        type: Boolean,
        required: true,
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';
  .card {
    border-bottom: 1px solid $border-color;
  }
</style>
