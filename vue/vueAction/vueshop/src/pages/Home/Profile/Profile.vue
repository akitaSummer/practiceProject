<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
  </div>
</template>

<script>
  import HeaderTop from "@/components/HeaderTop/HeaderTop";
  export default {
    name: "Profile",
    components: {
      HeaderTop
    },
    data() {
      return {
        title: '订单列表'
      }
    }
  }
</script>

<style scoped>

</style>
