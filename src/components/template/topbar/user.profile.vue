<template>
  <li class="dropdown">
    <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
      <div class="peer mR-10">
        <img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt="">
      </div>
      <div class="peer">
        <span class="fsz-sm c-grey-900">{{ user.name }}</span>
      </div>
    </a>
    <ul class="dropdown-menu fsz-sm">
      <li>
        <a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
          <i class="ti-settings mR-10"></i>
          <span>Setting</span>
        </a>
      </li>
      <li>
        <router-link to='admin/user/profile' class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
          <i class="ti-user mR-10"></i>
          <span>Profile</span>
        </router-link>
      </li>
      <li>
        <a href="email.html" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
          <i class="ti-email mR-10"></i>
          <span>Messages</span>
        </a>
      </li>
      <li role="separator" class="divider"></li>
      <li>
        <a href="javascript:void(0)"  @click='logout' class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
          <i class="ti-power-off mR-10"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
  import { User } from '../../../helpers/requests';
  import store from '../../../helpers/Store'
  export default {
    name: 'user-profile',
    data() {
      return {
        user: JSON.parse(store.user)
      }
    },
    methods: {
      logout() {
        User.auth.logout();     
      }
    }
  }
</script>
