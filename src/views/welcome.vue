<template>
  <div class="loader">
    <div class="pacman">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  ready () {
    $('#J-start-loading').remove();
    if(localStorage.token){
        let storageRouteName = localStorage.routeName,
            routerGo = '/employee';

            if(storageRouteName && storageRouteName != 'welcome'){
                routerGo = `/${storageRouteName}`;
            }
            
        this.$route.router.go({path: routerGo, replace: true})
    }else{
        this.$route.router.go({path: '/login', replace: true})
    }
  }
}
</script>
