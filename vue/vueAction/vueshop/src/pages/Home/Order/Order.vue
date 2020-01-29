<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <section class="order-no-login">
      <img src="../../../../public/images/order/person.png">
      <h3>登录后查看外卖订单</h3>
      <button>立即登录</button>
    </section>
  </div>
</template>

<script>
  import HeaderTop from "@/components/HeaderTop/HeaderTop";
  export default {
    name: "Order",
    components: {
      HeaderTop
    },
    data() {
      return {
        title: '订单'
      }
    }
  }
</script>

<style lang="scss">
  .order-no-login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 100%;
      height: 30%;
    }
    h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
      text-align: center;
    }
    button {
      display: inline-block;
      background-color: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
