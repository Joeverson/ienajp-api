<template>
  <div v-show='isVisible' :class='["notification", classes]'>
      {{message}}
  </div>
</template>

<script>
export default {
  name: 'notification'
}
</script>

<style>
.notification {
  text-align: center;
  padding: 10px;
}

.notification-danger {  
  background-color: #EF5350;
  color: white;
  font-weight: bold;
}
.notification-success {  
  background-color: #7CB342;
}
.notification-alert {  
  background-color: #FFC107;
}
</style>
