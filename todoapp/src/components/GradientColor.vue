<template>
  <div class="gradient_color" :class="{gradient_color_active: active}" :style="{backgroundImage: gradientColor}"></div>
</template>

<script>
  export default {
    name: "GradientColor",
    props: {
      colors: {
        type: Array
      },
      active: {
        type: Boolean
      }
    },
    computed: {
      gradientColor() {
        const colorBotton = `color-stop(38%, ${this.colors[0]})`
        const colorTop = `to(${this.colors[1]})`
        return `-webkit-gradient(linear, left bottom, left top , ${colorBotton}, ${colorTop})`
      }
    }
  }
</script>

<style scoped lang="scss">
  .gradient_color{
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .gradient_color_active {
    opacity: 1;
  }
</style>