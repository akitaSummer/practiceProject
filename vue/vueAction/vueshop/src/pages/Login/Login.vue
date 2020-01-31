<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login-header">
        <h2 class="login-logo">硅谷外卖</h2>
        <div class="login-header-title">
          <a href="javascript:;" :class="{ on: isMessage }" @click="verification = 'message'">短信登录</a>
          <a href="javascript:;" :class="{ on: isPassword }" @click="verification = 'password'">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <form action="#">
          <div v-if="isMessage">
            <section class="login-message">
              <input type="text" maxlength="11" placeholder="手机号">
              <button class="get-verification" disabled="disabled">获取验证码</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div v-else>
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
              </section>
              <section class="login-verification">
                <input type="tel" maxlength="8" placeholder="密码">
                <div class="switch-button off">
                  <div class="switch-circle"></div>
                  <span class="switch-text">...</span>
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码">
                <img src="../../../public/images/captcha.svg" alt="captcha" class="get-verification">
              </section>
            </section>
          </div>
          <button class="login-submit">登录</button>
        </form>
        <a href="javascript:;" class="about-us">关于我们</a>
      </div>
      <span class="go-back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        verification: 'message',
      }
    },
    computed: {
      isMessage() {
        return this.verification === 'message'
      },
      isPassword() {
        return this.verification === 'password'
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
    .loginInner {
      padding-top: 60px;
      width: 80%;
      margin: 0 auto;
      .login-logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }
      .login-header-title {
        padding-top: 40px;
        text-align: center;
        > a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;
          &:first-child {
            margin-right: 40px;
          }
          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
      .login-content {
        padding-top: 40px;
        form {
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Alrial;
            &:focus {
              border: 1px solid #02a774;
            }
          }
          .login-message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background-color: #fff;
            .get-verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background-color: transparent;
            }
          }
          .login-verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background-color: #fff;
            .switch-button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color .3s,border-color .3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              &.off {
                background-color: #fff;
                .switch-text {
                  float: right;
                  color: #ddd;
                }
              }
              &.on {
                background: #02a774;
                >.switch-circle {
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 16px;
                  height: 16px;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                  transition: transform .3s;
                }
              }
            }
          }
          .login-hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            > a {
              color: #02a774;
            }
          }
          .login-submit {
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #4cd96f;
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
            border: 0;
          }
        }
        .about-us {
          display: block;
          font-size: 12px;
          margin-top: 20px;
          text-align: center;
          color: #999;
        }
      }
      .go-back {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;
        > .iconfont {
          font-size: 20px;
          color: #999;
        }
      }
    }
  }
</style>
