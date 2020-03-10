<template>
  <div class="login" @click="switchState">
    <login-tabs :tabClass="tabClass"></login-tabs>
  </div>
</template>

<script>
  import LoginTabs from "@/components/LoginTabs";
  export default {
    name: "Login",
    components: {
      LoginTabs
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
</style>
