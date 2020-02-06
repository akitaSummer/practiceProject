<template>
  <div>
    <ShopHeader></ShopHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import ShopHeader from "@/components/ShopHeader/ShopHeader";
  export default {
    name: "Shop",
    components: {
      ShopHeader
    }
  }
</script>

<style scoped>

</style>
