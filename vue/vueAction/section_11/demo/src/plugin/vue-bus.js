const install = function (Vue) {
  const Bus = new Vue({
    methods: {
      emit(event, ...arg) {
        this.$emit(event, ...arg)
      },
      on(event, ...arg) {
        this.$on(event, ...arg)
      },
      off(event, ...arg) {
        this.$off(event, ...arg)
      }
    }
  })
  Vue.prototype.$bus = Bus
}

export default install