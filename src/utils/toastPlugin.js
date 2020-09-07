export default {
  install(Vue, options) {
    Vue.prototype.$error = function(message) {
      this.$bvToast.toast(message, {
        title: 'ОШИБОЧКА',
        autoHideDelay : 4000,
        appendToast: false
      })
    }
  }
}