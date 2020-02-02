<template>
  <ul :class="`star star-${size}`">
    <li class="star-item on" v-for="i in score.on" :key="shopKey + i + 'on'"></li>
    <li class="star-item half" v-for="i in score.half" :key="shopKey + i + 'half'"></li>
    <li class="star-item off" v-for="i in score.off" :key="shopKey + i + 'off'"></li>
  </ul>
</template>

<script>
  export default {
    name: "Star",
    props: {
      rating: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 24
      },
      shopKey: {
        type: String
      }
    },
    computed: {
      score() {
        const result = {
          on: 0,
          half: 0,
          off: 0,
        }
        const num = '' + this.rating
        if (num.indexOf('.') > 0) {
          const com = num.split('.')
          const half = +com[1]
          if (half > 5) {
            result.half = 1
            result.on = Math.floor(this.rating)
            result.off = 5 - result.half - result.on
          } else {
            result.on = Math.floor(this.rating)
            result.off = 5 - result.on
          }
        } else {
          result.on = Math.floor(this.rating)
          result.off = 5 - result.on
        }
        return result
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .star {
    float: left;
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-image("../../../public/images/stars/star24_on");
        }
        &.half {
          @include bg-image("../../../public/images/stars/star24_half");
        }
        &.off {
          @include bg-image("../../../public/images/stars/star24_off");
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-image("../../../public/images/stars/star36_on");
        }
        &.half {
          @include bg-image("../../../public/images/stars/star36_half");
        }
        &.off {
          @include bg-image("../../../public/images/stars/star36_off");
        }
      }
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-image("../../../public/images/stars/star48_on");
        }
        &.half {
          @include bg-image("../../../public/images/stars/star48_half");
        }
        &.off {
          @include bg-image("../../../public/images/stars/star48_off");
        }
      }
    }
  }
</style>
