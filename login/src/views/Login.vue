<template>
  <div>
    <div class="login" @click="switchState">
      <login-tabs :tabClass="tabClass"></login-tabs>
    </div>
    <login-form :state="state"></login-form>
    <button class="btn"><span :class="state === 1? '' : 'hidden'">Sign Up</span><span :class="state === 1? '' : 'hidden'">Sign Up</span></button>
  </div>
</template>

<script>
  import LoginTabs from "@/components/LoginTabs";
  import LoginForm from "@/components/LoginForm";
  export default {
    name: "Login",
    components: {
      LoginTabs,
      LoginForm
    },
    data() {
      return {
        state: 1
      }
    },
    computed: {
      tabClass() {
        return this.state === 1 ? 'is_sign_in' : 'is_sign_up'
      }
    },
    methods: {
      switchState() {
        this.state = this.state === 1 ? 2 : 1
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    color: white;
    font-size: 14px;
  }
  .btn {
    width: 100%;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 2px;
    outline: none;
    background: transparent;
    border: none;
    overflow: hidden;
  }
  .btn span {
    display: block;
    background-color: #0066d0;
    color: white;
    text-align: center;
    line-height: 40px;
    width: 100%;
    transition: all .6s ease;
  }
  .hidden {
    transform: translateY(-100%);
  }
</style>
