<template>
  <!-- #Main ============================ -->
    <div class="page-container">
      <!-- ### $Topbar ### -->
      <div class="header navbar bg-assert">
        <div class="header-container">
          <ul class="nav-left">
            <li>
              <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
                <i class="ti-menu"></i>
              </a>
            </li>
            <li class="search-box">
              <a class="search-toggle no-pdd-right" href="javascript:void(0);">
                <i class="search-icon ti-search pdd-right-10"></i>
                <i class="search-icon-close ti-close pdd-right-10"></i>
              </a>
            </li>
            <li class="search-input">
              <input class="form-control" type="text" placeholder="Search...">
            </li>
          </ul>
          <ul class="nav-right">            
            <user-profile></user-profile>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import userProfile from './topbar/user.profile.vue'

  export default {
    name: 'topbar',
    components: {
      userProfile
    }
  }
</script>