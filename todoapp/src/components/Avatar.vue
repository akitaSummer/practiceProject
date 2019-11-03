<template>
  <div class="avatar" :class="{avatar_selected: !!selected}">
    <div class="avatar_face">
      <img src="../assets/avatar.jpg" alt="">
    </div>
    <h2 class="avatar_name">Hello, World</h2>
    <p class="avatar_tips">
      Looks like feed good.<br/>
      You have {{todayTasks.length}} tasks to do today
    </p>
    <p class="avatar_date">TODAY : {{today | dateString}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "Avatar",
    data() {
      return {
        today: new Date()
      }
    },
    computed: {
      ...mapState(['selected']),
      ...mapGetters(['todayTasks'])
    }
  }
</script>

<style scoped lang="scss">
  .avatar {
    display: flex;
    padding: 0 40px;
    height: 300px;
    justify-items: flex-end;
    flex-direction: column;
    transition: all .5s ease;
  }
  .avatar_selected {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
  }
  .avatar_face {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .avatar_name {
    margin-top: 32px;
    padding: 0 6px;
    font-size: 32px;
    letter-spacing: 1px;
    font-weight: 300;
  }
  .avatar_tips {
    margin-top: 16px;
    padding: 0 6px;
    font-size: 13px;
    font-weight: 100;
    opacity: 0.8;
    line-height: 1.6em;
  }
  .avatar_date {
    margin-top: 44px;
    margin-bottom: 16px;
    padding: 0 6px;
    font-size: 14px;
  }
</style>