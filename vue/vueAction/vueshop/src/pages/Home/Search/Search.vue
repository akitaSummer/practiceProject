<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <form action="#" class="search-form">
      <input class="search-input" type="text" placeholder="请输入商家或美食名称">
      <button type="submit" class="search-submit">搜索</button>
    </form>
  </div>
</template>

<script>
  import HeaderTop from "@/components/HeaderTop/HeaderTop";
  export default {
    name: "Search",
    components: {
      HeaderTop
    },
    data() {
      return {
        title: '我的'
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../common/scss/mixins";
  .search-form {
    @include clearfix();
    width: 100%;
    margin-top: 50px;
    padding: 12px 8px;
    box-sizing: border-box;
    .search-input {
      float: left;
      height: 35px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;
      width: 79%;
      border: 4px solid #f2f2f2;
      font-size: 14px;
      color: #333;
      background-color: #f2f2f2;
    }
    .search-submit {
      float: right;
      width: 18%;
      height: 43px;
      border: 4px solid #02a774;
      font-size: 16px;
      color: #fff;
      background-color: #02a774;
      padding: 0;
      border-radius: 2px;
    }
  }
</style>
