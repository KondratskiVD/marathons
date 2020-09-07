<template>
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Статистика</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <router-link class="nav-link" to="marathons">
        <i class="fa fa-wheelchair-alt" aria-hidden="true"></i>
        <span>Марафоны</span>
      </router-link>
    </li>
    <hr class="sidebar-divider d-none d-md-block">

    <li class="nav-item">
      <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
        <i class="fas fa-fw fa-folder"></i>
        <span>Социум</span>
      </a>
      <div id="collapsePages" class="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar" style="">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="#">Друзья</a>
          <div class="collapse-divider"></div>
          <a class="collapse-item" href="#">Сообщения</a>
        </div>
      </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->


    <!-- Divider -->

  </ul>
</template>

<script>
import Footer from "./Footer.vue";
export default {
name: "Aside",
  components: {Footer}
}
</script>

<style scoped>

</style>