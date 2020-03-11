<template>
  <form class="login_form">
    <div class="login_form-r1" :class="state === 1? '' : 'sign_in_hidden'">
      <login-item icon="user" label="First Name" type="text"></login-item>
      <login-item label="Last Name" type="text"></login-item>
    </div>
    <div class="login_form-r1" :class="state === 1? '' : 'sign_in_move'">
      <login-item icon="envelope-o" label="Email address" type="type"></login-item>
    </div>
    <div class="login_form-r1" :class="state === 1? '' : 'sign_in_move'">
      <login-item icon="lock" label="Enter password" type="password"></login-item>
    </div>
    <div class="login_form-r1" :class="state === 1? '' : 'sign_in_hidden'">
      <login-item icon="lock" label="Re-enter password" type="password"></login-item>
    </div>
    <div class="login_form-r1" :class="state === 1? '' : 'sign_in_checkbox'">
      <login-checkbox label="keep me sign in"></login-checkbox>
      <label>Forget password</label>
    </div>
  </form>
</template>

<script>
  import LoginItem from "@/components/LoginItem";
  import LoginCheckbox from "@/components/LoginCheckbox";
  export default {
    name: "LoginForm",
    components: {
      LoginItem,
      LoginCheckbox
    },
    props: {
      state: {
        type: Number
      }
    }
  }
</script>

<style scoped>
  .login_form {
    padding: 20px;
  }
  .login_form-r1{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    justify-content: space-between;
    transition: all .6s ease;
  }
  .sign_in_hidden {
    opacity: 0;
  }
  .sign_in_move {
    transform: translateY(-100%);
  }
  .sign_in_checkbox {
    transform: translateY(-300%);
  }
</style>
