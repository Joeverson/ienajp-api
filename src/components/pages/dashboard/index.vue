<template>
  <div>    
    <topbar></topbar>
    <sidebar></sidebar>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
import topbar from '../../template/Topbar.vue'
import sidebar from '../../template/Sidebar.vue'
import footer from '../../template/Footer.vue'

export default {
  components: {
    topbar,
    sidebar,
    footer
  }
};
</script>
