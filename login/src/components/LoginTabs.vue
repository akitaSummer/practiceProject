<template>
  <div>
    <ul class="login-tabs" :class="tabClass">
      <li>Sign up</li>
      <li class="login-tabs_s">or</li>
      <li>Sign in</li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: "LoginTabs",
    props: {
      tabClass: {
        type: String
      }
    }
  }
</script>

<style scoped>
  .login-tabs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 34px;
  }
  .login-tabs li:nth-child(2n-1) {
    display: block;
    padding: 4px 10px;
    border: 1px solid white;
    border-radius: 3px;
    text-align: center;
  }
  .login-tabs li {
    padding: 10px;
    transition: all .6s ease;
  }
  .login-tabs li:nth-child(2n) {
    justify-content: center;
  }
  .login-tabs_s {
    font-size: 12px;
  }
  .login-tabs .login-tabs_s::before,
  .login-tabs .login-tabs_s::after {
    content: '-';
  }
  .is_sign_in li:first-child {
    transform: translateX(100%) scale(1.5);
    border: none;
  }
  .is_sign_in .login-tabs_s {
    transform: translateX(58%);
    opacity: 0.5;
  }
  .is_sign_in li:last-child {
    transform: scale(0.6);
    opacity: 0.4;
  }
  .is_sign_up li:last-child {
    transform: translateX(-100%) scale(1.5);
    border: none;
  }
  .is_sign_up .login-tabs_s {
    transform: translateX(-58%);
    opacity: 0.5;
  }
  .is_sign_up li:first-child {
    transform: scale(0.6);
    opacity: 0.4;
  }
</style>
