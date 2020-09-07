<template>
  <div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "Welcome",
  computed: {
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(serverError){
      this.$error(serverError)
    }
  }
}
</script>

<style scoped>

</style>