<template>
  <div class="login_item">
    <label for="input-id"><i v-if="icon" :class="['fa',`fa-${icon}`]"></i>{{label}}</label>
    <input :type="type" id="input-id">
  </div>
</template>

<script>
  export default {
    name: "LoginForm",
    props: {
      icon: {
        type: String
      },
      label: {
        type: String
      },
      type: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .login_item {
    flex: 1;
    padding: 10px;
    display: flex;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 1px 1px #0066d0;
    box-sizing: border-box;
    transition: all .6s ease;
  }
  .login_item label {
    margin-right: 10px;
    color: #007dff;
    display: block;
  }
  .login_item input {
    flex: 1;
    width: 0;
    padding: 0;
    margin: 0;
    border: none;
    height: 100%;
    outline: none;
  }
</style>
