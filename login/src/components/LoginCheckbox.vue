<template>
  <div class="login_checkbox">
    <input type="checkbox" id="checkbox">
    <label for="checkbox">{{label}}</label>
  </div>
</template>

<script>
  export default {
    name: "LoginCheckBox",
    props: {
      label: {
        type: String
      }
    }
  }
</script>

<style scoped>
  .login_checkbox {
    position: relative;
  }
  input {
    display: none;
  }
  label::after,
  label::before {
    content: '';
    display: inline-block;
    margin-right: 5px;
    margin-top: 3px;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 1px 3px #0066d0;
    vertical-align: top;
    font: normal normal normal 10px/1 FontAwesome;
  }
  label::after{
    content: '\f00c';
    position: absolute;
    left: 0;
    visibility: hidden;
    z-index: 10;
    color: #0066d0;
  }
  input:checked+label::after{
    visibility: visible;
  }
</style>
