<script>
    import top from "./components/top.vue";
    import aside from "./components/aside.vue";
    export default {
        ready() {            
            this.$route.router.go({path: '/welcome', replace: true})
        },
        replace: false,
        components:{
            top,
            aside
        }
    }
</script> 

<template>

    <top></top>
    <aside></aside>

    <router-view></router-view>
</template>

<style lang="less">
    @import './assets/less/style';
    @import './assets/js/icheck/icheck';
</style>


