<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>

import AuthLayout from "./views/layouts/AuthLayout.vue";
import MainLayout from "./views/layouts/MainLayout.vue";
export default {
  name: 'App',
  components: {
    MainLayout,
    AuthLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout) + '-layout'
    }
  },
  created() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        } // если срок действия токена истек, axios перехватывает ответ 401 и удаляет token
        throw err;
      });
    });
  }
}
</script>

<style scoped>

</style>