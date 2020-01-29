<template>
  <div class="header">
    <slot name="left"></slot>
    <span class="header-title">{{ title }}</span>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: "HeaderTop",
    props: {
      title: String,
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .header {
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 45px;
    background: #02a774;
    .header-title {
      margin: 0 20px;
      font-size: 20px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      width: 220px;
    }
  }
</style>
