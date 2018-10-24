<template>
  <div class='pos-a t-0 l-0 bgc-white w-100 h-100 d-f fxd-r fxw-w ai-c jc-c pos-r p-30'>
    <div class='mR-60'>
      <img alt='#' :src='logo' width='200'/>
    </div>

    <div class='d-f jc-c fxd-c'>
      <h1 class='mB-30 fw-900 lh-1' style="font-size: 60px;">404</h1>
      <h3 class='mB-10 fsz-lg c-grey-900 tt-c'>Oops Page Not Found</h3>
      <p class='mB-30 fsz-def c-grey-700'>The page you are looking for does not exist or has been moved.</p>
      <div>
        <a href="/" type='primary' class='btn'>Go to Home</a>
      </div>
    </div>
  </div>
</template>

<script>
  import logo from '../../assets/images/logo-assert.png'

  export default {
    data() {
      return {
        logo
      }
    }  
  };
</script>
